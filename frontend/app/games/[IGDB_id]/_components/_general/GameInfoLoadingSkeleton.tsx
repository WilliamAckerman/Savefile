import ReturnButton from "./ReturnButton"
import '@/app/games/[IGDB_id]/_styles/gameSection.css';

export default function GameInfoLoadingSkeleton() {
    return (
        <div className="group/tabs flex flex-col lg:flex-row">
            <div className="bg-accentBg lg:max-w-[20vw] w-[100%] overflow-x-auto shadCdnTabList"> {/* Formerly had bg-violet-500 class */}
                <ReturnButton
                    link="/"
                    text="Go to Home Page"
                />
                
                <ReturnButton
                    link="/search"
                    text="Go to Search Page"
                />
            </div>
            <div className="gameSectionBg bg-repeat flex bg-primaryBg">
                <div className="w-[80%] mx-auto max-h-[80%] bg-accentBg items-center rounded-sm shadow-sm p-4"> {/* Formerly had bg-violet-500 */}
                    <h1 className="text-center text-white text-lg sm:text-xl md:text-2xl lg:text-3xl text-4xl mb-4">Loading game information...</h1>
                    <p className="text-center text-white sm:text-lg md:text-xl lg:text-2xl text-3xl">Please wait...</p>
                </div>
            </div>
        </div>
    )
}