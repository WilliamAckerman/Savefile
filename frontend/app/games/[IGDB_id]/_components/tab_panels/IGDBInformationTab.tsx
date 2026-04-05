import './_styles/tabContent.css';
import Link from 'next/link';

import formatUnixTimestamp from '@/app/lib/utility_functions/formatUnixTimestamp';

interface IGDBInformationTabProps {
    hypes: number
    IGDB_created_at: number
    IGDB_updated_at: number
    IGDB_url: string
}

export default function IGDBInformationTab(props: IGDBInformationTabProps) {
    const hypes = props.hypes;
    const IGDB_created_at = props.IGDB_created_at;
    const IGDB_updated_at = props.IGDB_updated_at;
    const IGDB_url = props.IGDB_url;

    return (
        <div className="w-full">
            <h1 className="h1">IGDB Information</h1>

            {/*
                hypes &&
                <span className="block">
                    <strong>Hypes:</strong> {hypes}
                </span>
            */}

            {
                IGDB_created_at &&
                <p>
                    <strong>Created At:</strong> {
                        /*new Intl.DateTimeFormat("en-US", {
                            dateStyle: "full",
                            timeZone: "UTC"
                        }).format(IGDB_created_at * 1000)*/
                        formatUnixTimestamp(IGDB_created_at, "full")
                    }
                </p>
            }

            {
                IGDB_updated_at &&
                <p>
                    <strong>Last Updated:</strong> {
                        /*new Intl.DateTimeFormat("en-US", {
                            dateStyle: "full",
                            timeZone: "UTC"
                        }).format(IGDB_updated_at * 1000)*/
                        formatUnixTimestamp(IGDB_updated_at, "full")
                    }
                </p>
            }

            {
                IGDB_url &&
                <Link href={IGDB_url} className="underline hover:no-underline text-blue-200 hover:text-blue-300" target="_blank" rel="noreferrer">
                    IGDB Website Link
                </Link>
            }
        </div>
    )
}