import type { Metadata } from 'next';
import Link from 'next/link';

import '@/app/styles/General.css';

import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger
} from '@/app/components/Accordion';

export const metadata: Metadata = {
    title: 'Privacy Policy'
}

export default function Page() {
    const accordionTrigger = "bg-violet-950 rounded-none p-2";
    const link = "underline hover:no-underline text-blue-200 hover:text-blue-300 break-word";

    return (
        <>
            {/*<main>*/}
                <h1 className="main-header">Privacy Policy</h1>

                <div className="text-box bg-violet-800 mb-8">
                    <h2 className="secondary-header mb-4">Savefile Privacy Policy</h2>
                    <p className="mb-2">Effective Date: April 25, 2026</p>
                    <hr className="mb-2" />

                    <Accordion type="single" collapsible className="bg-violet-800">

                        {/* 1. Overview */}
                        <AccordionItem value="item-1">
                            <AccordionTrigger className={`${accordionTrigger}`}>
                                1. Overview
                            </AccordionTrigger>
                            <AccordionContent className="p-2">
                                <p className="mt-2 mb-2">
                                    This Privacy Policy covers how I (William Ackerman) use this website (Savefile) to collect and handle
                                    personal data from website visitors. This includes what data is collected from visitors and how the data is collected, stored, and used.
                                </p>

                                <span className="block">
                                    This Privacy Policy also covers:
                                </span>
                                <ul className="list-disc list-inside">
                                    <li>This website&apos;s use of the IGDB API</li>
                                    <li>This website&apos;s use of cookies</li>
                                    <li>Information regarding children under the age of 13</li>
                                    <li>Updates to this Privacy Policy</li>
                                    <li>How to contact me</li>
                                </ul>
                            </AccordionContent>
                        </AccordionItem>

                        {/* 2. What Data is Collected */}
                        <AccordionItem value="item-2">
                            <AccordionTrigger className={`${accordionTrigger}`}>
                                2. What Data is Collected
                            </AccordionTrigger>
                            <AccordionContent className="p-2">
                                <p className="mt-2 mb-2">
                                    Personal data collected from you includes the following:
                                </p>
                                
                                <span className="block">
                                    Name:
                                </span>
                                <ul className="list-disc list-inside mb-2">
                                    <li>Collected when you make a submission using the contact form (You provide your name)</li>
                                </ul>

                                <span className="block">
                                    Email address:
                                </span>
                                <ul className="list-disc list-inside mb-2">
                                    <li>Collected when you make a submission using the contact form (You provide your email address)</li>
                                </ul>

                                <span className="block">
                                    In addition, this website is hosted using Vercel. Vercel collects the following personal data from 
                                    you when you use this website:
                                </span>
                                <ul className="list-disc list-inside mb-2">
                                    <li>IP address, along with location information derived from it</li>
                                    <li>Information regarding system configuration</li>
                                </ul>

                                <p>
                                    For information on how Vercel handles personal data of website visitors, please visit their 
                                    Privacy Policy: <Link className={`${link}`} href="https://vercel.com/legal/privacy-policy" target="_blank" rel="noreferrer">
                                    https://vercel.com/legal/privacy-policy
                                    </Link>
                                </p>
                            </AccordionContent>
                        </AccordionItem>

                        {/* 3. How Your Data is Collected */}
                        <AccordionItem value="item-3">
                            <AccordionTrigger className={`${accordionTrigger}`}>
                                3. How Your Data is Collected
                            </AccordionTrigger>
                            <AccordionContent className="p-2">
                                <p className="mt-2 mb-2">
                                    Your personal data is collected using the following methods:
                                </p>

                                <span className="block">
                                    Contact form:
                                </span>
                                <ul className="list-disc list-inside">
                                    <li>You provide your name and email address when you make a submission using the contact form.</li>
                                    <li>You provide your name by typing it into the input field labeled &quot;Name&quot;, then making a submission.</li>
                                    <li>You provide your email address by typing it into the input field labeled &quot;Email&quot;, then making a submission.</li>
                                </ul>
                            </AccordionContent>
                        </AccordionItem>

                        {/* 4. How Your Data is Stored */}
                        <AccordionItem value="item-4">
                            <AccordionTrigger className={`${accordionTrigger}`}>
                                4. How Your Data is Stored
                            </AccordionTrigger>
                            <AccordionContent className="p-2">
                                <p className="mt-2 mb-2">
                                    Currently, there is no underlying database dedicated to storing personal data of website visitors.
                                </p>

                                <p>
                                    When you make a submission using the contact form, your name and email address are used to construct an email message, which is 
                                    sent to and stored in my Gmail inbox at the following email address: williamjohnackerman@gmail.com.
                                </p>
                            </AccordionContent>
                        </AccordionItem>

                        {/* 5. How Your Data is Used */}
                        <AccordionItem value="item-5">
                            <AccordionTrigger className={`${accordionTrigger}`}>
                                5. How Your Data is Used
                            </AccordionTrigger>
                            <AccordionContent className="p-2">
                                <p className="mt-2 mb-2">
                                    Your personal data is used in the following ways:
                                </p>

                                <span className="block">
                                    Contact form:
                                </span>
                                <ul className="list-disc list-inside">
                                    <li>
                                        By providing your name and email address and making a submission using the contact form, 
                                        the name and email address you provide are used in sending an email message. The message is constructed and sent using Nodemailer. 
                                        The message is sent to my Gmail inbox where I may view it at any time.
                                    </li>
                                    <li>
                                        Your name is included in the &quot;from&quot; field of the email message in order to indicate who the message is from.
                                    </li>
                                    <li>
                                        Your email address is included in the &quot;reply-to&quot; field of the email message. This is so that 
                                        I can reply to your email message, establishing a means of communication between you and me.
                                    </li>
                                    <li>
                                        I do not disclose or share any of the personal information you submit to me via the contact form.
                                    </li>
                                </ul>
                            </AccordionContent>
                        </AccordionItem>

                        <AccordionItem value="item-6">
                            <AccordionTrigger className={`${accordionTrigger}`}>
                                6. IGDB API Use
                            </AccordionTrigger>
                            <AccordionContent className="p-2">
                                <p className="mt-2 mb-2">
                                    Data on video games is extracted from the IGDB API and stored in a MongoDB database.
                                </p>
                                <p className="mb-2">
                                    For more information on the IGDB API, please visit <Link href="https://www.igdb.com/api" className={`${link}`} target="_blank" rel="noreferrer">
                                    https://www.igdb.com/api
                                    </Link>.
                                </p>
                                <p className="mb-2">
                                    I do not own the rights to any of the video games stored in Savefile&apos;s database or shown on this website.
                                </p>
                                <p>
                                    If you would like to support IGDB, please visit <Link href="https://www.igdb.com/" className={`${link}`} target="_blank" rel="noreferrer">
                                    https://www.igdb.com/
                                    </Link>.
                                </p>
                            </AccordionContent>
                        </AccordionItem>

                        {/* 7. Cookies */}
                        <AccordionItem value="item-7">
                            <AccordionTrigger className={`${accordionTrigger}`}>
                                7. Cookies
                            </AccordionTrigger>
                            <AccordionContent className="p-2">
                                <p className="mt-2">
                                    Currently, this website does not store or use any form of cookies.
                                </p>
                            </AccordionContent>
                        </AccordionItem>

                        {/* 8. Children Under 13 */}
                        <AccordionItem value="item-8">
                            <AccordionTrigger className={`${accordionTrigger}`}>
                                8. Children Under 13
                            </AccordionTrigger>
                            <AccordionContent className="p-2">
                                <p className="mt-2 mb-2">
                                    This website is not intended for use by children under the age of 13. If you believe a child under the age of 13 
                                    has used this website, please email me at <Link href="mailto:williamjohnackerman@gmail.com" className={`${link}`} target="_blank" rel="noreferrer">
                                    williamjohnackerman@gmail.com
                                    </Link> explaining the situation and I will get back to you within 3 business days.
                                </p>

                                <p>
                                    If you believe a child has used this website to send a message to me via the contact form, please email me explaining the situation and I will 
                                    delete the message from my inbox.
                                </p>
                            </AccordionContent>
                        </AccordionItem>

                        {/* 9. Updates to this Privacy Policy */}
                        <AccordionItem value="item-9">
                            <AccordionTrigger className={`${accordionTrigger}`}>
                                9. Updates to this Privacy Policy
                            </AccordionTrigger>
                            <AccordionContent className="p-2">
                                <p className="mt-2">
                                    This Privacy Policy is subject to future updates.
                                </p>
                            </AccordionContent>
                        </AccordionItem>

                        {/* 10. Contact */}
                        <AccordionItem value="item-10">
                            <AccordionTrigger className={`${accordionTrigger}`}>
                                10. Contact
                            </AccordionTrigger>
                            <AccordionContent className="p-2">
                                <p className="mt-2 mb-2">
                                    If you would like to contact me, you can email me at <Link href="mailto:williamjohnackerman@gmail.com" className={`${link}`} target="_blank" rel="noreferrer">
                                    williamjohnackerman@gmail.com
                                    </Link> and I will respond to your message within 3 business days.
                                </p>

                                <p>
                                    If you believe someone sent a message including your personal information using this website&apos;s contact form, please email me explaining the situation and I 
                                    will delete the message from my inbox.
                                </p>
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>
                </div>
            {/*</main>*/}
        </>
    )
}