"use client"
import { Carousel } from '@mantine/carousel';
import Image from 'next/image'
import Link from 'next/link';
import classes from '@/app/styles/Carousel.module.css'

export default function GameCarousel(props) {
    const code = props.code
    const array = props.array
    const field = props.field

    return (
        <Carousel 
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
                                width={game.cover.width}
                                height={game.cover.height}
                                alt={`${game.title} game cover`}
                            />
                            :
                            <div className="bg-black">
                                No image available
                            </div>
                        }

                        <div className="bg-white p-1">
                            <strong className="block truncate">{game.title}</strong>
        
                            {
                                code == "total_rating_count" &&
                                <span className="block">{game.total_rating_count} ratings on IGDB</span>
                            }

                            {
                                code == "total_rating" &&
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
                    </div>
                    </Link>
                </Carousel.Slide>
            ))}
        </Carousel>
    )
}