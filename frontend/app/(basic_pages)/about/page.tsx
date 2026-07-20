import type { Metadata } from 'next';
import Link from 'next/link';

import '@/app/styles/General.css';

import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger
} from '@/app/components/Accordion';

import { PageHeaderSection } from '@/app/components/PageHeaderSection';

export const metadata: Metadata = {
    title: 'About'
}

export default function Page() {
    return (
        <>
            <PageHeaderSection
                current_page="About"
            />

            <section className="p-4"> {/* Formerly had bg-violet-800, text-box, bg-secondaryBg, text-secondaryText, and mb-8 classes */}
                <div className="text-box bg-secondaryBg text-secondaryText">
                    <h2 className="secondary-header">
                        About Savefile
                    </h2>
                    <hr className="mb-2" />

                    <Accordion type="multiple">
                        <AccordionItem value="item-1">
                            <AccordionTrigger className="transition-none">
                                How Did We Get Here?
                            </AccordionTrigger>
                            <AccordionContent>
                                <p className="mb-2">
                                    Savefile is a web application that aims to propose an improved user experience for IGDB. Originally, 
                                    this project was going to be its own thing, until I noticed that many features I planned to implement were 
                                    shared by IGDB.
                                </p>

                                <p>
                                    The aim of this project is simple: create an immersive user experience where users can keep track of their 
                                    games, create gaming groups or teams with other users, and provide recommendations based on a user&apos;s gaming preferences. 
                                    This project takes into account the immmersive user interfaces of gaming consoles and platforms of past and present, 
                                    from the sleek, modern UI of the Playstation 5 to the simple, yet effective UI of Steam.
                                </p>
                            </AccordionContent>
                        </AccordionItem>

                        <AccordionItem value="item-2">
                            <AccordionTrigger className="transition-none">
                                Technology Stack
                            </AccordionTrigger>
                            <AccordionContent>
                                <p className="mb-2">
                                    The frontend of this website was created using Next.js app router with TypeScript.
                                </p>

                                <p className="mb-2">
                                    A Node.js/Express.js TypeScript backend is used to fetch data from a MongoDB database.
                                </p>

                                <p>
                                    A Python script makes use of calls to the IGDB API in order to add and update games within a MongoDB database.
                                </p>
                            </AccordionContent>
                        </AccordionItem>

                        <AccordionItem value="item-3">
                            <AccordionTrigger className="transition-none">
                                Support IGDB
                            </AccordionTrigger>
                            <AccordionContent>
                                <p>
                                    You can support IGDB by visiting their <Link className="link hover:no-underline text-primaryLink" href="https://igdb.com" target="_blank" rel="noreferrer">website</Link>.
                                </p>
                            </AccordionContent>
                        </AccordionItem>

                        <AccordionItem value="item-4">
                            <AccordionTrigger className="transition-none">
                                More Information
                            </AccordionTrigger>
                            <AccordionContent>
                                <p>
                                    Feel free to use this website&apos;s <Link className="link hover:no-underline text-primaryLink" href="/contact">contact form</Link> if you 
                                    have any suggestions on how to improve Savefile.
                                </p>
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>
                </div>
            </section>
        </>
    )
}