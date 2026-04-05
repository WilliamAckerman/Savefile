import getGameAddOns from "../_api/getGameAddOns";
import Link from 'next/link';
import Image from 'next/image';

async function GameAddOns(
    props
    { params }: { params: Promise<{ IGDB_id: string }> }
) {
    //const IGDB_id = props.IGDB_id;
    const type = props.type;
    const title = props.title;

    const slug: { IGDB_id: string } = await params;
    const IGDB_id: number = Number(slug.IGDB_id);

    const data = await getGameAddOns(IGDB_id, type);
    const gameData = await data.json();
    const games = gameData?.games ? gameData.games : [];

    return (
        <div>
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
                        {title}
                    </h2>
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
                            games && games.map((game) => {
                                <div
                                    key={game.IGDB_id}
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
                                        <Link href={`games/${game.IGDB_id}`} title={game.title}>
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
                                            </div>
                                        </Link>
                                    </div>
                                </div>
                            })
                        }
                    </div>
                    </>
                    :
                    <div>
                        <p className="text-white">No add-ons for this game.</p>
                    </div>
                }
            </div>
        </div>
    )
}

export default GameAddOns;