import './_styles/tabContent.css';
import type Keyword from '@/app/lib/types/keyword';
import SectionHeader from '../_general/SectionHeader';

interface KeywordsTabProps {
    keywords: Keyword[]
}

export default function KeywordsTab(props: KeywordsTabProps) {
    const keywords = props.keywords;

    return (
        <div className="w-full max-h-[80vh]">
            <SectionHeader
                title="Keywords"
            />

            <div className="bg-secondaryBg rounded-sm flex flex-row flex-wrap mx-auto p-4 mb-4"> {/* Formerly had bg-violet-700 class */}
                {
                    keywords.map((keyword: Keyword) => {
                        return (
                            <div key={`K${keyword.IGDB_keyword_id}`} className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 mx-auto p-4">
                                <strong className="block text-center md:text-lg lg:text-xl text-secondaryText">{keyword.name}</strong>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}