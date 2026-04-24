import './_styles/tabContent.css';
import LanguageSupportSection from '@/app/games/[IGDB_id]/_components/_language_supports/LanguageSupportSection';

import type LanguageSupportArray from '@/app/lib/types/_language_supports/languageSupportArray';

interface LanguageSupportsTabProps {
    language_supports: LanguageSupportArray
}

export default function LanguageSupportsTab(props: LanguageSupportsTabProps) {
    const languageSupports = props.language_supports;

    const audioSupports = (languageSupports?.audio_supports && languageSupports.audio_supports.length > 0) ? languageSupports.audio_supports : [];
    const interfaceSupports = (languageSupports?.interface_supports && languageSupports.interface_supports.length > 0) ? languageSupports.interface_supports : [];
    const subtitleSupports = (languageSupports?.subtitle_supports && languageSupports.subtitle_supports.length > 0) ? languageSupports.subtitle_supports : [];

    return (
        <div className="w-full">
            <h1 className="text-white h1">Language Supports</h1>

            <div className="flex flex-col lg:flex-row flex-wrap mx-auto">
                
                {
                    audioSupports && audioSupports.length > 0 &&
                    <LanguageSupportSection
                        language_supports={audioSupports}
                        type={"Audio"}
                        keyValue={"A"}
                    />
                }

                {
                    interfaceSupports && interfaceSupports.length > 0 &&
                    <LanguageSupportSection
                        language_supports={interfaceSupports}
                        type={"Interface"}
                        keyValue={"I"}
                    />
                }

                {
                    subtitleSupports && subtitleSupports.length > 0 &&
                    <LanguageSupportSection
                        language_supports={subtitleSupports}
                        type={"Subtitles"}
                        keyValue={"S"}
                    />
                }

            </div>
        </div>
    )
}