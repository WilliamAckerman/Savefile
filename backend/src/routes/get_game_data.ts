import { db } from './../db/mongoDbClient.js';
import express, { type Request, type Response } from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";

dotenv.config()

const jsonParser = bodyParser.json()

const getGameDataRouter = express.Router()

getGameDataRouter.get("/:game_id", jsonParser, async (req: Request, res: Response) => {
    const gameId = req.params.game_id ? req.params.game_id.toString() : null;

    if (gameId === null || gameId === undefined) {
        res.json({
            success: false,
            error: `Failed to get game data: Game ID was undefined or null.`
        })
    }

    try {
        const gamesCollection = db.collection(process.env.MONGODB_GAME_COLLECTION_NAME!)

        const game = (
            await gamesCollection.find({ IGDB_id: Number(gameId) }).toArray()
        )

        if (game.length == 0) {
            res.json({
                success: false,
                error: "Error getting game data: No game was found for this ID."
            })
        } else {
            res.json({
                success: true,
                message: `Got game data for game with IGDB id of ${gameId} successfully.`,
                data: game[0]
            })
        }

    } catch (error) {
        res.json({
            success: false,
            error: `Error getting game data: ${error}`
        })
    }
})

export { getGameDataRouter }