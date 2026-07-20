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
        gap-1 
        mx-auto 
        p-0
    `; // Originally had gap-4 and p-4 classes

    if (isSearchGrid) gridStyle += `
        h-[45vh]
        lg:h-[95vh]
        overflow-y-auto

        bg-secondaryBg
        mt-2
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

                                    motion-reduce:transition-none
                                "
                            >
                                <Link
                                    href={`/games/${displayGame.IGDB_id}`} 
                                    title={displayGame.title}
                                >
                                    <div className="relative">
                                    {/*
                                        displayGame.game_type &&
                                        <div className="bg-accentBg rounded-br-sm mx-auto absolute p-1">
                                            <span className="text-accentText center">{displayGame.game_type.type}</span>
                                        </div>
                                    */}

                                    {
                                        displayGame.cover ?
                                        <Image
                                            src={`https:${displayGame.cover.url.replace("t_thumb", "t_cover_big_2x")}`}
                                            width={displayGame.cover.width ? displayGame.cover.width : 200}
                                            height={displayGame.cover.height ? displayGame.cover.height : 200}
                                            alt={`${displayGame.title} game cover`}
                                        />
                                        :
                                        <div className={`bg-secondaryBg text-secondaryText min-h-[112px] md:min-h-[220px] flex items-center justify-center ${isSearchGrid && 'border'}`}>
                                            <strong className="text-center">
                                                No image available
                                            </strong>
                                        </div>
                                    }
                                    </div>

                                    <div className="bg-accentBg p-1">
                                        <strong className="block truncate text-accentText">
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