import './_styles/tabContent.css';
import type GameMode from '@/app/lib/types/gameMode';
import type MultiplayerMode from '@/app/lib/types/multiplayerMode';
import type PlayerPerspective from '@/app/lib/types/playerPerspective';
import type AlternativeTitle from '@/app/lib/types/alternativeTitle';
import type GameEngine from '@/app/lib/types/gameEngine';
import type ReleaseDate from '@/app/lib/types/_release_dates/releaseDate';

import formatUnixTimestamp from '@/app/lib/utility_functions/formatUnixTimestamp';

interface AdditionalInformationTabProps {
    game_modes: GameMode[]
    multiplayer_modes: MultiplayerMode[]
    player_perspectives: PlayerPerspective[]
    alternative_names: AlternativeTitle[]
    game_engines: GameEngine[]
    release_dates: ReleaseDate[]

    hypes: number
    created_at: number
    updated_at: number
}

export default function AdditionalInformationTab(props: AdditionalInformationTabProps) {
    const gameModes = props.game_modes;
    const multiplayerModes = props.multiplayer_modes;
    const playerPerspectives = props.player_perspectives;
    const alternativeNames = props.alternative_names;
    const gameEngines = props.game_engines;
    const releaseDates = props.release_dates;

    const hypes = props.hypes;
    const createdAt = props.created_at;
    const updatedAt = props.updated_at;
    
    const h1 = "text-white";
    const h2 = "text-white";
    const h3 = "text-white";
    const container = "mt-4 p-4 m-4 bg-violet-700 rounded-sm";

    return (
        <div>
            <h1 className="h1">Additional Information</h1>

            <div className="flex flex-col lg:flex-row justify-around flex-wrap mx-auto lg:p-4">

                {
                    releaseDates &&
                    <div className={`${container}`}>
                        <h2 className="h2">Release Dates</h2>
                        <ul className="list-inside list-disc">
                            {
                                releaseDates.map((releaseDate) => {
                                    const parentheses: string[] = [];

                                    if (releaseDate.platform.name) {
                                        parentheses.push(releaseDate.platform.name);
                                    }

                                    if (releaseDate.release_date_status) {
                                        parentheses.push(releaseDate.release_date_status.name)
                                    }

                                    if (releaseDate.release_region.region) {
                                        const region = releaseDate.release_region.region;
                                        const regionArray = region.split("_");

                                        for (let i = 0; i < regionArray.length; i++) {
                                            regionArray[i] = regionArray[i].slice(0,1).toUpperCase() + regionArray[i].slice(1);
                                        }

                                        const regionString = regionArray.join(" ");
                                        parentheses.push(regionString);
                                    }

                                    const parenthesesString = releaseDate.date ? ` (${parentheses.join(", ")})` : parentheses.join(", ");

                                    return (
                                        <li key={`RD${releaseDate.IGDB_release_date_id}`}>
                                            {
                                                releaseDate.date &&
                                                new Intl.DateTimeFormat("en-US", {
                                                    dateStyle: "full",
                                                    timeZone: "UTC"
                                                }).format(releaseDate.date * 1000) // When working with UNIX timestamps, multiply by 1000
                                            }
                                            {
                                                parenthesesString
                                            }
                                        </li>
                                    )
                                })
                            }
                        </ul>
                    </div>
                }

                {
                    gameModes &&
                    <div className={`${container}`}>
                        <h2 className="h2">Game Modes</h2>
                        <ul className="list-disc list-inside">
                            {gameModes.map((gameMode) => {
                                return (
                                    <li key={gameMode.IGDB_game_mode_id}>
                                        {gameMode.name}
                                    </li>
                                )
                            })}
                        </ul>
                    </div>
                }

                {
                    multiplayerModes &&
                    <div className={`${container}`}>
                        <h2 className="h2">Multiplayer Modes</h2>
                        {
                            multiplayerModes.map((multiplayerMode) => {
                                return (
                                <div key={`MM${multiplayerMode.IGDB_multiplayer_mode_id}`}>
                                    <h3 className={h3}>{multiplayerMode.platform ? multiplayerMode.platform.name : "No Platform Specified"}</h3>

                                    <ul className="list-disc list-inside">

                                        {
                                            multiplayerMode.campaigncoop &&
                                            <li>Campaign Co-Op Support</li>
                                        }

                                        {
                                            multiplayerMode.dropin &&
                                            <li>Drop In/Out Multiplayer Support</li>
                                        }

                                        {
                                            multiplayerMode.lancoop &&
                                            <li>LAN Co-Op Support</li>
                                        }

                                        {
                                            multiplayerMode.offlinemax &&
                                            <li>Offline Max: {multiplayerMode.offlinemax}</li>
                                        }

                                        {
                                            multiplayerMode.offlinecoop &&
                                            <li>Offline Co-Op Support (Max: {multiplayerMode.offlinecoopmax})</li>
                                        }

                                        {
                                            multiplayerMode.onlinecoop &&
                                            <li>Online Co-Op Support (Max: {multiplayerMode.onlinecoopmax})</li>
                                        }

                                        {
                                            multiplayerMode.splitscreen &&
                                            <li>Split-Screen Offline Multiplayer Support</li>
                                        }

                                        {
                                            multiplayerMode.splitscreenonline &&
                                            <li>Split-Screen Online Multiplayer Support</li>
                                        }

                                    </ul>
                                </div>
                                )
                            })
                        }
                    </div>
                }

                {
                    playerPerspectives &&
                    <div className={`${container}`}>
                        <h2 className="h2">Player Perspectives</h2>
                        <ul className="list-disc list-inside">
                            {playerPerspectives.map((perspective) => {
                                return (
                                    <li key={perspective.IGDB_player_perspective_id}>
                                        {perspective.name}
                                    </li>
                                )
                            })}
                        </ul>
                    </div>
                }

                {
                    alternativeNames &&
                    <div className={`${container}`}>
                        <h2 className="h2">Alternative Titles</h2>
                        <ul className="list-disc list-inside">
                            {
                                alternativeNames.map((alternativeName) => {
                                    return (
                                        <li key={`AN${alternativeName.IGDB_alternative_name_id}`}>
                                            {alternativeName.title} ({alternativeName.comment})
                                        </li>
                                    )
                                })
                            }
                        </ul>
                    </div>
                }

                {
                    gameEngines &&
                    <div className={`${container}`}>
                        <h2 className="h2">Game Engines</h2>
                        <ul className="list-disc list-inside">
                            {
                                gameEngines.map((gameEngine) => {
                                    return (
                                        <li key={`GE${gameEngine.IGDB_game_engine_id}`}>
                                            {gameEngine.name}
                                        </li>
                                    )
                                })
                            }
                        </ul>
                    </div>
                }

                {
                    (createdAt || updatedAt || hypes) &&
                    <div className={`${container}`}>
                        <h2 className="h2">Misc. Information</h2>

                        {
                            hypes &&
                            <span className="block">
                                <strong>Hypes:</strong> {hypes}
                            </span>
                        }

                        {
                            createdAt &&
                            <span className="block">
                                <strong>Created At:</strong> {formatUnixTimestamp(createdAt, "full")}
                            </span>
                        }

                        {
                            updatedAt &&
                            <span className="block">
                                <strong>Updated At:</strong> {formatUnixTimestamp(updatedAt, "full")}
                            </span>
                        }
                    </div>
                }

            </div>
        </div>
    )
}