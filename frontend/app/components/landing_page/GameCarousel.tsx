"use client"
//import { Carousel } from '@mantine/carousel';
import Image from 'next/image'
import Link from 'next/link';
import classes from '@/app/styles/Carousel.module.css'
import { useState } from 'react';

import type Game from '@/app/lib/types/game';

import GameCarouselSkeleton from './skeletons/GameCarouselSkeleton';

import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious
} from '@/app/components/EmblaCarousel';

import formatUnixTimestamp from '@/app/lib/utility_functions/formatUnixTimestamp';

interface GameArray {
    games: Game[]
}

interface GameCarouselProps {
    code: string
    //array: GameArray
    games: Game[]
    title: string
    sectionClass?: string
}

export default function GameCarousel(props: GameCarouselProps) {
    const code = props.code
    //const array = props.array
    const array = props.games

    //const field = props.field

    const unixTimestamp = useState(() => Date.now() / 1000)
    const timestampValue: number = unixTimestamp[0];
    const twoWeeksAgo = timestampValue - 1209600;

    return (
        <section className={`${props.sectionClass ? props.sectionClass : ""} mx-16 p-4`}>
            <h2 className="text-primaryText mb-4 text-xl sm:text-2xl md:text-3xl lg:text-4xl">
                {props.title}
            </h2>

            <Carousel
                opts={{
                    align: 'start',
                    loop: true
                }}
                orientation="horizontal"
                //className="mx-16"
                className="mx-8 w-auto"
            >
                <CarouselContent>
                    {
                        array && array.map((game) => (
                            <CarouselItem
                                key={game.IGDB_id}
                                /*className="
                                    max-w-[100px]
                                    sm:max-w-[200px]
                                    w-auto
                                    md:w-1/2
                                    lg:w-1/4
                                    xl:w-1/6
                                    h-auto
                                "*/
                                className="basis-full sm:basis-1/2 md:basis-1/3 lg:basis-1/4 xl:basis-1/6 w-auto"
                                //title={game.title}
                            >
                                <Link href={`games/${game.IGDB_id}`}>
                                    <div
                                        className="
                                            hover:cursor-pointer
                                            transition
                                            delay-150
                                            ease-in-out
                                            h-full

                                            hover:-translate-y-2

                                            pt-2

                                            motion-reduce:transition-none
                                        "
                                        title={game.title}
                                    >
                                        {
                                            game.first_release_date && game.first_release_date > twoWeeksAgo && game.first_release_date < timestampValue &&
                                            <div className="bg-accentBg rounded-br-sm mx-auto absolute p-1">
                                                <span className="text-accentText center">New!</span>
                                            </div>
                                        }

                                        {
                                            game.cover ?
                                            <Image
                                                src={`https:${game.cover.url.replace("t_thumb", "t_cover_big_2x")}`}
                                                width={game.cover.width ? game.cover.width : 200}
                                                height={game.cover.height ? game.cover.height : 200}
                                                alt={`${game.title} game cover`}

                                                //className="min-h-[112px] md:min-h-[245px] max-h-[112px] md:max-h-[245px]"
                                                //className="sm:max-h-[280px] md:max-h-[331px] xl:max-h-[270px]"
                                                className="h-70"
                                            />
                                            :
                                            <div 
                                                /*className="
                                                    bg-secondaryBg 
                                                    text-primaryText 
                                                    min-h-[112px] 
                                                    sm:h-[280px]
                                                    md:h-[331px] 
                                                    xl:h-[270px]
                                                    flex 
                                                    items-center 
                                                    justify-center
                                                "*/
                                                className="
                                                    bg-secondaryBg
                                                    text-primaryText
                                                    h-70
                                                    flex
                                                    items-center
                                                    justify-center
                                                "
                                            >
                                                <strong className="text-center">No image available</strong>
                                            </div>
                                        }

                                        <div className="bg-accentBg text-accentText p-1">
                                            <strong className="block truncate">{game.title}</strong>

                                            {
                                                code == "total_rating_count" &&
                                                <span className="block">{game.total_rating_count} ratings on IGDB</span>
                                            }

                                            {
                                                code == "total_rating" && game.total_rating &&
                                                <span className="inline-block mt-2 p-1 rounded-sm text-white bg-green-500">
                                                    {Math.floor(game.total_rating)}
                                                </span>
                                            }

                                            {
                                                code == "first_release_date" && game.first_release_date &&
                                                <span className="block">
                                                    First released {formatUnixTimestamp(game.first_release_date, "short")}
                                                </span>
                                            }

                                            {
                                                code == "coming_soon" &&
                                                <span className="block">
                                                    {
                                                        game.first_release_date ?
                                                        <>Releases {formatUnixTimestamp(game.first_release_date, "short")}</>
                                                        :
                                                        <>Release Date TBA</>
                                                    }
                                                </span>
                                            }

                                            {
                                                code == "most_anticipated" && game.hypes &&
                                                <span className="block">
                                                    {game.hypes} Hypes
                                                </span>
                                            }
                                        </div>
                                    </div>
                                </Link>
                            </CarouselItem>
                        ))
                    }
                </CarouselContent>
            
                <CarouselPrevious className="-left-8 bg-button text-white m-1 cursor-pointer" />
            
                <CarouselNext className="-right-8 bg-button text-white m-1 cursor-pointer" />
            
            </Carousel>
        </section>
    )

        {/*<Carousel 
            withIndicators={false}
            withControls 
            slideSize={{
                base: '100%',
                md: '50%',
                lg: '25%'
            }}
            slideGap="md"
            controlSize={26}
            emblaOptions={{
                loop: true,
                align: 'start'
            }}
            classNames={classes}
        >
            {array && array.games.map((game) => (
                <Carousel.Slide 
                    key={game.IGDB_id} 
                    className="
                        max-w-[100px] 
                        sm:max-w-[200px] 
                        w-auto 
                        md:w-1/2 
                        lg:w-1/4 
                        xl:w-1/6
                        h-auto
                    "
                    
                    title={game.title}
                >
                    <Link href={`games/${game.IGDB_id}`}>
                    <div 
                        className="
                            hover:cursor-pointer
                            transition
                            delay-150
                            ease-in-out
                            h-auto
                        "
                    >
                        {
                            game.cover ?
                            <Image
                                src={`https:${game.cover.url.replace("t_thumb", "t_cover_big_2x")}`}
                                width={game.cover.width ? game.cover.width : 200}
                                height={game.cover.height ? game.cover.height : 200}
                                alt={`${game.title} game cover`}
                            />
                            :
                            <div className="bg-black text-white min-h-[112px] md:min-h-[245px] flex items-center justify-center">
                                <strong className="text-center">No image available</strong>
                            </div>
                        }

                        <div className="bg-secondaryBg text-secondaryText p-1">
                            <strong className="block truncate">{game.title}</strong>
        
                            {
                                code == "total_rating_count" &&
                                <span className="block">{game.total_rating_count} ratings on IGDB</span>
                            }

                            {
                                code == "total_rating" && game.total_rating &&
                                <span className="inline-block mt-2 p-1 rounded-sm text-white bg-green-500">
                                    {Math.floor(game.total_rating)}
                                </span>
                            }

                            {
                                code == "first_release_date" && game.first_release_date &&
                                <span className="block">
                                    First released {
                                        new Intl.DateTimeFormat("en-US", {
                                            dateStyle: "short",
                                            timeZone: "UTC"
                                        }).format(game.first_release_date * 1000) // When working with UNIX timestamps, multiply by 1000
                                    }
                                </span>
                            }

                            {
                                code == "coming_soon" ? game.first_release_date ?
                                <span className="block">
                                    Releases {
                                        new Intl.DateTimeFormat("en-US", {
                                            dateStyle: "short",
                                            timeZone: "UTC"
                                        }).format(game.first_release_date * 1000)
                                    }
                                </span>
                                :
                                <span className="block">
                                    Release Date TBA
                                </span>
                                :
                                <></>
                            }

                            {
                                code == "most_anticipated" && game.hypes &&
                                <span className="block">
                                    {game.hypes} Hypes
                                </span>
                            }
                        </div>
                    
                        {/*
                            game.game_type &&
                            <div className="bg-blue-700 text-white p-1">
                                {game.game_type.type}
                            </div>
                        */}

                        {/*
                            game.game_status &&
                            <div className="bg-green-700 text-white p-1">
                                {game.game_status.status}
                            </div>
                        */}
                    {/*</div>
                    </Link>
                </Carousel.Slide>
            ))}
        </Carousel>*/}
}