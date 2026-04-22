//import getSearchResults from "../_lib/getSearchResults";
import Image from 'next/image';
import Link from 'next/link';

import Pagination from "./Pagination";
import GameGrid from '@/app/components/GameGrid';

import type Addon from '@/app/lib/types/addon';

async function SearchResults(props) {
    /*const searchParams = props.searchParams;

    const search = props.search;

    const xbsx = props.xbsx;
    const xbo = props.xbo;
    const ps5 = props.ps5;
    const ps4 = props.ps4;
    const ns2 = props.ns2;
    const ns = props.ns;
    const windows = props.windows;
    const mac = props.mac;
    const linux = props.linux;

    const standard = props.standard;
    const remake = props.remake;
    const remaster = props.remaster;
    const expanded_game = props.expanded_game;
    const port = props.port;
    const expansion = props.expansion;
    const standalone_expansion = props.standalone_expansion;
    const dlc = props.dlc;*/

    /*const data = await getSearchResults(
        search, 

        xbsx,
        xbo,
        ps5,
        ps4,
        ns2,
        ns,
        windows,
        mac,
        linux,

        standard,
        remake,
        remaster,
        expanded_game,
        port,
        expansion,
        standalone_expansion,
        dlc
    );*/
    //const data = await getSearchResults(searchParams);
    //console.log(data)
    //const gameData = await data.json()

    const gameData = props.games;

    //console.log(gameData)
    const games: Addon[] = gameData.games ? gameData.games : [];
    const gameCount = gameData.gameCount;
    const pageCount = gameData.pageCount;

    const currentPage = props.currentPage;

    return (
        <section 
            className="
                bg-slate-900 
                w-full
                p-4
            "
        >
            <div>
                {
                    (games && games.length > 0)
                    ?
                    <>
                    <h2 
                        className="
                            text-white
                            mb-4
                            text-xl
                            md:text-2xl
                            lg:text-3xl
                        "
                    >
                        Search Results
                    </h2>
                    <p className="text-white md:text-lg lg:text-xl">
                        Showing {games.length} out of {gameCount} results.
                    </p>
                    {/*<div 
                        className="
                            grid 
                            grid-cols-2 
                            lg:grid-cols-4 
                            gap-4
                            h-[45vh]
                            lg:h-[90vh]
                            overflow-y-auto
                            mx-auto
                            p-4
                        "
                    >
                    { games && games.map((game) => (
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
                                <Link href={`games/${game.IGDB_id}`} title={game.title}>
                                    {
                                        game.cover ?
                                        <Image
                                            src={`https:${game.cover.url.replace("t_thumb", "t_cover_big_2x")}`}
                                            width={game.cover?.width ? game.cover.width : 200}
                                            height={game.cover?.height ? game.cover.height : 200}
                                            alt={`${game.title} game cover`}
                                        />
                                        :
                                        <div className="bg-black">
                                            No image available
                                        </div>
                                    }

                                    <div className="bg-white p-1">
                                        <strong className="block truncate">{game.title}</strong>
                                    </div>
                                </Link>
                            </div>
                        </div>
                    ))}
                    </div>*/}

                    <GameGrid
                        isSearchGrid={true}
                        games={games}
                    />
                
                    <div className="mx-auto flex items-center">
                        <Pagination
                            pageCount={pageCount}
                            currentPage={currentPage}
                        />
                    </div>

                    </>
                    :
                    <div>
                        <p className="mb-2 text-white text-center text-xl md:text-2xl lg:text-3xl">
                            No games were found.
                        </p>
                        <p className="text-white text-center text-lg md:text-xl lg:text-2xl">
                            Try searching for something else!
                        </p>
                    </div>
                }
            </div>
        </section>
    )
}

export default SearchResults;