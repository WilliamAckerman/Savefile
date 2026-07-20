import Image from "next/image";
import Link from 'next/link';
import Header from '@/app/components/Header';
import Footer from '@/app/components/Footer';
import DisplayGames from '@/app/components/landing_page/DisplayGames'
import GameCarouselSkeleton from '@/app/components/landing_page/skeletons/GameCarouselSkeleton';
import { Suspense } from 'react';

import { Search } from 'lucide-react';

import {
  Carousel,
  CarouselContent,
  CarouselItem
} from '@/app/components/EmblaCarousel';

import HeroSection from "./components/landing_page/HeroSection";

export default function Home() {
  const h2 = "text-primaryText text-xl sm:text-2xl md:text-3xl lg:text-4xl semibold"
  const button = `
    hover:cursor-pointer 
    hover:scale-110 
    transition 
    p-2 
    rounded-md 
    bg-button 
    text-white 
    w-full 
  `; /* Formerly bg-violet-500 instead of bg-button */

  return (
    <div>
      <Header />

      <HeroSection />

      {/*<main className="bg-primaryBg">*/} {/* Formerly bg-slate-900 */}
        {/*<section className="bg-secondaryBg h-[100vh] flex items-center justify-center">
          <div className="absolute mx-auto bg-primaryBg rounded-md shadow-md p-4">
            <h1 className="mb-4 text-center text-primaryText text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl">
              Savefile
            </h1>
            <h2 className={`mb-4 text-center ${h2}`}>*/} {/* Formerly had mb-8 class */}
              {/*Max out your experience.
            </h2>

            <hr className="text-primaryText mb-4" />

            <span className="block text-center text-primaryText md:text-xl mb-8">Version 1.0 (June 30, 2026)</span>*/}

            {/*<div className="flex items-center justify-evenly flex-col lg:flex-row mb-4">
              <button className={`${button} md:w-[30%] mb-4 lg:mb-0 lg:mr-2`}>
                Log In
              </button>
              <button className={`${button} md:w-[30%] lg:ml-2`}>
                Sign Up
              </button>
            </div>*/}

            {/*<div className="flex items-center justify-evenly mt-8">
              <Link href="/search" className={`${button} md:w-[60%]`}>
                <span className="text-center block text-base"><Search className="inline-block text-base" /> Search for games...</span>
              </Link>
            </div>
          </div>
        </section>*/}

        {/*<section className="p-4">
          <h2 className={`text-white mb-8 ${h2}`}>
            Most Rated (IGDB Total Rating Count)
          </h2>
          <Suspense fallback={<GameCarouselSkeleton />}>
            <DisplayGames 
              code={"total_rating_count"}
              field={"total_rating_count"} 
              reverse={true}
            />
          </Suspense>
        </section>*/}

        {/*<GameCarouselSkeleton />*/}

        {/*<DisplayGames
          code={"total_rating"}
          field={"total_rating"}
          reverse={true}
          title="Highest Rated (IGDB Total Rating)"
          sectionClass="mb-8"
        />*/}

        {/*<section className="p-4 mb-8">
          <h2 className={`text-white mb-4 lg:mb-6 ${h2}`}>
            Highest Rated (IGDB Total Rating)
          </h2>
          <Suspense fallback={<GameCarouselSkeleton />}>
            <DisplayGames
              code={"total_rating"}
              field={"total_rating"}
              reverse={true}
            />
          </Suspense>
        </section>*/}

        {/*<DisplayGames
          code="first_release_date"
          field="first_release_date"
          reverse={true}
          title="Recently Released"
          sectionClass="mb-8"
        />*/}
        {/*<section className="p-4 mb-8">
          <h2 className={`text-white mb-4 lg:mb-6 ${h2}`}>
            Recently Released
          </h2>
          <Suspense fallback={<GameCarouselSkeleton />}>
            <DisplayGames
              code={"first_release_date"}
              field={"first_release_date"}
              reverse={true}
            />
          </Suspense>
        </section>*/}

        {/*<DisplayGames
          code="coming_soon"
          field="first_release_date"
          reverse={false}
          title="Coming Soon"
          sectionClass="mb-8"
        />*/}

        {/*<section className="p-4 mb-8">
          <h2 className={`text-white mb-4 lg:mb-6 ${h2}`}>
            Coming Soon
          </h2>
          <Suspense fallback={<GameCarouselSkeleton />}>
            <DisplayGames
              code={"coming_soon"}
              field={"first_release_date"}
              reverse={false}
            />
          </Suspense>
        </section>*/}

        {/*<DisplayGames
          code="most_anticipated"
          field={"hypes"}
          reverse={true}
          title="Most Anticipated"
        />*/}

        {/*<section className="p-4">
          <h2 className={`text-white mb-4 lg:mb-6 ${h2}`}>
            Most Anticipated
          </h2>
          <Suspense fallback={<GameCarouselSkeleton />}>
            <DisplayGames
              code={"most_anticipated"}
              field={"hypes"}
              reverse={true}
            />
          </Suspense>
        </section>*/}
      {/*</main>*/}
      <Footer />
    </div>
  );
}
