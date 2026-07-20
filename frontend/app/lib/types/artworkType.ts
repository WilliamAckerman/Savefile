import type Artwork from './artwork.js'

type ArtworkType = {
    IGDB_artwork_type_id: number
    name: string
    artworks: Artwork[]
}

export default ArtworkType