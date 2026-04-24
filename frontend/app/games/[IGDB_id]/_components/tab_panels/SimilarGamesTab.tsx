import './_styles/tabContent.css';
import Link from 'next/link';
import Image from 'next/image';

import type Addon from '@/app/lib/types/addon';

interface SimilarGamesTabProps {
    similar_games: Addon[]
}

export default function SimilarGamesTab(props: SimilarGamesTabProps) {
    const similarGames = props.similar_games

    return (
        <div className="w-full">
            <h1 className="text-white h1">
                Similar Games
            </h1>

            {
                (similarGames && similarGames.length > 0)
                ?
                <>
                    <div
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
                            similarGames && similarGames.map((game) => {
                                return (
                                    <div
                                        key={game.IGDB_id}
                                        className="
                                            max-w-[200px]
                                            p-4
                                            mx-auto
                                            lg:m-0
                                        "
                                    >
                                        <div className="
                                            transition
                                            delay-150
                                            duration-300
                                            ease-in-out
                                            hover:scale-110
                                            hover:cursor-pointer
                                        ">
                                            <Link href={`${game.IGDB_id}`} title={game.title}>
                                                {
                                                    game.cover ?
                                                    <Image
                                                        src={`https:${game.cover.url.replace("t_thumb", "t_cover_big_2x")}`}
                                                        width={game.cover.width ? game.cover.width : 200}
                                                        height={game.cover.height ? game.cover.height : 200}
                                                        alt={`${game.title} game cover`}
                                                    />
                                                    :
                                                    <div className="bg-black">
                                                        No image available
                                                    </div>
                                                }

                                                <div className="bg-white p-1">
                                                    <strong className="block truncate text-black">{game.title}</strong>
                                                </div>
                                            </Link>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                </>
                :
                <div>
                    <p className="text-white">No similar games found.</p>
                </div>
            }
        </div>
    )
}