//import '@/app/styles/GameGrid.css';
import Link from 'next/link';
import Image from 'next/image';

import type Addon from "../lib/types/addon";

interface GameGridProps {
    isSearchGrid: boolean
    games: Addon[]
}

export default function GameGrid(props: GameGridProps) {
    const isSearchGrid = props.isSearchGrid;
    const displayGames = props.games;

    let gridStyle = `
        grid 
        grid-cols-2 
        lg:grid-cols-4 
        gap-4 
        mx-auto 
        p-4
    `;

    if (isSearchGrid) gridStyle += `
        h-[45vh]
        lg:h-[95vh]
        overflow-y-auto
    `;

    return (
        <div
            className={`${gridStyle}`}
        >
            {
                displayGames && displayGames.map((displayGame: Addon) => {
                    return (
                        <div
                            key={displayGame.IGDB_id}
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
                                <Link
                                    href={`/games/${displayGame.IGDB_id}`} 
                                    title={displayGame.title}
                                >
                                    {
                                        displayGame.cover ?
                                        <Image
                                            src={`https:${displayGame.cover.url.replace("t_thumb", "t_cover_big_2x")}`}
                                            width={displayGame.cover.width ? displayGame.cover.width : 200}
                                            height={displayGame.cover.height ? displayGame.cover.height : 200}
                                            alt={`${displayGame.title} game cover`}
                                        />
                                        :
                                        <div className="bg-black">
                                            <span className="text-white">
                                                No image available
                                            </span>
                                        </div>
                                    }

                                    <div className="bg-white p-1">
                                        <strong className="block truncate text-black">
                                            {displayGame.title}
                                        </strong>
                                    </div>
                                </Link>
                            </div>
                        </div>
                    )
                })
            }
        </div>
    )
}