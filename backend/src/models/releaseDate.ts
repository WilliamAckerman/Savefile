import { type Platform } from "./platform.js"
import { type ReleaseRegion } from "./releaseRegion.js"
import { type ReleaseDateStatus } from "./releaseDateStatus.js"

export type ReleaseDate = {
    IGDB_release_date_id: Number
    date: Number
    platform: Platform
    release_region: ReleaseRegion
    release_date_status: ReleaseDateStatus
}