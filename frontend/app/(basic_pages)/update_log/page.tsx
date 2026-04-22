import type { Metadata } from 'next';

import '@/app/styles/General.css';

import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger
} from '@/app/components/Accordion';

export const metadata: Metadata = {
    title: 'Update Log'
}

export default function Page() {
    const h4 = "text-md md:text-lg lg:text-xl xl:text-2xl";

    return (
        <>
            {/*<main>*/}
            <h1 className="main-header">Update Log</h1>

            <div className="text-box mb-8">
                <h2 className="secondary-header mb-4">Version History</h2>

                <Accordion type="single" collapsible className="bg-violet-800">
                    <AccordionItem value="item-1">
                        <AccordionTrigger className="bg-violet-950 rounded-none p-2">
                            Version 0.1
                        </AccordionTrigger>
                        <AccordionContent className="p-2">
                            <h4 className={`${h4}`}>General:</h4>
                            <p>
                                First deployment of Savefile.
                            </p>

                            <h4 className={`${h4}`}>Landing Page:</h4>
                            <ul className="list-inside list-disc mb-2">
                                <li>
                                    Initial implementation
                                </li>
                            </ul>

                            <h4 className={`${h4}`}>Game Information:</h4>
                            <ul className="list-inside list-disc mb-2">
                                <li>
                                    Initial implementation
                                </li>
                            </ul>

                            <h4 className={`${h4}`}>Search Page</h4>
                            <ul className="list-inside list-disc mb-2">
                                <li>
                                    Initial implementation
                                </li>
                            </ul>

                            <h4 className={`${h4}`}>About Page:</h4>
                            <ul className="list-inside list-disc mb-2">
                                <li>
                                    Initial implementation
                                </li>
                            </ul>

                            <h4 className={`${h4}`}>Contact Page:</h4>
                            <ul className="list-inside list-disc mb-2">
                                <li>
                                    Initial implementation
                                </li>
                            </ul>

                            <h4 className={`${h4}`}>Guidelines Page:</h4>
                            <ul className="list-inside list-disc mb-2">
                                <li>
                                    Initial implementation
                                </li>
                            </ul>

                            <h4 className={`${h4}`}>Privacy Policy:</h4>
                            <ul className="list-inside list-disc">
                                <li>
                                    Initial version of Privacy Policy.
                                </li>
                            </ul>
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>
            </div>

            {/*<section className="p-4 bg-violet-500">
                <h2>Version 0.1</h2>

                <h3>Landing Page:</h3>

                <h3>Game Information:</h3>

                <h3>Search Page:</h3>

                <h3>About Page:</h3>

                <h3>Contact Page:</h3>

                <h3>Guidelines Page:</h3>

                <h3>Privacy Policy:</h3>
                
            </section>*/}
            {/*</main>*/}
        </>
    )
}