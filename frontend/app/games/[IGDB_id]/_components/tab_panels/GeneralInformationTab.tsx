import './_styles/tabContent.css';

import type GameTimeToBeat from '@/app/lib/types/gameTimeToBeat';

import TimeToBeatSection from '@/app/games/[IGDB_id]/_components/_general_info/TimeToBeatSection';

interface GeneralInformationTabProps {
    summary: string
    storyline: string
    game_time_to_beat?: GameTimeToBeat
}

export default function GeneralInformationTab(props: GeneralInformationTabProps) {
    const summary: string = props.summary;
    const storyline: string = props.storyline;
    const gameTimeToBeat = props.game_time_to_beat;

    const h2 = "text-white mb-2";

    return (
        <div>
            <h1 className="h1 mb-4">General Information</h1>
            
            {
                summary != "" &&
                <div className={`${storyline != "" ? "mb-4" : ""}`}>
                    <h2 className={`h2 ${h2}`}>
                        Summary
                    </h2>
                    <p>{summary}</p>
                </div>
            }

            {
                storyline != "" &&
                <>
                    <h2 className={`h2 ${h2}`}>
                        Storyline
                    </h2>
                    <p>{storyline}</p>
                </>
            }

            {
                (gameTimeToBeat && (gameTimeToBeat.normally || gameTimeToBeat.completely || gameTimeToBeat.hastily)) &&
                <div className="mt-2">
                    <h2 className={`h2 ${h2}`}>
                        Time to Beat
                    </h2>

                    <div className="flex flex-col md:flex-row items-center justify-evenly">
                        {
                            gameTimeToBeat.normally &&
                            <TimeToBeatSection
                                title={"Normally"}
                                timeToBeat={gameTimeToBeat.normally}
                            />
                        }

                        {
                            gameTimeToBeat.completely &&
                            <TimeToBeatSection
                                title={"Completely"}
                                timeToBeat={gameTimeToBeat.completely}
                            />
                        }

                        {
                            gameTimeToBeat.hastily &&
                            <TimeToBeatSection
                                title={"Hastily"}
                                timeToBeat={gameTimeToBeat.hastily}
                            />
                        }
                    </div>

                    {
                        gameTimeToBeat.count &&
                        <div className="mt-2">
                            <p className="text-white text-center text-lg lg:text-xl mb-2">Based on {gameTimeToBeat.count} submission{gameTimeToBeat.count == 1 ? "" : "s"}.</p>
                        </div>
                    }
                </div>
            }
        </div>
    )
}