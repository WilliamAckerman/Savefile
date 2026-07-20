type LanguageSupport = {
    /*id*/IGDB_language_id: number
    name: string
    native_name: string

    audio?: boolean
    subtitles?: boolean
    interface?: boolean
}

export default LanguageSupport;