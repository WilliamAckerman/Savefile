import './_styles/tabContent.css';
import Link from 'next/link';

import type Website from '@/app/lib/types/_website/website';
import SectionHeader from '../_general/SectionHeader';

interface WebsitesTabProps {
    websites: Website[]
}

export default function WebsitesTab(props: WebsitesTabProps) {
    const websites = props.websites;

    return (
        <div className="w-full max-h-[80vh]">
            <SectionHeader
                title="Websites"
            />

            <ul className="list-disc list-inside">
                {
                    websites.map((website: Website) => {
                        const websiteType = website.type?.type ? website.type.type : "Website";

                        return (
                            <li key={`W${website.IGDB_website_id}`}>
                                <Link 
                                    //className="underline hover:no-underline text-blue-200 hover:text-blue-300" 
                                    className="underline hover:no-underline text-primaryLink"
                                    href={website.url} target="_blank" rel="noreferrer"
                                >
                                    {String(websiteType)}
                                </Link> { website.trusted && <span>(Trusted)</span> }
                            </li>
                        )
                    })
                }
            </ul>
        </div>
    )
}