import './_styles/tabContent.css';
//import Link from 'next/link';
//import Image from 'next/image';

import type Addon from '@/app/lib/types/addon';
import GameGrid from '@/app/components/GameGrid';

interface AddonTabProps {
    title: string
    addons: Addon[]
}

export default function AddonTab(props: AddonTabProps) {
    const title = props.title;
    const addons = props.addons;
    const addon_type = title.toLowerCase();

    return (
        <div className="w-full">
            <h1 className="text-white h1">
                {title}
            </h1>
            {
                (addons && addons.length > 0)
                ?
                <>
                    {/*<div
                        className="
                            grid
                            grid-cols-2
                            lg:grid-cols-4
                            gap-4
                            mx-auto
                            p-4
                        "
                    >
                        {
                            addons && addons.map((addon: Addon) => {
                                return (
                                <div
                                    key={addon.IGDB_id}
                                    className="
                                        max-w-[200px]
                                        p-4
                                        mx-auto
                                        lg:m-0
                                    "
                                >
                                    <div
                                        className="
                                            transition
                                            delay-150
                                            duration-300
                                            ease-in-out
                                            hover:scale-110
                                            hover:cursor-pointer
                                        "
                                    >
                                        <Link href={`${addon.IGDB_id}`} title={addon.title}>
                                            {
                                                addon.cover ?
                                                <Image
                                                    src={`https:${addon.cover.url.replace("t_thumb", "t_cover_big_2x")}`}
                                                    width={addon.cover.width}
                                                    height={addon.cover.height}
                                                    alt={`${addon.title} game cover`}
                                                />
                                                :
                                                <div className="bg-black">
                                                    No image available
                                                </div>
                                            }

                                            <div className="bg-white p-1">
                                                <strong className="block truncate text-black">{addon.title}</strong>
                                            </div>
                                        </Link>
                                    </div>
                                </div>
                                )
                            })
                        }
                    </div>*/}
                    <GameGrid
                        isSearchGrid={false}
                        games={addons}
                    />
                </>
                :
                <div>
                    <p className="text-white">No {addon_type} for this game.</p>
                </div>
            }
        </div>
    )
}