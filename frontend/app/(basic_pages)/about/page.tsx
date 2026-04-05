import type { Metadata } from 'next';
import Link from 'next/link';

import '@/app/styles/General.css';

export const metadata: Metadata = {
    title: 'About'
}

export default function Page() {
    return (
        <>
            {/*<main className="bg-slate-900 p-6">*/}
                <h1 className="main-header">
                    About Savefile
                </h1>

                <section className="text-box bg-purple-800 mb-8">
                    <h2 className="secondary-header">
                        How Did We Get Here?
                    </h2>

                    <p className="mb-2">
                        Savefile is a web application that aims to propose an improved user experience for IGDB. Originally, 
                        this project was going to be its own thing, until I noticed that many features I planned to implement were 
                        shared by IGDB.
                    </p>

                    <p>
                        The aim of this project is simple: create an immersive user experience where users can keep track of their 
                        games, create gaing groups or teams with other users, and provide recommendations based on a user&apos;s gaming preferences. 
                        This project takes into account the immmersive user interfaces of gaming consoles and platforms of past and present, 
                        from the sleek, modern UI of the Playstation 5 to the simple, yet effective UI of Steam.
                    </p>
                </section>

                <section className="text-box bg-purple-800 mb-8">
                    <h2 className="secondary-header">Technology Stack</h2>

                    <p className="mb-2">
                        The frontend of this website was created using Next.js app router with TypeScript.
                    </p>

                    <p className="mb-2">
                        A Node.js/Express.js TypeScript backend is used to fetch data from a MongoDB database.
                    </p>

                    <p>
                        The IGDB API is integrated into Python scripts in order to add and update games within a MongoDB database.
                    </p>
                </section>

                <section className="text-box bg-purple-800">
                    <h2 className="secondary-header">
                        Other Information
                    </h2>

                    <p className="mb-2">
                        You can support IGDB by visiting their website through the following link: <Link href="https://www.igdb.com/" target="_blank" rel="noreferrer">igdb.com</Link>.
                    </p>

                    <p>
                        Feel free to use this website&apos;s contact form (Link: <Link href="/contact">Contact</Link>) if you have any suggestions 
                        on how to improve Savefile.
                    </p>
                </section>
            {/*</main>*/}
        </>
    )
}