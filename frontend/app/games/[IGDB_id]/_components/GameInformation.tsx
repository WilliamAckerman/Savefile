"use client"
import { useRouter, useSearchParams } from 'next/navigation';
import { Tabs } from '@mantine/core';
import classes from '@/app/games/[IGDB_id]/_styles/GameSideNav.module.css';
import Link from 'next/link'

import TabBackground from '@/app/games/[IGDB_id]/_components/tab_panels/TabBackground';
import MainTab from '@/app/games/[IGDB_id]/_components/tab_panels/MainTab';
import GeneralInformationTab from '@/app/games/[IGDB_id]/_components/tab_panels/GeneralInformationTab';
import RatingsTab from '@/app/games/[IGDB_id]/_components/tab_panels/RatingsTab';
import LanguageSupportsTab from '@/app/games/[IGDB_id]/_components/tab_panels/LanguageSupportsTab';
import InvolvedCompaniesTab from '@/app/games/[IGDB_id]/_components/tab_panels/InvolvedCompaniesTab';
import ScreenshotsTab from '@/app/games/[IGDB_id]/_components/tab_panels/ScreenshotsTab';
import ArtworksTab from '@/app/games/[IGDB_id]/_components/tab_panels/ArtworksTab';
import VideosTab from '@/app/games/[IGDB_id]/_components/tab_panels/VideosTab';
import AgeRatingsTab from '@/app/games/[IGDB_id]/_components/tab_panels/AgeRatingsTab';
import AdditionalInformationTab from '@/app/games/[IGDB_id]/_components/tab_panels/AdditionalInformationTab';
import WebsitesTab from '@/app/games/[IGDB_id]/_components/tab_panels/WebsitesTab';
import KeywordsTab from '@/app/games/[IGDB_id]/_components/tab_panels/KeywordsTab';
import IGDBInformationTab from '@/app/games/[IGDB_id]/_components/tab_panels/IGDBInformationTab';
import AddonTab from './tab_panels/AddonTab';

import type Game from '@/app/lib/types/game';

import '@/app/games/[IGDB_id]/_styles/gameSection.css';

import { useMediaQuery } from '@mantine/hooks';

import { Tabs as TabsPrimitive } from "radix-ui";

interface GameInformationProps {
    data: Game
}

import { useMantineTheme } from '@mantine/core';

export default function GameInformation(props) {
    const router = useRouter();
    const data = props.data

    const similarGameData = props.similarGameData
    //const selectedValue = props.selectedValue ? props.selectedValue : "main";
    //console.log(data)

    const largeScreen = useMediaQuery('(min-width: 991px)');

    const searchParams = useSearchParams();
    const tab = searchParams.get('tab');
    const selectedValue = tab || "main";

    //console.log("Tab:", tab);
    //console.log("Selected:", selectedValue);

    const theme = useMantineTheme();
    //console.log("Theme:");
    //console.log(theme);

    const generalInfoCheck = (
        data.storyline || 
        data.summary ||
        data.game_time_to_beat
    );

    const ratingCheck = (
        data.rating || 
        data.rating_count || 
        data.aggregated_rating || 
        data.aggregated_rating_count || 
        data.total_rating || 
        data.total_rating_count
    );

    const additionalInformationCheck = (
        data.game_modes ||
        data.player_perspectives ||
        data.alternative_titles ||
        data.game_engines ||
        data.release_dates
    )

    const validTabs = ["main"];
    if (generalInfoCheck) validTabs.push("general_information");
    if (ratingCheck) validTabs.push("ratings");
    validTabs.push("language_supports");
    //if (data.involved_companies) validTabs.push("involved_companies");
    validTabs.push("involved_companies");
    if (data.screenshots) validTabs.push("screenshots");
    if (data.artworks) validTabs.push("artworks");
    if (data.videos) validTabs.push("videos");
    validTabs.push("age_ratings");
    if (additionalInformationCheck) validTabs.push("additional_information");
    if (data.websites) validTabs.push("websites");
    if (data.keywords) validTabs.push("keywords");
    validTabs.push("igdb_information");

    if (data.dlcs) validTabs.push("dlcs");
    if (data.expansions) validTabs.push("expansions")
    if (data.standalone_expansions) validTabs.push("standalone_expansions")
    if (data.expanded_games) validTabs.push("expanded_games")
    if (data.remasters) validTabs.push("remasters")
    if (data.remakes) validTabs.push("remakes")
    if (data.parent_game) validTabs.push("parent_game")

    const handleTabChange = (value: string) => {
        router.push(`?tab=${value}`)
    }

    return (
        <div /*className="flex flex-row justify-evenly"*/>
            {/*<nav>
                <Link href={`#main`}>Main</Link>
                <Link href={"#general_info"}>General Information</Link>
            </nav>
            <div 
            className="gameSectionBg"
            style={{
                backgroundImage: data.cover ? `url(https:${data.cover.url.replace("t_thumb", "t_cover_big_2x")})` : "",
                backgroundPosition: 'center'
            }}
            >
                <section id="main">
                    <div className="gameSectionBox">
                    <MainTab 
                        title={data.title}
                        game_type={!data.game_type ? "" : data.game_type.type}
                        cover={data.cover ? data.cover : null}
                        first_release_date={data.first_release_date ? data.first_release_date : "TBA"}
                        genres={data.genres ? data.genres : []}
                        platforms={data.platforms ? data.platforms : []}
                    />
                    </div>
                </section>

                <section id="general_info">
                    <div className="gameSectionBox">
                    <GeneralInformationTab
                        summary={data.summary ? data.summary : ""}
                        storyline={data.storyline ? data.storyline : ""}
                    />
                    </div>
                </section>
            </div>*/}

            <TabsPrimitive.Root
                data-slot="tabs"
                defaultValue={selectedValue}
                data-orientation={largeScreen ? "vertical" : "horizontal"}
                className="group/tabs flex flex-col lg:flex-row"

                onChange={(value) => {
                    //if (validTabs.includes(String(value))) {
                    //console.log("Changed")
                        router.push(`?tab=${value}`)
                    //}
                }}
            >
                <TabsPrimitive.List
                    data-slot="tabs-list"
                    className="bg-violet-500 lg:max-w-[20vw] w-[100%] overflow-x-auto shadCdnTabList"
                >
                    <div className="bg-violet-500 text-white mt-2 mb-2">
                        <Link className="ml-4 mb-2 mt-2" href="/">
                            <button
                                type="button"
                                className="bg-blue-500 hover:bg-blue-600 rounded-sm shadow-sm p-1 cursor-pointer"
                            >
                                Go to Home Page
                            </button>
                        </Link>
                    </div>

                    <div className="bg-violet-500 text-white mt-2 mb-2">
                        <Link className="ml-4 mb-2 mt-2" href="/search">
                            <button
                                type="button"
                                className="bg-blue-500 hover:bg-blue-600 rounded-sm shadow-sm p-1 cursor-pointer"
                            >
                                Go to Search
                            </button>
                        </Link>
                    </div>

                    <TabsPrimitive.Trigger 
                        value="main"
                        className="shadCdnTab"

                        onClick={() => handleTabChange("main")}
                    >
                        Main
                    </TabsPrimitive.Trigger>

                    <TabsPrimitive.Trigger 
                        value="general_information"
                        className="shadCdnTab"

                        onClick={() => handleTabChange("general_information")}
                    >
                        General Information
                    </TabsPrimitive.Trigger>

                    {
                        (
                            data.rating ||
                            data.rating_count ||
                            data.aggregated_rating ||
                            data.aggregating_rating_count ||
                            data.total_rating ||
                            data.total_rating_count
                        ) &&
                        <TabsPrimitive.Trigger 
                            value="ratings"
                            className="shadCdnTab"

                            onClick={() => handleTabChange("ratings")}
                        >
                            Ratings
                        </TabsPrimitive.Trigger>
                    }

                    {
                        data.language_supports &&
                        <TabsPrimitive.Trigger 
                            value="language_supports"
                            className="shadCdnTab"

                            onClick={() => handleTabChange("language_supports")}
                        >
                            Language Supports
                        </TabsPrimitive.Trigger>
                    }

                    {
                        data.involved_companies &&
                        <TabsPrimitive.Trigger 
                            value="involved_companies"
                            className="shadCdnTab"

                            onClick={() => handleTabChange("involved_companies")}
                        >
                            Involved Companies
                        </TabsPrimitive.Trigger>
                    }

                    {
                        data.screenshots &&
                        <TabsPrimitive.Trigger 
                            value="screenshots"
                            className="shadCdnTab"

                            onClick={() => handleTabChange("screenshots")}
                        >
                            Screenshots
                        </TabsPrimitive.Trigger>
                    }

                    {
                        data.artworks &&
                        <TabsPrimitive.Trigger 
                            value="artworks"
                            className="shadCdnTab"

                            onClick={() => handleTabChange("artworks")}
                        >
                            Artworks
                        </TabsPrimitive.Trigger>
                    }

                    {
                        data.videos &&
                        <TabsPrimitive.Trigger 
                            value="videos"
                            className="shadCdnTab"

                            onClick={() => handleTabChange("videos")}
                        >
                            Videos
                        </TabsPrimitive.Trigger>
                    }

                    {
                        data.age_ratings &&
                        <TabsPrimitive.Trigger 
                            value="age_ratings"
                            className="shadCdnTab"

                            onClick={() => handleTabChange("age_ratings")}
                        >
                            Age Ratings
                        </TabsPrimitive.Trigger>
                    }

                    {
                        additionalInformationCheck &&
                        <TabsPrimitive.Trigger 
                            value="additional_information"
                            className="shadCdnTab"

                            onClick={() => handleTabChange("additional_information")}
                        >
                            Additional Information
                        </TabsPrimitive.Trigger>
                    }

                    {
                        data.websites &&
                        <TabsPrimitive.Trigger 
                            value="websites"
                            className="shadCdnTab"

                            onClick={() => handleTabChange("websites")}
                        >
                            Websites
                        </TabsPrimitive.Trigger>
                    }

                    {
                        data.keywords &&
                        <TabsPrimitive.Trigger 
                            value="keywords"
                            className="shadCdnTab"

                            onClick={() => handleTabChange("keywords")}
                        >
                            Keywords
                        </TabsPrimitive.Trigger>
                    }

                    <TabsPrimitive.Trigger 
                        value="igdb_information"
                        className="shadCdnTab"

                        onClick={() => handleTabChange("igdb_information")}
                    >
                        IGDB Information
                    </TabsPrimitive.Trigger>

                    {
                        data.dlcs &&
                        <TabsPrimitive.Trigger
                            value="dlcs"
                            className="shadCdnTab"

                            onClick={() => handleTabChange("dlcs")}
                        >
                            DLCs
                        </TabsPrimitive.Trigger>
                    }

                    {
                        data.expansions &&
                        <TabsPrimitive.Trigger
                            value="expansions"
                            className="shadCdnTab"

                            onClick={() => handleTabChange("expansions")}
                        >
                            Expansions
                        </TabsPrimitive.Trigger>
                    }

                    {
                        data.standalone_expansions &&
                        <TabsPrimitive.Trigger
                            value="standalone_expansions"
                            className="shadCdnTab"

                            onClick={() => handleTabChange("standalone_expansions")}
                        >
                            Standalone Expansions
                        </TabsPrimitive.Trigger>
                    }

                    {
                        data.expanded_games &&
                        <TabsPrimitive.Trigger
                            value="expanded_games"
                            className="shadCdnTab"

                            onClick={() => handleTabChange("expanded_games")}
                        >
                            Expanded Games
                        </TabsPrimitive.Trigger>
                    }

                    {
                        data.remasters &&
                        <TabsPrimitive.Trigger
                            value="remasters"
                            className="shadCdnTab"

                            onClick={() => handleTabChange("remasters")}
                        >
                            Remasters
                        </TabsPrimitive.Trigger>
                    }

                    {
                        data.remakes &&
                        <TabsPrimitive.Trigger
                            value="remakes"
                            className="shadCdnTab"

                            onClick={() => handleTabChange("remakes")}
                        >
                            Remakes
                        </TabsPrimitive.Trigger>
                    }

                    {
                        data.parent_game &&
                        <TabsPrimitive.Trigger
                            value="parent_game"
                            className="shadCdnTab"

                            onClick={() => handleTabChange("parent_game")}
                        >
                            Parent Game
                        </TabsPrimitive.Trigger>
                    }

                    <TabsPrimitive.Trigger
                        value="similar_games"
                        className="shadCdnTab"

                        onClick={() => handleTabChange("similar_games")}
                    >
                        Similar Games
                    </TabsPrimitive.Trigger>
                </TabsPrimitive.List>

                <TabsPrimitive.Content
                    value="main"
                >
                    <TabBackground 
                        cover={data.cover ? data.cover : null} 
                        center={true}
                    >
                        <MainTab 
                            title={data.title}
                            game_type={!data.game_type ? "" : data.game_type.type}
                            game_status={!data.game_status ? "" : data.game_status.status}
                            cover={data.cover ? data.cover : null}
                            first_release_date={data.first_release_date ? data.first_release_date : -1}
                            genres={data.genres ? data.genres : []}
                            platforms={data.platforms ? data.platforms : []}

                            summary={data.summary ? data.summary : ""}
                            storyline={data.storyline ? data.storyline : ""}
                        />
                    </TabBackground>
                </TabsPrimitive.Content>

                <TabsPrimitive.Content value="general_information">
                    <TabBackground cover={data.cover ? data.cover : null}>
                        <GeneralInformationTab
                            summary={data.summary ? data.summary : ""}
                            storyline={data.storyline ? data.storyline : ""}
                            game_time_to_beat={data.game_time_to_beat}
                        />
                    </TabBackground>
                </TabsPrimitive.Content>

                {
                    (
                        data.rating ||
                        data.rating_count ||
                        data.aggregated_rating ||
                        data.aggregated_rating_count ||
                        data.total_rating ||
                        data.total_rating_count
                    ) &&
                    <TabsPrimitive.Content value="ratings">
                        <TabBackground cover={data.cover ? data.cover : null}>
                            <RatingsTab
                                rating={data.rating}
                                rating_count={data.rating_count}
                                aggregated_rating={data.aggregated_rating}
                                aggregated_rating_count={data.aggregated_rating_count}
                                total_rating={data.total_rating}
                                total_rating_count={data.total_rating_count}
                            />
                        </TabBackground>
                    </TabsPrimitive.Content>
                }

                {
                    data.language_supports &&
                    <TabsPrimitive.Content value="language_supports">
                        <TabBackground cover={data.cover ? data.cover : null}>
                            <LanguageSupportsTab
                                language_supports={data.language_supports}
                            />
                        </TabBackground>
                    </TabsPrimitive.Content>
                }

                {
                    data.involved_companies &&
                    <TabsPrimitive.Content value="involved_companies">
                        <TabBackground cover={data.cover ? data.cover : null}>
                            <InvolvedCompaniesTab
                                involved_companies={data.involved_companies}
                            />
                        </TabBackground>
                    </TabsPrimitive.Content>
                }

                {
                    data.screenshots &&
                    <TabsPrimitive.Content value="screenshots">
                        <TabBackground cover={data.cover ? data.cover : null}>
                            <ScreenshotsTab
                                screenshots={data.screenshots}
                            />
                        </TabBackground>
                    </TabsPrimitive.Content>
                }

                {
                    data.artworks &&
                    <TabsPrimitive.Content value="artworks">
                        <TabBackground cover={data.cover ? data.cover : null}>
                            <ArtworksTab
                                artworks={data.artworks}
                            />
                        </TabBackground>
                    </TabsPrimitive.Content>
                }

                {
                    data.videos &&
                    <TabsPrimitive.Content value="videos">
                        <TabBackground cover={data.cover ? data.cover : null}>
                            <VideosTab
                                videos={data.videos}
                            />
                        </TabBackground>
                    </TabsPrimitive.Content>
                }

                {
                    data.age_ratings &&
                    <TabsPrimitive.Content value="age_ratings">
                        <TabBackground cover={data.cover ? data.cover : null}>
                            <AgeRatingsTab
                                age_ratings={data.age_ratings}
                            />
                        </TabBackground>
                    </TabsPrimitive.Content>
                }

                {
                    additionalInformationCheck &&
                    <TabsPrimitive.Content value="additional_information">
                        <TabBackground cover={data.cover ? data.cover : null}>
                            <AdditionalInformationTab
                                game_modes={data.game_modes}
                                multiplayer_modes={data.multiplayer_modes}
                                player_perspectives={data.player_perspectives}
                                alternative_names={data.alternative_titles}
                                game_engines={data.game_engines}
                                release_dates={data.release_dates}

                                hypes={data.hypes}
                                created_at={data.created_at}
                                updated_at={data.updated_at}
                            />
                        </TabBackground>
                    </TabsPrimitive.Content>
                }

                {
                    data.websites &&
                    <TabsPrimitive.Content value="websites">
                        <TabBackground cover={data.cover ? data.cover : null}>
                            <WebsitesTab
                                websites={data.websites}
                            />
                        </TabBackground>
                    </TabsPrimitive.Content>
                }

                {
                    data.keywords &&
                    <TabsPrimitive.Content value="keywords">
                        <TabBackground cover={data.cover ? data.cover : null}>
                            <KeywordsTab
                                keywords={data.keywords}
                            />
                        </TabBackground>
                    </TabsPrimitive.Content>
                }

                <TabsPrimitive.Content value="igdb_information">
                    <TabBackground cover={data.cover ? data.cover : null}>
                        <IGDBInformationTab
                            hypes={data.hypes}
                            IGDB_created_at={data.IGDB_created_at}
                            IGDB_updated_at={data.IGDB_updated_at}
                            IGDB_url={data.IGDB_url}
                        />
                    </TabBackground>
                </TabsPrimitive.Content>

                {
                    data.dlcs &&
                    <TabsPrimitive.Content value="dlcs">
                        <TabBackground cover={data.cover ? data.cover : null}>
                            <AddonTab
                                title="DLCs"
                                addons={data.dlcs}
                            />
                        </TabBackground>
                    </TabsPrimitive.Content>
                }

                {
                    data.expansions &&
                    <TabsPrimitive.Content value="expansions">
                        <TabBackground cover={data.cover ? data.cover : null}>
                            <AddonTab
                                title="Expansions"
                                addons={data.expansions}
                            />
                        </TabBackground>
                    </TabsPrimitive.Content>
                }

                {
                    data.standalone_expansions &&
                    <TabsPrimitive.Content value="standalone_expansions">
                        <TabBackground cover={data.cover ? data.cover : null}>
                            <AddonTab
                                title="Standalone Expansions"
                                addons={data.standalone_expansions}
                            />
                        </TabBackground>
                    </TabsPrimitive.Content>
                }

                {
                    data.expanded_games &&
                    <TabsPrimitive.Content value="expanded_games">
                        <TabBackground cover={data.cover ? data.cover : null}>
                            <AddonTab
                                title="Expanded Games"
                                addons={data.expanded_games}
                            />
                        </TabBackground>
                    </TabsPrimitive.Content>
                }

                {
                    data.remasters &&
                    <TabsPrimitive.Content value="remasters">
                        <TabBackground cover={data.cover ? data.cover : null}>
                            <AddonTab
                                title="Remasters"
                                addons={data.remasters}
                            />
                        </TabBackground>
                    </TabsPrimitive.Content>
                }

                {
                    data.remakes &&
                    <TabsPrimitive.Content value="remakes">
                        <TabBackground cover={data.cover ? data.cover : null}>
                            <AddonTab
                                title="Remakes"
                                addons={data.remakes}
                            />
                        </TabBackground>
                    </TabsPrimitive.Content>
                }

                {
                    data.parent_game &&
                    <TabsPrimitive.Content value="parent_game">
                        <TabBackground cover={data.cover ? data.cover : null}>
                            <AddonTab
                                title="Parent Game"
                                addons={[data.parent_game]}
                            />
                        </TabBackground>
                    </TabsPrimitive.Content>
                }

                {
                    similarGameData && similarGameData.games &&
                    <TabsPrimitive.Content value="similar_games">
                        <TabBackground cover={data.cover ? data.cover : null}>
                            {/*<SimilarGamesTab 
                                similar_games={similarGameData.games}
                            />*/}
                            <AddonTab
                                title={"Similar Games"}
                                addons={similarGameData.games}
                            />
                        </TabBackground>
                    </TabsPrimitive.Content>
                }
            </TabsPrimitive.Root>

             {/*<Tabs 
                defaultValue={selectedValue}
                //orientation="vertical"
                orientation={largeScreen ? "vertical" : "horizontal"}
                keepMounted={false}
                //value={router.query.activeTab as string}
                onChange={(value) => {
                    if (validTabs.includes(String(value))) {
                        router.push(`?tab=${value}`)
                    }
                }}
                classNames={classes}
                styles={{
                    list: {
                        breakpoints: {
                            md: { minHeight: '100vh' }
                        },
                        overflowX: 'auto'
                    }
                }}
            >
                <nav>
                    <Tabs.List>
                        <div style={{color: 'white', borderRadius: '0px', backgroundColor: theme.colors.darkViolet[0]}}>
                            <Link href="/">Return</Link>
                        </div>
                        <Tabs.Tab value="main">Main</Tabs.Tab>
                        <Tabs.Tab value="general_information">General Information</Tabs.Tab>

                        {
                            (
                                data.rating || 
                                data.rating_count || 
                                data.aggregated_rating || 
                                data.aggregated_rating_count || 
                                data.total_rating || 
                                data.total_rating_count
                            ) &&
                            <Tabs.Tab value="ratings">Ratings</Tabs.Tab>
                        }

                        {
                            data.language_supports &&
                            <Tabs.Tab value="language_supports">
                                Language Supports
                            </Tabs.Tab>
                        }

                        {
                            data.involved_companies &&
                            <Tabs.Tab value="involved_companies">Involved Companies</Tabs.Tab>
                        }

                        {
                            data.screenshots &&
                            <Tabs.Tab value="screenshots">Screenshots</Tabs.Tab>
                        }

                        {
                            data.artworks &&
                            <Tabs.Tab value="artworks">Artworks</Tabs.Tab>
                        }

                        {
                            data.videos &&
                            <Tabs.Tab value="videos">Videos</Tabs.Tab>
                        }

                        {
                            data.age_ratings &&
                            <Tabs.Tab value="age_ratings">Age Ratings</Tabs.Tab>
                        }

                        {
                            additionalInformationCheck &&
                            <Tabs.Tab value="additional_information">Additional Information</Tabs.Tab>
                        }

                        {
                            data.websites &&
                            <Tabs.Tab value="websites">Websites</Tabs.Tab>
                        }

                        {
                            data.keywords &&
                            <Tabs.Tab value="keywords">Keywords</Tabs.Tab>
                        }

                        <Tabs.Tab value="igdb_information">IGDB Information</Tabs.Tab>
                    </Tabs.List>
                </nav>

                <Tabs.Panel value="main">
                    <TabBackground 
                        cover={data.cover ? data.cover : null} 
                        center={true}
                    >
                        <MainTab 
                            title={data.title}
                            game_type={!data.game_type ? "" : data.game_type.type}
                            game_status={!data.game_status ? "" : data.game_status.status}
                            cover={data.cover ? data.cover : null}
                            first_release_date={data.first_release_date ? data.first_release_date : -1}
                            genres={data.genres ? data.genres : []}
                            platforms={data.platforms ? data.platforms : []}
                        />
                    </TabBackground>
                </Tabs.Panel>

                <Tabs.Panel value="general_information">
                    <TabBackground cover={data.cover ? data.cover : null}>
                        <GeneralInformationTab
                            summary={data.summary ? data.summary : ""}
                            storyline={data.storyline ? data.storyline : ""}
                            game_time_to_beat={data.game_time_to_beat}
                        />
                    </TabBackground>
                </Tabs.Panel>

                {
                    (
                        data.rating || 
                        data.rating_count || 
                        data.aggregated_rating || 
                        data.aggregated_rating_count || 
                        data.total_rating || 
                        data.total_rating_count
                    ) &&
                    <Tabs.Panel value="ratings">
                        <TabBackground cover={data.cover ? data.cover : null}>
                            <RatingsTab
                                rating={data.rating}
                                rating_count={data.rating_count}
                                aggregated_rating={data.aggregated_rating}
                                aggregated_rating_count={data.aggregated_rating_count}
                                total_rating={data.total_rating}
                                total_rating_count={data.total_rating_count}
                            />
                        </TabBackground>
                    </Tabs.Panel>
                }

                { data.language_supports &&
                    <Tabs.Panel value="language_supports">
                        <TabBackground cover={data.cover ? data.cover : null}>
                            <LanguageSupportsTab
                                language_supports={data.language_supports}
                            />
                        </TabBackground>
                    </Tabs.Panel>
                }
                
                {
                    data.involved_companies &&
                    <Tabs.Panel value="involved_companies">
                        <TabBackground cover={data.cover ? data.cover : null}>
                            <InvolvedCompaniesTab
                                involved_companies={data.involved_companies}
                            />
                        </TabBackground>
                    </Tabs.Panel>
                }

                {
                    data.screenshots &&
                    <Tabs.Panel value="screenshots">
                        <TabBackground cover={data.cover ? data.cover : null}>
                            <ScreenshotsTab
                                screenshots={data.screenshots}
                            />
                        </TabBackground>
                    </Tabs.Panel>
                }

                {
                    data.artworks &&
                    <Tabs.Panel value="artworks">
                        <TabBackground cover={data.cover ? data.cover : null}>
                            <ArtworksTab
                                artworks={data.artworks}
                            />
                        </TabBackground>
                    </Tabs.Panel>
                }

                {
                    data.videos &&
                    <Tabs.Panel value="videos">
                        <TabBackground cover={data.cover ? data.cover : null}>
                            <VideosTab
                                videos={data.videos}
                            />
                        </TabBackground>
                    </Tabs.Panel>
                }

                {
                    data.age_ratings &&
                    <Tabs.Panel value="age_ratings">
                        <TabBackground cover={data.cover ? data.cover : null}>
                            <AgeRatingsTab
                                age_ratings={data.age_ratings}
                            />
                        </TabBackground>
                    </Tabs.Panel>
                }

                {
                    additionalInformationCheck &&
                    <Tabs.Panel value="additional_information">
                        <TabBackground cover={data.cover ? data.cover : null}>
                            <AdditionalInformationTab
                                game_modes={data.game_modes}
                                multiplayer_modes={data.multiplayer_modes}
                                player_perspectives={data.player_perspectives}
                                alternative_names={data.alternative_titles}
                                game_engines={data.game_engines}
                                release_dates={data.release_dates}
                            />
                        </TabBackground>
                    </Tabs.Panel>
                }

                {
                    data.websites &&
                    <Tabs.Panel value="websites">
                        <TabBackground cover={data.cover ? data.cover : null}>
                            <WebsitesTab
                                websites={data.websites}
                            />
                        </TabBackground>
                    </Tabs.Panel>
                }

                {
                    data.keywords &&
                    <Tabs.Panel value="keywords">
                        <TabBackground cover={data.cover ? data.cover : null}>
                            <KeywordsTab
                                keywords={data.keywords}
                            />
                        </TabBackground>
                    </Tabs.Panel>
                }

                <Tabs.Panel value="igdb_information">
                    <TabBackground cover={data.cover ? data.cover : null}>
                        <IGDBInformationTab
                            IGDB_created_at={data.IGDB_created_at}
                            IGDB_updated_at={data.IGDB_updated_at}
                            IGDB_url={data.IGDB_url}
                        />
                    </TabBackground>
                </Tabs.Panel>
            </Tabs>*/}
        </div>
    )
}