import type LanguageSupport from "./languageSupport";

type LanguageSupportArray = {
    audio_supports?: LanguageSupport[]
    subtitle_supports?: LanguageSupport[]
    interface_supports?: LanguageSupport[]
}

export default LanguageSupportArray;