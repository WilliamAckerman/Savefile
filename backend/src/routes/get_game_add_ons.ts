import express, { type Request, type Response } from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import { db } from "./../db/mongoDbClient.js";

dotenv.config();

const jsonParser = bodyParser.json();

const getGameAddOnsRouter = express.Router();

getGameAddOnsRouter.post('/', jsonParser, async (req: Request, res: Response) => {
    const IGDB_id = req.body.IGDB_id ? req.body.IGDB_id : null;
    const type = req.body.type ? req.body.type : null;

    const errors = [];
    if (IGDB_id === null) {
        errors.push("No IGDB id was provided.");
    }
    if (type === null) {
        errors.push("No game type was provided.");
    }

    if (errors.length > 0) {
        res.status(400).json({
            'success': false,
            'error': 'Could not get game add-ons.',
            'errorArray': errors
        });
    }

    const findObject = {
        parent_game: Number(IGDB_id),
        game_type: {
            IGDB_game_type_id: Number(type)
        }
    };

    const projectObject = {
        IGDB_id: 1,
        title: 1,
        cover: 1,
        game_type: 1
    };

    try {
        const gamesCollection = db?.collection(process.env.MONGODB_GAME_COLLECTION_NAME!);

        const games = (
            await gamesCollection
                ?.find(findObject)
                .sort({ first_release_date: -1 })
                .project(projectObject)
                .toArray()
        )

        res.status(200).json({
            success: true,
            games: games
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            error: error
        });
    }
})

export { getGameAddOnsRouter };