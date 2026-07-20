import { Suspense } from 'react'

import getHomePageGames from '@/app/lib/api/getHomePageGames'
import HeroCarousel from './HeroCarousel';
import GameCarousel from './GameCarousel';

import Link from 'next/link';
import { Search } from 'lucide-react';

import HeroCarouselSkeleton from './skeletons/HeroCarouselSkeleton';

export default async function HeroSection() {
    const gameData = await getHomePageGames();
    //console.log(gameData)

    const games = gameData?.games[0]

    return (
        <>
            <section className="bg-secondaryBg min-h-[100vh] flex items-center justify-evenly flex-col motion-reduce:transition-none ease-in-out duration-300">

                <Suspense fallback={<HeroCarouselSkeleton />}>
                    {
                        (gameData && gameData?.success === true) ?
                        <HeroCarousel
                            //array={games.hero_section.highest_rated}
                            array={games.highest_rated}
                        />
                        :
                        <p>Failed to get games.</p>
                    }
                </Suspense>

                <div className="absolute mx-auto bg-primaryBg rounded-md shadow-md p-4 z-999"> {/* Formerly had absolute class */}
                    <h1 className="mb-4 text-center text-primaryText text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl">
                        Savefile
                    </h1>
                    <h2 className="text-primaryText text-xl sm:text-2xl md:text-3xl lg:text-4xl semibold mb-4">
                        Max out your experience.
                    </h2>

                    <hr className="text-primaryText mb-4" />

                    <span className="block text-center text-primaryText md:text-xl mb-8">Version 1.0</span>

                    <div className="flex items-center justify-evenly mt-8">
                        <Link href="/search" className={`hover:cursor-pointer hover:scale-110 transition p-2 rounded-md bg-button text-white w-full md:w-[60%]`}>
                            <span className="text-center block text-base"><Search className="inline-block text-base" /> Search for games...</span>
                        </Link>
                    </div>
                </div>

                <Suspense fallback={<HeroCarouselSkeleton />}>
                    {
                        (gameData && gameData?.success === true) ?
                        <HeroCarousel
                            //array={games.hero_section.recently_released}
                            array={games.recently_released_hero}
                            direction="backward"
                        />
                        :
                        <p>Failed to get games.</p>
                    }
                </Suspense>
            </section>
            <main className="bg-primaryBg">
                <GameCarousel
                    title="Highest Rated (IGDB Total Rating)"
                    //games={games.sections.highest_rated_igdb}
                    games={games.highest_rated_igdb}
                    sectionClass="mb-8"
                    code="total_rating"
                />

                <GameCarousel
                    title="Recently Released"
                    games={games.recently_released}
                    sectionClass="mb-8"
                    code="first_release_date"
                />

                <GameCarousel
                    title="Coming Soon"
                    games={games.coming_soon}
                    sectionClass="mb-8"
                    code="coming_soon"
                />

                <GameCarousel   
                    title="Most Anticipated"
                    games={games.most_anticipated}
                    code="most_anticipated"
                />
            </main>
        </>
    )
}