import type Platform from '@/app/lib/types/platform';

type MultiplayerMode = {
    IGDB_multiplayer_mode_id: number
    platform?: Platform
    campaigncoop?: boolean
    dropin?: boolean
    lancoop?: boolean
    offlinecoop?: boolean
    offlinecoopmax?: number
    offlinemax?: number
    onlinecoop?: boolean
    onlinecoopmax?: number
    onlinemax?: number
    splitscreen?: boolean
    splitscreenonline?: boolean
}

export default MultiplayerMode