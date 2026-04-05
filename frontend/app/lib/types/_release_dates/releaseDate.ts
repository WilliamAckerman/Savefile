import type Platform from '@/app/lib/types/platform';
import type ReleaseRegion from '@/app/lib/types/_release_dates/releaseRegion';
import type ReleaseDateStatus from '@/app/lib/types/_release_dates/releaseDateStatus';

type ReleaseDate = {
    IGDB_release_date_id: number
    date: number
    platform: Platform
    release_region: ReleaseRegion
    release_date_status: ReleaseDateStatus
}

export default ReleaseDate;