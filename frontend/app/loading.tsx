import Link from 'next/link';
import Header from '@/app/components/Header';
import Footer from '@/app/components/Footer';

import { LoaderCircle } from 'lucide-react';

export default function Loading() {
    const h2 = "text-neutral-50 text-xl sm:text-2xl md:text-3xl lg:text-4xl"
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
            {/*<Header />*/}
            <main className="bg-primaryBg">
                {/* Hero Section */}
                <section className="bg-secondaryBg h-[100vh] flex items-center justify-center">
                    <div className="absolute mx-auto bg-primaryBg rounded-md shadow-md p-4">
                        <h1 className="mb-4 text-center text-primaryText text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl">
                            Loading...
                        </h1>

                        {/*<svg className="animate-spin size-5 text-white" viewBox="0">
                            <LoaderCircle className="text-center text-xl" />
                        </svg>*/}

                        <div className="mx-auto mb-2">
                            <LoaderCircle className="text-center text-primaryText mx-auto block text-3xl animate-spin" />
                        </div>

                        <h2 className="text-center text-primaryText text-xl sm:text-2xl md:text-3xl lg:text-4xl">
                            Please wait...
                        </h2>
                    </div>
                </section>

                {/* DisplayGames (Total Rating) */}

                {/* DisplayGames (Recently Released) */}

                {/* DisplayGames (Coming Soon) */}

                {/* DisplayGames (Most Anticipated) */}
            </main>
            <Footer />
        </div>
    )
}