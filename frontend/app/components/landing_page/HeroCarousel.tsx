"use client"
import Image from 'next/image'
import Link from 'next/link'

import { useMemo } from 'react'

import type Game from '@/app/lib/types/game';

import {
    Carousel,
    CarouselContent,
    CarouselItem
} from '@/app/components/EmblaCarousel';
import AutoScroll from 'embla-carousel-auto-scroll'

interface GameArray {
    games: Game[]
}

interface HeroCarouselProps {
    array: Game[]
    direction?: "backward" | "forward" | undefined
}

export default function HeroCarousel(props: HeroCarouselProps) {
    const array = props.array;
    const direction = props.direction == "backward" ? "backward" : "forward";

    // Help from https://thefrontkit.com/blogs/shadcn-ui-accessibility-audit-2026
    const plugins = useMemo(() => {
        if (typeof window === "undefined") return []
        const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches
        return reduceMotion ? [] : [AutoScroll({
            playOnInit: true,
            direction: direction,
            stopOnInteraction: false,
            stopOnMouseEnter: true,
            speed: 1
        })]
    }, [])

    return (
        <div 
            /*className="flex flex-col"*/
            className="mt-2 mb-2"
        >
            <Carousel
                opts={{
                    align: 'start',
                    loop: true
                }}
                orientation="horizontal"

                /*plugins={[
                    AutoScroll({
                        playOnInit: true,
                        direction: direction,
                        stopOnInteraction: false,
                        stopOnMouseEnter: true,
                        speed: 1
                    })
                ]}*/
                plugins={plugins}
            >
                <CarouselContent>
                    {
                        array && array.map((game) => (
                            <CarouselItem
                                key={game.IGDB_id}

                                className="max-w-[25vw] sm:max-w-[100%] basis-1/3 sm:basis-1/4 md:basis-1/4 lg:basis-1/6 xl:basis-1/8"
                            >
                                <Link href={`games/${game.IGDB_id}`}>
                                    {
                                        game.cover &&
                                        <Image
                                            src={`https:${game.cover?.url.replace("t_thumb", "t_cover_big_2x")}`}
                                            width={game.cover.width ? game.cover.width : 200}
                                            height={game.cover.height ? game.cover.height: 200}
                                            alt={`${game.title} game cover`}

                                            title={`${game.title}`}

                                            //className="h-[30vh] max-w-[300px]"
                                        />
                                    }
                                </Link>
                            </CarouselItem>
                        ))
                    }
                </CarouselContent>
            </Carousel>
        </div>
    )
}