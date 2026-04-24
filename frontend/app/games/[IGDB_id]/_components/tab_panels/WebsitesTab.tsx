import './_styles/tabContent.css';
import Link from 'next/link';

import type Website from '@/app/lib/types/_website/website';

interface WebsitesTabProps {
    websites: Website[]
}

export default function WebsitesTab(props: WebsitesTabProps) {
    const websites = props.websites;

    return (
        <div className="w-full">
            <h1 className="h1 mb-2">Websites</h1>

            <ul className="list-disc list-inside">
                {
                    websites.map((website: Website) => {
                        const websiteType = website.type?.type ? website.type.type : "Website";

                        return (
                            <li key={`W${website.IGDB_website_id}`}>
                                <Link className="underline hover:no-underline text-blue-200 hover:text-blue-300" href={website.url} target="_blank" rel="noreferrer">
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