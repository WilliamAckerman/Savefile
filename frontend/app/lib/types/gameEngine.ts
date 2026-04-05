import type Platform from '@/app/lib/types/platform';

type GameEngine = {
    IGDB_game_engine_id: number
    name: string
    platforms: Platform[]
}

export default GameEngine;