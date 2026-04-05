import express, { type Request, type Response } from "express"
import cors from "cors"
import dotenv from "dotenv"
import { initMongoDbClient } from './db/mongoDbClient.js'

import { getDisplayGamesRouter } from './routes/get_display_games.js'
import { getGameDataRouter } from './routes/get_game_data.js'
import { getGameSearchResultsRouter } from './routes/get_game_search_results.js';
import { getGameAddOnsRouter } from './routes/get_game_add_ons.js';
import { getSimilarGamesRouter } from './routes/get_similar_games.js';

import { sendContactMessageRouter } from "./routes/send_contact_message.js"
import { altchaChallengeRouter } from "./routes/altcha_challenge.js"

dotenv.config()

// Initialize Express app
const app = express()
const PORT = process.env.PORT

// Middleware
app.use(express.json())

app.use(cors())

app.get('/', (req: Request, res: Response) => {
    res.send("Hello World!")
})

app.listen(PORT, async () => {
    try {
        //await initMongoDbClient()

        app.use("/get_display_games", getDisplayGamesRouter)
        app.use("/get_game_data", getGameDataRouter)
        app.use("/get_game_search_results", getGameSearchResultsRouter);
        app.use("/get_game_add_ons", getGameAddOnsRouter);
        app.use("/get_similar_games", getSimilarGamesRouter);

        app.use("/send_contact_message", sendContactMessageRouter)
        app.use("/altcha_challenge", altchaChallengeRouter)
        
        console.log(`Example app listening on port ${PORT}`)
    } catch (error) {
        console.error(`Failed to start server: ${error}`)
    }
})