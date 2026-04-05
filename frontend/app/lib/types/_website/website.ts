import type WebsiteType from '@/app/lib/types/_website/website';

type Website = {
    IGDB_website_id: number
    url: string
    trusted?: boolean
    type?: WebsiteType
}

export default Website;