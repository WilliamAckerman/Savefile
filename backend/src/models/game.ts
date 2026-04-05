import { ObjectId } from "mongodb"
import { type Platform } from './platform.js'
import { type ReleaseDate } from './releaseDate.js'
import { type GameMode } from './gameMode.js'

export type Game = {
    _id: ObjectId
    IGDB_id: Number
    title: String
    summary: String
    storyline?: String
    platforms?: Platform[]
    release_dates: ReleaseDate[]
    game_modes?: GameMode[]
}