import type { Metadata } from 'next';

import '@/app/styles/General.css';

import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger
} from '@/app/components/Accordion';

import LogSection from './_components/LogSection';
import { PageHeaderSection } from '@/app/components/PageHeaderSection';

export const metadata: Metadata = {
    title: 'Update Log'
}

export default function Page() {
    const h4 = "text-md md:text-lg lg:text-xl xl:text-2xl";

    return (
        <>
            <PageHeaderSection
                current_page="Update Log"
            />

            <section className="p-4">
                <div className="text-box bg-secondaryBg text-secondaryText"> {/* Formerly had mb-8 class */}
                    <h2 className="secondary-header mb-4">Version History</h2>

                    <Accordion type="single" collapsible> {/* Formerly had bg-violet-800 class */}
                        <AccordionItem value="item-2">
                            <AccordionTrigger className="rounded-none p-2"> {/* Formerly had bg-violet-950 class */}
                                Version 1.0 (July 20, 2026)
                            </AccordionTrigger>
                            <AccordionContent className="p-2">
                                <div className="mb-4">
                                    <h4 className={`${h4} mb-2`}>
                                        Summary
                                    </h4>

                                    <p>
                                        Added display themes, along with providing improvements to existing features.
                                    </p>
                                </div>

                                <div className="mb-4">
                                    <h4 className={`${h4} mb-2`}>
                                        New Features
                                    </h4>

                                    <LogSection
                                        title={"Themes"}
                                        listItems={["Display themes have been implemented, which make use of next-themes."]}
                                    />
                                </div>

                                <div className="mb-4">
                                    <h4 className={`${h4} mb-2`}>
                                        Existing Features
                                    </h4>

                                    <LogSection
                                        title={"Home Page"}
                                        listItems={[
                                            "The hero section now has two carousels: one for high-rated games and another for recently-released games."
                                        ]}
                                    />

                                    <LogSection
                                        title="Search Page"
                                        listItems={[
                                            `Each \"filter section\" involves an accordion 
                                            containing checkboxes, along with buttons to select 
                                            all checkboxes or de-select all checkboxes within that 
                                            accordion section.`
                                        ]}
                                    />

                                    <LogSection
                                        title={"Game Information"}
                                        listItems={[
                                            "Game themes are now listed in the Main section",
                                            "Game Localizations are now listed in the Additional Information section.",
                                            "For release dates displayed in the Additional Information section: If a release date does not have a date and the release date status is not cancelled, \"TBA\" will be used in place of a date for that release date.",
                                            "A Ports tab has been added, which displays a game's ports if applicable.",
                                            "Fixed a bug where the information area would spill out of its container area on smaller screen sizes.",
                                            "Adjusted how information was displayed for the Age Ratings and Additional Information sections.",
                                            "Added a loading skeleton.",
                                            "General style improvements."
                                        ]}
                                    />

                                    <LogSection
                                        title="Update Log"
                                        listItems={[
                                            "Changed the year for Version 0.1 from 2025 to 2026."
                                        ]}
                                    />

                                    <LogSection
                                        title="Header"
                                        listItems={[
                                            "Added a mobile menu.",
                                            "Added a link to the update log within the navigation link section.",
                                            "Added a display theme toggle.",
                                            "If a user is on the About, Search, Contact, or Update Log pages, the page's respective link in the header will be of a different color to indicate an active link."
                                        ]}
                                    />

                                    <LogSection
                                        title="Footer"
                                        listItems={[
                                            "Changed the \"Links\" text to \"Navigation\""
                                        ]}
                                    />
                                </div> 

                                <div className="mb-4">
                                    <h4 className={`${h4} mb-2`}>
                                        Misc.
                                    </h4>

                                    <ul className="list-inside list-disc mb-2">
                                        <li>Added breadcrumb navigation to the following pages: About, Search, Guidelines, Privacy Policy, Contact</li>
                                        <li>General style/functionality improvements</li>
                                    </ul>
                                </div> 
                            </AccordionContent>
                        </AccordionItem>

                        <AccordionItem value="item-1">
                            <AccordionTrigger className="rounded-none p-2">
                                Version 0.1 (April 25, 2026)
                            </AccordionTrigger>
                            <AccordionContent className="p-2">
                                <div className="mb-4">
                                    <h4 className={`${h4} mb-2`}>General</h4>

                                    <p>
                                        First deployment of Savefile.
                                    </p>
                                </div>
                            
                                <div>
                                    <h4 className={`${h4} mb-2`}>
                                        Existing Features
                                    </h4>

                                    <LogSection
                                        title="Landing Page"
                                        listItems={["Initial implementation"]}
                                    />

                                    <LogSection
                                        title="Game Information"
                                        listItems={["Initial implementation"]}
                                    />

                                    <LogSection
                                        title="Search Page"
                                        listItems={["Initial implementation"]}
                                    />

                                    <LogSection
                                        title="About Page"
                                        listItems={["Initial implementation"]}
                                    />

                                    <LogSection
                                        title="Contact Page"
                                        listItems={["Initial implementation"]}
                                    />

                                    <LogSection
                                        title="Guidelines Page"
                                        listItems={["Initial implementation"]}
                                    />

                                    <LogSection
                                        title="Privacy Policy"
                                        listItems={["Initial version of Privacy Policy."]}
                                    />
                                </div>
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>
                </div>
            </section>
        </>
    )
}