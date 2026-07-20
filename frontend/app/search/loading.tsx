import Header from '../components/Header';
import Footer from '../components/Footer';
import GridGameSkeleton from '@/app/components/skeletons/GridGameSkeleton';
import SearchResultsSkeleton from './_components/skeletons/SearchResultsSkeleton';
import { PageHeaderSection } from '../components/PageHeaderSection';

function Loading() {
    return (
        <div>
            {/*<p>Loading...</p>*/}
            <Header />
            <main className="bg-primaryBg">

                {/*<div>
                    <h1 className="ml-4 p-4 text-primaryText text-2xl md:text-3xl lg:text-4xl">Search</h1>
                    <hr className="text-primaryText" />
                </div>*/}
                <PageHeaderSection
                    current_page="Search"
                />

                <div className="flex flex-col lg:flex-row">
                    <div className="flex items-center lg:items-start lg:w-[40%]">
                        {/* Search Form Skeleton */}
                        <div className="w-full mx-auto">
                            <div className="bg-secondaryBg animate-pulse rounded-sm shadow-sm p-4 m-4 h-[45vh] lg:h-[90vh] overflow-y-auto"></div>
                        </div>
                    </div>

                    <div className="flex items-center lg:items-start lg:w-[60%]">
                        {/*<section className="bg-primaryBg w-full p-4">
                            <div>*/}
                                <SearchResultsSkeleton />

                                {/*<h2 className="text-primaryText mb-4 text-xl md:text-2xl lg:text-3xl">Loading...</h2>
                                <p className="text-primaryText md:text-lg lg:text-xl">Please wait...</p>*/}

                                {/* Game Grid */}
                                {/*<div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mx-auto p-4 h-[45vh] lg:h-[95vh] overflow-y-auto">

                                    <div className="w-[200px] h-[250px] p-4 mx-auto animate-pulse lg:m-0 bg-secondaryBg">
                                        <div className="bg-secondaryBg"></div>
                                    </div>

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

                                </div>*/}

                                {/*<div className="mx-auto flex items-center">*/}
                                    {/* Pagination */}
                                {/*</div>*/}
                            {/*</div>
                        </section>*/}
                    </div>
                </div>
            </main>
        </div>
    )
}

export default Loading;