import './_styles/tabContent.css';
import type LanguageSupport from '../../../../lib/types/_language_supports/languageSupport';
import SectionHeader from '../_general/SectionHeader';

interface LanguageSupportsTabProps {
    language_supports: /*LanguageSupportArray*/LanguageSupport[]
}

export default function LanguageSupportsTab(props: LanguageSupportsTabProps) {
    const languageSupports = props.language_supports;

    const cellClass = "p-2 border";

    //const audioSupports = (languageSupports?.audio_supports && languageSupports.audio_supports.length > 0) ? languageSupports.audio_supports : [];
    //const interfaceSupports = (languageSupports?.interface_supports && languageSupports.interface_supports.length > 0) ? languageSupports.interface_supports : [];
    //const subtitleSupports = (languageSupports?.subtitle_supports && languageSupports.subtitle_supports.length > 0) ? languageSupports.subtitle_supports : [];

    return (
        <div className="w-full max-h-[80vh]">
            <SectionHeader
                title="Language Supports"
            />

            <div className="flex flex-col lg:flex-row flex-wrap mx-auto">

                {
                    languageSupports && languageSupports.length > 0 &&
                    <table className="bg-secondaryBg text-secondaryText text-left table-auto border border-solid mb-4">
                        <thead className="bg-accentBg text-accentText">
                            <tr>
                                <th className={`${cellClass}`}>Language</th>
                                <th className={`${cellClass}`}>Audio</th>
                                <th className={`${cellClass}`}>Subtitles</th>
                                <th className={`${cellClass}`}>Interface</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                languageSupports.map((support) => {
                                    return (
                                        <tr key={support.IGDB_language_id}>
                                            <td className={`${cellClass}`}>{support.native_name + "/" + support.name}</td>
                                            <td className={`${cellClass}`}>{support.audio ? "Yes" : "No"}</td>
                                            <td className={`${cellClass}`}>{support.subtitles ? "Yes" : "No"}</td>
                                            <td className={`${cellClass}`}>{support.interface ? "Yes" : "No"}</td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                }
                
                {/*
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
                */}

            </div>
        </div>
    )
}