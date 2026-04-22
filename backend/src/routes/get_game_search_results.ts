import express, { type Request, type Response } from "express";
import dotenv from 'dotenv';
import { db } from './../db/mongoDbClient.js';
import { type Game } from './../models/game.js';
import { ObjectId } from "mongodb";

dotenv.config();
const GAME_SEARCH_INDEX = process.env.MONGODB_GAME_SEARCH_INDEX;

const getGameSearchResultsRouter = express.Router();
getGameSearchResultsRouter.use(express.json());

function checkIfTrue(field: string) {
    if (field === 'true') {
        return true;
    } else {
        return false;
    }
}

function appendToArray(array: number[], field: boolean, id: number) {
    if (field === true) {
        array.push(id);
    }
}

getGameSearchResultsRouter.get('/', async (_req: Request, res: Response) => {
    //console.log(_req.query);

    const search: string = _req.query.search ? String(_req.query.search) : "";
    const page = Number(_req.query.page) || 1;
    const limit = Number(_req.query.limit) || 12;
    const skip = (page - 1) * limit;

    // Game Types
    const standard: boolean = checkIfTrue(String(_req.query.standard));
    const port: boolean = checkIfTrue(String(_req.query.port)); // ID: 11
    const expanded_game: boolean = checkIfTrue(String(_req.query.expanded_game)); // ID: 10
    const dlc: boolean = checkIfTrue(String(_req.query.dlc)); // ID: 3
    const remaster: boolean = checkIfTrue(String(_req.query.remaster)); // ID: 9
    const remake: boolean = checkIfTrue(String(_req.query.remake)); // ID: 8
    const expansion: boolean = checkIfTrue(String(_req.query.expansion)); // ID: 2
    const standalone_expansion: boolean = checkIfTrue(String(_req.query.standalone_expansion)); // ID: 4

    // Platforms
    const xbsx: boolean = checkIfTrue(String(_req.query.xbsx)); // ID: 169
    const xbo: boolean = checkIfTrue(String(_req.query.xbo)); // ID: 49
    const ps5: boolean = checkIfTrue(String(_req.query.ps5)); // ID: 167
    const ps4: boolean = checkIfTrue(String(_req.query.ps4)); // ID: 48
    const ns2: boolean = checkIfTrue(String(_req.query.ns2)); // ID: 508
    const ns: boolean = checkIfTrue(String(_req.query.ns)); // ID: 130
    const windows: boolean = checkIfTrue(String(_req.query.windows)); // ID: 6
    const mac: boolean = checkIfTrue(String(_req.query.mac)); // ID: 14
    const linux: boolean = checkIfTrue(String(_req.query.linux)); // ID: 3

    // Genres
    const adventure: boolean = checkIfTrue(String(_req.query.adventure)); // ID: 31
    const arcade: boolean = checkIfTrue(String(_req.query.arcade)); // ID: 
    const card: boolean = checkIfTrue(String(_req.query.card));
    const fighting: boolean = checkIfTrue(String(_req.query.fighting));
    const hackAndSlash: boolean = checkIfTrue(String(_req.query.hack_and_slash));
    const indie: boolean = checkIfTrue(String(_req.query.indie));
    const moba: boolean = checkIfTrue(String(_req.query.moba));
    const music: boolean = checkIfTrue(String(_req.query.music));
    const platformer: boolean = checkIfTrue(String(_req.query.platform));
    const pointAndClick: boolean = checkIfTrue(String(_req.query.point_and_click));
    const puzzle: boolean = checkIfTrue(String(_req.query.puzzle));
    const quiz: boolean = checkIfTrue(String(_req.query.quiz));
    const racing: boolean = checkIfTrue(String(_req.query.racing));
    const rts: boolean = checkIfTrue(String(_req.query.rts));
    const rpg: boolean = checkIfTrue(String(_req.query.rpg));
    const simulator: boolean = checkIfTrue(String(_req.query.simulator));
    const shooter: boolean = checkIfTrue(String(_req.query.shooter));
    const sports: boolean = checkIfTrue(String(_req.query.sports));
    const strategy: boolean = checkIfTrue(String(_req.query.strategy));
    const tactical: boolean = checkIfTrue(String(_req.query.tactical));
    const tbs: boolean = checkIfTrue(String(_req.query.tbs));
    const visualNovel: boolean = checkIfTrue(String(_req.query.visual_novel));

    // Game Modes
    const singlePlayer: boolean = checkIfTrue(String(_req.query.single_player));
    const multiplayer: boolean = checkIfTrue(String(_req.query.multiplayer));
    const coOp: boolean = checkIfTrue(String(_req.query.co_op));
    const splitScreen: boolean = checkIfTrue(String(_req.query.split_screen));
    const mmo: boolean = checkIfTrue(String(_req.query.mmo));
    const battleRoyale: boolean = checkIfTrue(String(_req.query.battle_royale));

    const queryArray = [];
    const gameTypes: number[] = [];

    // Creating the game type filter
    const typeFilterArray = [];

    if (standard == true) {
        typeFilterArray.push({ 'game_type.IGDB_game_type_id': { $exists: false }});
    }

    appendToArray(gameTypes, dlc, 1);
    appendToArray(gameTypes, expanded_game, 10);
    appendToArray(gameTypes, port, 11);
    appendToArray(gameTypes, remaster, 9);
    appendToArray(gameTypes, remake, 8);
    appendToArray(gameTypes, expansion, 2);
    appendToArray(gameTypes, standalone_expansion, 4);

    //console.log("Game types")
    //console.log(gameTypes)

    if (gameTypes.length > 0) {
        typeFilterArray.push({ 'game_type.IGDB_game_type_id': { $in: gameTypes }});
    }

    // Only apply $or if typeFilterArray's length is greater than 1
    if (typeFilterArray.length > 1) {
        queryArray.push({ "$or": typeFilterArray });
    } else if (typeFilterArray.length == 1) {
        queryArray.push(typeFilterArray[0]);
    }

    //console.log("Game types")
    //console.log(gameTypes)
    //console.log("Query array")
    //console.log(queryArray)

    // Platforms
    const platforms: number[] = [];
    
    appendToArray(platforms, xbsx, 169); // Xbox Series X|S
    appendToArray(platforms, xbo, 49); // Xbox One
    appendToArray(platforms, ps5, 167); // PS5
    appendToArray(platforms, ps4, 48); // PS4
    appendToArray(platforms, ns2, 508); // Switch 2
    appendToArray(platforms, ns, 130); // Switch
    appendToArray(platforms, windows, 6); // Windows
    appendToArray(platforms, mac, 14); // Mac
    appendToArray(platforms, linux, 3); // Linux

    //console.log("Platforms")
    //console.log(platforms)

    // Genres
    const genres: number[] = [];

    appendToArray(genres, adventure, 31); // Adventure
    appendToArray(genres, arcade, 33); // Arcade
    appendToArray(genres, card, 35) // Card & Board Game
    appendToArray(genres, fighting, 4) // Fighting
    appendToArray(genres, hackAndSlash, 25); // Hack-and-Slash/Beat-em-up
    appendToArray(genres, indie, 32); // Indie
    appendToArray(genres, moba, 36); // MOBA
    appendToArray(genres, music, 7); // Music
    appendToArray(genres, platformer, 8); // Platform
    appendToArray(genres, pointAndClick, 2); // Point-and-Click
    appendToArray(genres, puzzle, 9); // Puzzle
    appendToArray(genres, quiz, 26); // Quiz/Trivia
    appendToArray(genres, racing, 10); // Racing
    appendToArray(genres, rts, 11); // Real-Time Strategy (RTS)
    appendToArray(genres, rpg, 12) ;// Role-Playing (RPG)
    appendToArray(genres, simulator, 13); // Simulator
    appendToArray(genres, shooter, 5); // Shooter
    appendToArray(genres, sports, 14); // Sports
    appendToArray(genres, strategy, 15); // Strategy
    appendToArray(genres, tactical, 24); // Tactical
    appendToArray(genres, tbs, 16); // Turn-Based Strategy (TBS)
    appendToArray(genres, visualNovel, 34); // Visual Novel

    // Game Modes
    const gameModes: number[] = [];

    appendToArray(gameModes, singlePlayer, 1);
    appendToArray(gameModes, multiplayer, 2);
    appendToArray(gameModes, coOp, 3);
    appendToArray(gameModes, splitScreen, 4);
    appendToArray(gameModes, mmo, 5);
    appendToArray(gameModes, battleRoyale, 6);

    const orArray = [];
    if (gameTypes.length > 0) {
        orArray.push({ 'game_type.IGDB_game_type_id': { $in: gameTypes }});
    }
    if (standard === true) {
        orArray.push({ 'game_type.IGDB_game_type_id': { $exists: false }});
    }
    //console.log("orArray")
    //console.log(orArray)

    let conditionObject;
    if (orArray.length == 1) {
        conditionObject = orArray[0];
    } else if (orArray.length > 0) {
        conditionObject = { "$or": orArray };
    } else {
        conditionObject = {};
    }

    let queryObject;
    const findArray = [];
    if (orArray.length > 0) {
        findArray.push(conditionObject);
    }

    if (platforms.length > 0) {
        findArray.push({ "platforms.IGDB_platform_id": { "$in": platforms }});
    }

    if (genres.length > 0) {
        findArray.push({ "genres.IGDB_genre_id": { "$in": genres } });
    }

    if (gameModes.length > 0) {
        findArray.push({ "game_modes.IGDB_game_mode_id": { "$in": gameModes }});
    }

    // $and is only applied if filtering by two
    if (findArray.length > 1) {
        //console.log("findArray length > 1")
        //console.log(findArray)
        queryObject = { "$and": findArray };
        //queryObject = {}
    } else if (findArray.length == 1) {
        //console.log("findArray length = 1")
        //console.log(findArray[0])
        queryObject = findArray[0];
        //queryObject = {}
    } else {
        queryObject = {};
    }
    //console.log("Query object")
    //console.log(queryObject)
    //console.log(JSON.stringify(queryObject))

    const pipeline = [];

    // Initial search part of the pipeline; search by title and alternative titles
    if (search != "") {
        pipeline.push({
            "$search": {
                index: GAME_SEARCH_INDEX, // The index provided must be a search index; normal indexes won't work
                "text": {
                    "query": search,
                    "path": ["title", "alternative_titles.title"] // Which fields to search
                },
                count: {
                    type: 'total'
                }
            }
        });
    }

    // Only add the pipeline object if filtering is specified
    if (findArray.length >= 1) {
        pipeline.push({ "$match": queryObject });
    }

    const projectObject = {
        _id: 1,
        IGDB_id: 1,
        title: 1,
        cover: {
            IGDB_cover_id: 1,
            image_id: 1,
            height: 1,
            width: 1,
            url: 1
        },
        game_type: {
            IGDB_game_type_id: 1,
            type: 1
        }
    };

    // Add the page limit
    //pipeline.push({ $limit: limit });
    //pipeline.push({ $skip: skip });

    // Add the project field
    pipeline.push({
        "$project": projectObject
    });
    
    pipeline.push({
        $facet: {
            metadata: [
                { $count: 'totalCount' },
            ],
            data: [{ $skip: (page - 1) * limit }, { $limit: limit }]
        }
    })

    //console.log(pipeline)
    //console.log(JSON.stringify(pipeline))

    try {
        const gamesCollection = db.collection(process.env.MONGODB_GAME_COLLECTION_NAME!)

        let games; // Stores the games returned
        let gameCount;
        //console.log(search)

        /*if (search.trim() == "") {
            console.log("No search")
            games = (
                await gamesCollection?.find(queryObject)
                .limit(limit)
                .skip(skip)
                .project(projectObject)
                .toArray()
            ) as Game[]

            gameCount = await gamesCollection.countDocuments(queryObject);
            /*res.status(200).json({
                success: true,
                message: 'No search provided.'
            })*//*
        } else {*/
            //console.log("Search provided")
            games = (
                await gamesCollection.aggregate(pipeline).toArray()
            ) //as Game[];

            gameCount = games.length;

            //console.log("Games")
            //console.log(JSON.stringify(games))

            //console.log("Game count")
            //console.log(gameCount)
        //}

        //const pageCount: number = Math.ceil(Number(gameCount) / limit);
        const pageCount: number = Math.ceil(games[0]?.metadata[0].totalCount / limit);

        /*res.status(200).json({
            success: true,
            games: games,
            gameCount: gameCount,
            pageCount: pageCount
        });*/
        res.status(200).json({
            success: true,
            games: games[0]?.data,
            gameCount: games[0]?.metadata[0].totalCount,
            pageCount: pageCount
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: `Error getting search results: ${error}`
        });
    }
})

export { getGameSearchResultsRouter };