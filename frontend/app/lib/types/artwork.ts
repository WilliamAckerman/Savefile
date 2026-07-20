type ArtworkType = {
    IGDB_artwork_type_id: number
    name: string
}

type Artwork = {
    IGDB_artwork_id: number
    image_id: string
    url: string
    width: number
    height: number
    //artwork_type: ArtworkType
}

export default Artwork