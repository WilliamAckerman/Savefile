import './_styles/tabContent.css';

export default function KeywordsTab(props) {
    const keywords = props.keywords;

    return (
        <div className="w-full">
            <h1 className="h1 mb-4">Keywords</h1>

            <div className="bg-violet-700 rounded-sm flex flex-row flex-wrap mx-auto p-4">
                {
                    keywords.map((keyword) => {
                        return (
                            <div key={`K${keyword.IGDB_keyword_id}`} className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 mx-auto p-4">
                                <strong className="block text-center md:text-lg lg:text-xl">{keyword.name}</strong>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}