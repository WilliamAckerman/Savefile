import express, { type Request, type Response } from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import { db } from './../db/mongoDbClient.js';
import { ObjectId } from "mongodb";

dotenv.config();
const SIMILAR_GAMES_INDEX = process.env.MONGODB_SIMILAR_GAMES_INDEX;

const jsonParser = bodyParser.json();

const getSimilarGamesRouter = express.Router();

getSimilarGamesRouter.post('/', jsonParser, async (_req: Request, res: Response) => {
    const IGDB_id = _req.body.IGDB_id ? _req.body.IGDB_id : null;

    if (!IGDB_id) {
        res.status(500).json({
            'success': false,
            'error': 'Error getting similar games: No IGDB id was provided.'
        })
    }

    console.log(IGDB_id);

    try {
        const gamesCollection = db.collection(process.env.MONGODB_GAME_COLLECTION_NAME!);

        const findObject = {
            'IGDB_id': Number(IGDB_id)
        }

        const game = (
            await gamesCollection
                .find(findObject)
                .project({
                    '_id': 1,
                    'IGDB_id': 1,
                    'title': 1,
                    'game_engines': 1,
                    'game_modes': 1,
                    'game_time_to_beat': 1,
                    'genres': 1,
                    'involved_companies': 1,
                    'keywords': 1,
                    'multiplayer_modes': 1,
                    'platforms': 1,
                    'player_perspectives': 1,
                    'storyline': 1,
                    'summary': 1,
                    'themes': 1
                })
                .toArray()
        );

        //console.log(game)
        //console.log(game[0])
        const gameObjectId = game[0]?._id;
        //console.log(game[0]?._id)
        //console.log(gameObjectId)

        const gameObjectIdString = gameObjectId.toString()
        //console.log(gameObjectId.toString())

        const similarGames = await gamesCollection.aggregate([
            {
                "$search": {
                    index: SIMILAR_GAMES_INDEX,
                    "compound": {
                        "must":[{
                            "moreLikeThis": {
                                "like": game
                            }
                        }],
                        "mustNot": [{
                            "equals": {
                                /*"path": "_id",
                                "value": gameObjectIdString //new ObjectId (gameObjectId.toString())*/

                                /*"path": "IGDB_id",
                                "value": Number(IGDB_id)*/

                                "path": "_id",
                                "value": gameObjectId
                            }
                        }]
                    }
                }
            },
            {
                "$limit": 8
            },
            {
                "$project": {
                    "_id": 1,
                    "IGDB_id": 1,
                    "title": 1,
                    "cover": 1
                }
            }
        ]).toArray()

        //console.log(similarGames);

        if (similarGames.length < 1) {
            res.status(200).json({
                'success': true,
                'message': 'No games were found for this IGDB id.'
            });
        } else {
            res.status(200).json({
                'success': true,
                'games': similarGames
            })
        }

    } catch (error) {
        res.status(500).json({
            'success': false,
            'error': `Error finding similar games: ${error}`
        });
    }
})

export { getSimilarGamesRouter }