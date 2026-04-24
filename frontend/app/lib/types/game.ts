import type Addon from '@/app/lib/types/addon';
import type AgeRating from '@/app/lib/types/_age_ratings/ageRating';
import type AlternativeTitle from '@/app/lib/types/alternativeTitle';
import type Artwork from '@/app/lib/types/artwork';
import type Cover from '@/app/lib/types/cover';
import type GameEngine from './gameEngine';
import type GameMode from '@/app/lib/types/gameMode';
import type GameStatus from './gameStatus';
import type GameTimeToBeat from '@/app/lib/types/gameTimeToBeat';
import type GameType from './gameType';
import type Genre from '@/app/lib/types/genre';
import type InvolvedCompany from '@/app/lib/types/involvedCompany';
import type Keyword from '@/app/lib/types/keyword';
import type LanguageSupport from './_language_supports/languageSupport';
import type LanguageSupportArray from './_language_supports/languageSupportArray';
import type MultiplayerMode from './multiplayerMode';
import type Platform from '@/app/lib/types/platform';
import type PlayerPerspective from '@/app/lib/types/playerPerspective';
import type ReleaseDate from '@/app/lib/types/_release_dates/releaseDate';
import type Screenshot from '@/app/lib/types/screenshot';
import type Video from '@/app/lib/types/video';
import type Website from '@/app/lib/types/_website/website';

type Game = {
    IGDB_id: number
    title: string
    summary: string
    IGDB_created_at: number
    IGDB_updated_at: number
    IGDB_url: string
    created_at: number
    updated_at: number
    storyline?: string
    platforms?: Platform[]
    genres?: Genre[]
    cover?: Cover
    game_time_to_beat?: GameTimeToBeat
    rating?: number
    rating_count?: number
    aggregated_rating?: number
    aggregated_rating_count?: number
    total_rating?: number
    total_rating_count?: number
    alternative_titles?: AlternativeTitle[]
    release_dates?: ReleaseDate[]
    involved_companies?: InvolvedCompany[]
    game_engines?: GameEngine[]
    game_modes?: GameMode[]
    multiplayer_modes?: MultiplayerMode[]
    language_supports?: LanguageSupportArray
    player_perspectives?: PlayerPerspective[]
    screenshots?: Screenshot[]
    artworks?: Artwork[]
    videos?: Video[]
    age_ratings?: AgeRating[]
    websites?: Website[]
    keywords?: Keyword[]
    hypes?: number
    dlcs?: Addon[]
    expanded_games?: Addon[]
    expansions?: Addon[]
    remasters?: Addon[]
    remakes?: Addon[]
    parent_game?: Addon
    standalone_expansions?: Addon[]
    game_status?: GameStatus
    game_type?: GameType
    first_release_date?: number
}

export default Game;