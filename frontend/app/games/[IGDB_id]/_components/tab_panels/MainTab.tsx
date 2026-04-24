import { useState } from 'react';
import Image from 'next/image';
import '@/app/games/[IGDB_id]/_styles/gameSection.css';

import type Cover from '@/app/lib/types/cover';
import type Genre from '@/app/lib/types/genre';
import type Platform from '@/app/lib/types/platform';

function mapArray(array: Genre[] | Platform[], sort: boolean = false) {
    let returnArray = []
    for (let i = 0; i < array.length; i++) {
        returnArray.push(array[i].name)
    }
    if (sort) {
        returnArray = returnArray.sort()
    }
    return returnArray.join(", ")
}

interface MainTabProps {
    title: string
    game_type: string
    game_status: string
    cover: Cover | null
    first_release_date: number
    genres: Genre[]
    platforms: Platform[]
}

export default function MainTab(props: MainTabProps) {
    const title: string = props.title
    const game_type: string = props.game_type
    const game_status: string = props.game_status;
    const cover = props.cover
    const firstReleaseDate: number = props.first_release_date
    const genres = props.genres
    const platforms = props.platforms

    //const summary: string = props.summary;
    //const storyline: string = props.storyline;

    const unixTimestamp = useState(() => Date.now() / 1000)
    const timestampValue: number = unixTimestamp[0];

    //console.log(firstReleaseDate)
    //console.log(unixTimestamp[0])

    const h2 = "text-white text-xl lg:text-2xl xl:text-3xl mb-2 font-semibold";

    return (
        <div className="flex flex-col md:flex-row">
            {
                cover &&
                <div className="mr-4">
                    {
                    (cover && cover.url) ?
                    <Image
                        src={(cover && cover.url) ? `https:${cover.url.replace("t_thumb", "t_cover_big_2x")}` : ""}
                        alt={`Cover image of ${title}`}
                        width={cover.width ? cover.width : 200}
                        height={cover.height ? cover.height : 200}
                        className="max-w-[200px] mx-auto md:max-w-[300px]"
                    />
                    :
                    <div className="bg-black">
                        <p>No image available</p>
                    </div>
                    }
                </div>
            }

            <div>
                <h1 className="text-white text-2xl lg:text-3xl xl:text-4xl mb-2">
                    {title}
                </h1>

                {
                    (game_type != "" || game_status != "") &&
                    <div className="flex flex-row wrap mb-2">

                        {
                            game_type != "" &&
                            <div className="bg-blue-500 rounded-sm p-1">
                                <h2 className="text-white text-lg lg:text-xl">
                                    {game_type}
                                </h2>
                            </div>
                        }
                        
                        {
                            game_status != "" &&
                            <div className="bg-green-500 rounded-sm p-1">
                                <h2 className="text-white text-lg lg:text-xl">
                                    {game_status}
                                </h2>
                            </div>
                        }
                    </div>
                }

                {
                    <span className="block">
                        {
                            firstReleaseDate == -1 ?
                            <><strong>Release Date:</strong> TBA</>
                            :
                            <>
                                <strong>{firstReleaseDate < timestampValue ? "First Released:" : "Release Date:"}</strong> {
                                    new Intl.DateTimeFormat("en-US", {
                                        dateStyle: "full",
                                        timeZone: "UTC"
                                    }).format(firstReleaseDate * 1000) // When working with UNIX timestamps, multiply by 1000
                                }
                            </>
                        }
                    </span>
                }

                {
                    genres && genres.length > 0 &&
                    <span className="block">
                        <strong>Genres:</strong> {mapArray(genres)}
                    </span>
                }

                {
                    platforms && platforms.length > 0 &&
                    <span className="block">
                        <strong>Platforms:</strong> {mapArray(platforms, true)}
                    </span>
                }

                {/*
                    summary != "" &&
                    <div className={`${storyline != "" ? "mb-4" : ""} mt-2`}>
                        <h2 className={`${h2}`}>Summary</h2>
                        <p>{summary}</p>
                    </div>
                */}

                {/*
                    storyline != "" &&
                    <div>
                        <h2 className={`${h2}`}>Storyline</h2>
                        <p>{storyline}</p>
                    </div>
                */}
            </div>
        </div>
    )
}