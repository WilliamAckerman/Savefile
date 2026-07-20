/*function mapSupports(array) {
    let returnArray = [];
    for (let i = 0; i < array.length; i++) {
        returnArray.push(array[i]);
    }
    returnArray = returnArray.sort();
    const returnString = returnArray.join(", ");
    return returnString;
}*/

import type LanguageSupport from "@/app/lib/types/_language_supports/languageSupport";

interface LanguageSupportSectionProps {
    language_supports: LanguageSupport[]
    type: string
    keyValue: string
}

export default function LanguageSupportSection(props: LanguageSupportSectionProps) {
    const languageSupports = props.language_supports.sort();
    const type: string = props.type;
    const keyValue: string = props.keyValue;
    
    const h2 = "text-lg md:text-xl lg:text-3xl"; /* Formerly had text-white */

    return (
        <div className="p-4 m-4 mx-auto bg-accentBg text-accentText rounded-sm"> {/* Formerly had bg-violet-700 */}
            <h2 className={h2}>{type}</h2>

            <ul className="list-inside list-disc">
                {/*
                    languageSupports.map((support) => {
                        return (
                            <li key={keyValue + support.id}>{support.name} / {support.native_name}</li>
                        )
                    })
                */}
            </ul>
        </div>
    )
}