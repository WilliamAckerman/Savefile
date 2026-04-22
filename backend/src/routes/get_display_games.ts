import express, { type Request, type Response } from "express"
import bodyParser from "body-parser"
import dotenv from "dotenv"
import { initMongoDbClient, db } from './../db/mongoDbClient.js'

dotenv.config()

const jsonParser = bodyParser.json()

const getDisplayGamesRouter = express.Router()

getDisplayGamesRouter.post('/', jsonParser, async (req: Request, res: Response) => {
    const body = req.body ? req.body : { field: "total_rating_count" }
    const code: string = body.code ? body.code.toString() : "total_rating_count"
    const field: string = body.field ? body.field.toString() : "total_rating_count"
    const reverse: boolean = body.reverse === true ? body.reverse : false

    const unix_timestamp = Date.now() / 1000;
    //console.log("Unix timestamp:", unix_timestamp)

    // By using project, we can limit which fields to return
    const project = {
        IGDB_id: 1,
        title: 1,
        cover: 1,
        game_type: 1,
        game_status: 1,
        total_rating_count: 1,
        total_rating: 1,
        first_release_date: 1,
        hypes: 1
    }

    const sort: number = (reverse === true) ? -1 : 1

    let findObject;
    let sortObject;

    if (code === "first_release_date") {
        findObject = {
            "first_release_date": { $lt: unix_timestamp }
        }
    } else if (code === "coming_soon") {
        /*findObject = {
            $or: [
                {"first_release_date": { $gt: unix_timestamp }},
                {"first_release_date": { $exists: false }}
            ]
        }*/
        findObject = {
            "first_release_date": { $gt: unix_timestamp }
        }
    } else if (code === "most_anticipated") {
        findObject = {
            $or: [
                {"first_release_date": { $gt: unix_timestamp }},
                {"first_release_date": { $exists: false }}
            ]
        }
    } else if (code === "total_rating") {
        findObject= {
            $and: [
                {"total_rating": {
                    $exists: true
                }},
                {"total_rating_count": {
                    $exists: true
                }}
            ]
        }
    }
    else {
        findObject = {}
    }

    

    try {
        //const client = await initMongoDbClient()

        //const db = client?.db(process.env.MONGODB_DB_NAME!)
        //console.log("Connected to db")

        const gamesCollection = db?.collection(process.env.MONGODB_GAME_COLLECTION_NAME!)

        //console.log("Connected to games collection.")

        const games = (
            await gamesCollection
                ?.find(findObject)
                .sort({ [field]: sort == -1 ? -1 : 1 })
                .limit(12)
                .project(project)
                .toArray()
        )

        //console.log(games)

        res.json({
            success: true,
            games: games
        })
    } catch (error) {
        //console.error(error)
        res.json({
            success: false,
            error: error
        })
    }
})

export { getDisplayGamesRouter }