type Region = {
    IGDB_region_id: number
    name: string
    category: string
    identifier: string
}

type GameLocalization = {
    IGDB_game_localization_id: number
    name: string
    region: Region
}

export default GameLocalization