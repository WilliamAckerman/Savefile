import GridGameSkeleton from "@/app/components/skeletons/GridGameSkeleton"

export default function SearchResultsSkeleton() {
    return (
        <section className="bg-primaryBg w-full p-4">
        <div>
            <h2 className="text-primaryText mb-4 text-xl md:text-2xl lg:text-3xl">Loading...</h2>
            <p className="text-primaryText md:text-lg lg:text-xl">Please wait...</p>
        
            {/* Game Grid */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mx-auto p-4 h-[45vh] lg:h-[95vh] overflow-y-auto">
        
                {/*<div className="w-[200px] h-[250px] p-4 mx-auto animate-pulse lg:m-0 bg-secondaryBg">
                    <div className="bg-secondaryBg"></div>
                </div>*/}
                <GridGameSkeleton />
        
                <GridGameSkeleton />
                <GridGameSkeleton />
                <GridGameSkeleton />
                <GridGameSkeleton />
                <GridGameSkeleton />
                <GridGameSkeleton />
                <GridGameSkeleton />
                <GridGameSkeleton />
                <GridGameSkeleton />
                <GridGameSkeleton />
                <GridGameSkeleton />
        
            </div>
        </div>
        </section>
    )
}