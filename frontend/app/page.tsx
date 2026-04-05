import Image from "next/image";
import Link from 'next/link';
import Header from '@/app/components/Header';
import Footer from '@/app/components/Footer';
import DisplayGames from '@/app/components/landing_page/DisplayGames'
import GameCarouselSkeleton from '@/app/components/landing_page/skeletons/GameCarouselSkeleton';
import { Suspense } from 'react';

export default function Home() {
  const h2 = "text-neutral-50 text-xl sm:text-2xl md:text-3xl lg:text-4xl"
  const button = `
    hover:cursor-pointer 
    hover:scale-110 
    transition 
    p-2 
    rounded-md 
    bg-violet-500 
    text-white 
    w-full 
  `;

  return (
    <div>
      <Header />
      <main className="bg-slate-900">
        <section className="bg-black h-[100vh] flex items-center justify-center">
          <div>
            <h1 className="mb-4 text-center text-neutral-50 text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl">
              Savefile
            </h1>
            <h2 className={`mb-8 text-center ${h2}`}>
              Max out your experience.
            </h2>
            <div className="flex items-center justify-evenly flex-col lg:flex-row mb-4">
              <button className={`${button} md:w-[30%] mb-4 lg:mb-0 lg:mr-2`}>
                Log In
              </button>
              <button className={`${button} md:w-[30%] lg:ml-2`}>
                Sign Up
              </button>
            </div>

            <div className="flex items-center justify-evenly mt-8">
              <Link href="/search" className={`${button} md:w-[60%]`}>
                <span className="text-center block">Search for games...</span>
              </Link>
            </div>
          </div>
        </section>

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

        <section className="p-4">
          <h2 className={`text-white mb-8 ${h2}`}>
            Highest Rated (IGDB Total Rating)
          </h2>
          <Suspense fallback={<GameCarouselSkeleton />}>
            <DisplayGames
              code={"total_rating"}
              field={"total_rating"}
              reverse={true}
            />
          </Suspense>
        </section>

        <section className="p-4">
          <h2 className={`text-white mb-8 ${h2}`}>
            Recently Released
          </h2>
          <Suspense fallback={<GameCarouselSkeleton />}>
            <DisplayGames
              code={"first_release_date"}
              field={"first_release_date"}
              reverse={true}
            />
          </Suspense>
        </section>

        <section className="p-4">
          <h2 className={`text-white mb-8 ${h2}`}>
            Coming Soon
          </h2>
          <Suspense fallback={<GameCarouselSkeleton />}>
            <DisplayGames
              code={"coming_soon"}
              field={"first_release_date"}
              reverse={false}
            />
          </Suspense>
        </section>

        <section className="p-4">
          <h2 className={`text-white mb-8 ${h2}`}>
            Most Anticipated
          </h2>
          <Suspense fallback={<GameCarouselSkeleton />}>
            <DisplayGames
              code={"most_anticipated"}
              field={"hypes"}
              reverse={true}
            />
          </Suspense>
        </section>
      </main>
      <Footer />
    </div>
  );
}
