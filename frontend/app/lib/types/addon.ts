import type Cover from "./cover"

import type GameType from "./gameType";

type Addon = {
    IGDB_id: number
    title: string
    cover: Cover

    game_type?: GameType
}

export default Addon;