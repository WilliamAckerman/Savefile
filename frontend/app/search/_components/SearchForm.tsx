"use client"
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Form from 'next/form';
import getSearchResults from '../_lib/getSearchResults';

import SearchCheckbox from './SearchCheckbox';

import { Search } from 'lucide-react';

import '@/app/styles/Form.css';

import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger
} from '@/app/components/Accordion';

import CheckboxButton from './CheckboxButton';

export default function SearchForm() {
    const searchParams = useSearchParams();
    //const [searchText, setSearchText] = useState(searchParams.get('search') || "");
    const [searchText, setSearchText] = useState(searchParams.get('search') ? searchParams.get('search')?.toString() : "");
    const [limit, setLimit] = useState(Number(searchParams.get('limit') || 12));
    const [currentPage, setCurrentPage] = useState(Number(searchParams.get('page') || 1));
    const [pageCount, setPageCount] = useState(2);

    function handleCheckboxes(check: boolean = false, setters: React.Dispatch<React.SetStateAction<boolean>>[]) {
        /*setXbsx(check)
        setXbo(check)
        setPs5(check)
        setPs4(check)
        setNs2(check)
        setNs(check)
        setWindows(check)
        setMac(check)
        setLinux(check)*/
        setters.forEach((setter) => {
            setter(check)
        })
    }

    function resetForm() {
        setStandard(false)
        setPort(false)
        setDlc(false)
        setExpanded(false)
        setRemaster(false)
        setRemake(false)
        setExpansion(false)
        setStandaloneExpansion(false)

        setXbsx(false)
        setXbo(false)
        setPs5(false)
        setPs4(false)
        setNs2(false)
        setNs(false)
        setWindows(false)
        setMac(false)
        setLinux(false)

        setPointAndClick(false)
        setFighting(false)
        setShooter(false)
        setMusic(false)
        setPlatform(false)
        setPuzzle(false)
        setRacing(false)
        setRts(false)
        setRpg(false)
        setSimulator(false)
        setSports(false)
        setStrategy(false)
        setTbs(false)
        setTactical(false)
        setQuiz(false)
        setPinball(false)
        setAdventure(false)
        setIndie(false)
        setArcade(false)
        setVisualNovel(false)
        setCard(false)
        setMoba(false)

        setSinglePlayer(false)
        setMultiplayer(false)
        setCoop(false)
        setSplitScreen(false)
        setMmo(false)
        setBattleRoyale(false)

        setLimit(12)
        setSearchText("")
    }

    const all = (
        !searchParams.get("standard") ||
        !searchParams.get("port") ||
        !searchParams.get("dlc") ||
        !searchParams.get("expanded") ||
        !searchParams.get("remaster") ||
        !searchParams.get("remake")
    ) ? true : false;

    // Game Types
    const [standard, setStandard] = useState(searchParams.get('standard') ? true : false);
    const [port, setPort] = useState(searchParams.get('port') ? true : false);
    const [dlc, setDlc] = useState(searchParams.get('dlc') ? true : false);
    const [expanded, setExpanded] = useState(searchParams.get('expanded') ? true : false);
    const [remaster, setRemaster] = useState(searchParams.get('remaster') ? true : false);
    const [remake, setRemake] = useState(searchParams.get('remake') ? true : false);
    const [expansion, setExpansion] = useState(searchParams.get('expansion') ? true : false);
    const [standaloneExpansion, setStandaloneExpansion] = useState(searchParams.get('standalone_expansion') ? true : false);

    // Platforms
    const [xbsx, setXbsx] = useState(searchParams.get('xbsx') ? true : false);
    const [xbo, setXbo] = useState(searchParams.get('xbo') ? true : false);
    const [ps5, setPs5] = useState(searchParams.get('ps5') ? true : false);
    const [ps4, setPs4] = useState(searchParams.get('ps4') ? true : false);
    const [ns2, setNs2] = useState(searchParams.get('ns2') ? true : false);
    const [ns, setNs] = useState(searchParams.get('ns') ? true : false);
    const [windows, setWindows] = useState(searchParams.get('windows') ? true : false);
    const [mac, setMac] = useState(searchParams.get('mac') ? true : false);
    const [linux, setLinux] = useState(searchParams.get('linux') ? true : false);

    // Genres
    const [pointAndClick, setPointAndClick] = useState(searchParams.get('point_and_click') ? true : false); // ID: 2
    const [fighting, setFighting] = useState(searchParams.get('fighting') ? true : false); // ID: 4
    const [shooter, setShooter] = useState(searchParams.get('shooter') ? true : false); // ID: 5
    const [music, setMusic] = useState(searchParams.get('music') ? true : false); // ID: 7
    const [platform, setPlatform] = useState(searchParams.get('platform') ? true : false); // ID: 8
    const [puzzle, setPuzzle] = useState(searchParams.get('puzzle') ? true : false); // ID: 9
    const [racing, setRacing] = useState(searchParams.get('racing') ? true : false); // ID: 10
    const [rts, setRts] = useState(searchParams.get('rts') ? true : false); // ID: 11
    const [rpg, setRpg] = useState(searchParams.get('rpg') ? true : false); // ID: 12
    const [simulator, setSimulator] = useState(searchParams.get('simulator') ? true : false); // ID: 13
    const [sports, setSports] = useState(searchParams.get('sports') ? true : false); // ID: 14
    const [strategy, setStrategy] = useState(searchParams.get('strategy') ? true : false); // ID: 15
    const [tbs, setTbs] = useState(searchParams.get('tbs') ? true : false); // ID: 16
    const [tactical, setTactical] = useState(searchParams.get('tactical') ? true : false); // ID: 24
    const [hackAndSlash, setHackAndSlash] = useState(searchParams.get('hack_and_slash') ? true : false); // ID: 25
    const [quiz, setQuiz] = useState(searchParams.get('quiz') ? true : false); // ID: 26
    const [pinball, setPinball] = useState(searchParams.get('pinball') ? true : false); // ID: 30
    const [adventure, setAdventure] = useState(searchParams.get('adventure') ? true : false); // ID: 31
    const [indie, setIndie] = useState(searchParams.get('indie') ? true : false); // ID: 32
    const [arcade, setArcade] = useState(searchParams.get('arcade') ? true : false); // ID: 33
    const [visualNovel, setVisualNovel] = useState(searchParams.get('visual_novel') ? true : false); // ID: 34
    const [card, setCard] = useState(searchParams.get('card') ? true : false); // ID: 35
    const [moba, setMoba] = useState(searchParams.get('moba') ? true : false); // ID: 36

    // Game Modes
    const [singlePlayer, setSinglePlayer] = useState(searchParams.get('single_player') ? true : false); // ID: 1
    const [multiplayer, setMultiplayer] = useState(searchParams.get('multiplayer') ? true : false); // ID: 2
    const [coop, setCoop] = useState(searchParams.get('co_op') ? true : false); // ID: 3
    const [splitScreen, setSplitScreen] = useState(searchParams.get('split_screen') ? true : false); // ID: 4
    const [mmo, setMmo] = useState(searchParams.get('mmo') ? true : false); // ID: 5
    const [battleRoyale, setBattleRoyale] = useState(searchParams.get('battle_royale') ? true : false); // ID: 6

    const router = useRouter(); // Extracts the replace method from useRouter

    const checkboxBtn = "bg-gray-500 text-white p-1 rounded-sm cursor-pointer hover:bg-gray-600 mb-1";

    return (
        <div 
            /*className="flex flex-col lg:flex-row items-center justify-evenly mx-auto"*/
            className="w-full mx-auto"
        >
            {/* Search Form */}
            <div className="bg-secondaryBg text-secondaryText rounded-sm shadow-sm p-4 m-4 h-[45vh] lg:h-[90vh] overflow-y-auto"> {/* Formerly had bg-neutral-50 class */}
                <h2 className="form-header">
                    Search for Games
                </h2>
                <Form
                    //action={getSearchResults}
                    action="/search"
                >
                    <label htmlFor="search" className="block mb-1">Search</label>
                    <input 
                        name="search" 
                        id="search"
                        type="text" 
                        //defaultValue={searchParams.get('search') ? searchParams.get('search')?.toString() : ""}
                        defaultValue={searchText}
                        className="form-field bg-formFieldBg text-formFieldText"
                        placeholder="Search by title..."
                    />

                    <div className="mt-4 mb-4 flex flex-col md:flex-row justify-evenly">
                        <Accordion type="multiple">
                            <AccordionItem value="item-1">
                                <AccordionTrigger>
                                    Filter by Platform
                                </AccordionTrigger>
                                <AccordionContent>
                                    {/*<h3 className="text-black form-sub-header">
                                        Filter by Platform
                                    </h3>*/}
                                    {/*<div>
                                        <button 
                                            type="button"
                                            className={`${checkboxBtn}`}
                                            onClick={() => {
                                                handleCheckboxes(true, [setXbsx, setXbo, setPs5, setPs4, setNs2, setNs, setWindows, setMac, setLinux])
                                            }}
                                        >
                                            Select All
                                        </button>
                                    </div>*/}
                                    <CheckboxButton
                                        setter={handleCheckboxes}
                                        text="Select All"
                                        check={true}
                                        setters={[setXbsx, setXbo, setPs5, setPs4, setNs2, setNs, setWindows, setMac, setLinux]}
                                    />

                                    {/*<div>
                                        <button 
                                            type="button"
                                            className={`${checkboxBtn}`}
                                            *//*onClick={() => {
                                                handlePlatformCheckboxes(false)
                                            }}*//*
                                            onClick={() => {
                                                handleCheckboxes(false, [setXbsx, setXbo, setPs5, setPs4, setNs2, setNs, setWindows, setMac, setLinux])
                                            }}
                                        >
                                            De-Select All
                                        </button>
                                    </div>*/}
                                    {/*<CheckboxButton
                                        setter={handleCheckboxes}
                                        text="De-Select All"
                                        check={false}
                                        setters={[setXbsx, setXbo, setPs5, setPs4, setNs2, setNs, setWindows, setMac, setLinux]}
                                    />*/}

                                    <hr className="mt-1 mb-1" />

                                    {/* Xbox Series X|S */}
                                    <SearchCheckbox
                                        checkbox={xbsx}
                                        setter={() => setXbsx(!xbsx)}
                                        checkboxName="xbsx"
                                        displayName="Xbox Series X|S"
                                    />

                                    {/* Xbox One */}
                                    <SearchCheckbox
                                        checkbox={xbo}
                                        setter={() => setXbo(!xbo)}
                                        checkboxName="xbo"
                                        displayName="Xbox One"
                                    />

                                    {/* Playstation 5 */}
                                    <SearchCheckbox
                                        checkbox={ps5}
                                        setter={() => setPs5(!ps5)}
                                        checkboxName="ps5"
                                        displayName="Playstation 5"
                                    />

                                    {/* Playstation 4 */}
                                    <SearchCheckbox
                                        checkbox={ps4}
                                        setter={() => setPs4(!ps4)}
                                        checkboxName="ps4"
                                        displayName="Playstation 4"
                                    />

                                    {/* Nintendo Switch 2 */}
                                    <SearchCheckbox
                                        checkbox={ns2}
                                        setter={() => setNs2(!ns2)}
                                        checkboxName="ns2"
                                        displayName="Nintendo Switch 2"
                                    />

                                    {/* Nintendo Switch */}
                                    <SearchCheckbox
                                        checkbox={ns}
                                        setter={() => setNs(!ns)}
                                        checkboxName="ns"
                                        displayName="Nintendo Switch"
                                    />

                                    {/* Windows */}
                                    <SearchCheckbox
                                        checkbox={windows}
                                        setter={() => setWindows(!windows)}
                                        checkboxName="windows"
                                        displayName="Windows"
                                    />

                                    {/* MacOS */}
                                    <SearchCheckbox
                                        checkbox={mac}
                                        setter={() => setMac(!mac)}
                                        checkboxName="mac"
                                        displayName="MacOS"
                                    />

                                    {/* Linux */}
                                    <SearchCheckbox
                                        checkbox={linux}
                                        setter={() => setLinux(!linux)}
                                        checkboxName="linux"
                                        displayName="Linux"
                                    />
                                </AccordionContent>
                            </AccordionItem>

                            <AccordionItem value="item-2">
                                <AccordionTrigger>
                                    Filter by Type
                                </AccordionTrigger>
                                <AccordionContent>
                                    {/*<h3 className="text-black form-sub-header">
                                        Filter by Type
                                    </h3>*/}

                                    <CheckboxButton
                                        setter={handleCheckboxes}
                                        setters={[
                                            setStandard,
                                            setRemake,
                                            setRemaster,
                                            setExpanded,
                                            setPort,
                                            setExpansion,
                                            setStandaloneExpansion,
                                            setDlc
                                        ]}
                                    />

                                    {/* Standard */}
                                    <SearchCheckbox
                                        checkbox={standard}
                                        setter={() => setStandard(!standard)}
                                        checkboxName="standard"
                                        displayName="Standard"
                                    />

                                    {/* Remake */}
                                    <SearchCheckbox
                                        checkbox={remake}
                                        setter={() => setRemake(!remake)}
                                        checkboxName="remake"
                                        displayName="Remake"
                                    />

                                    {/* Remaster */}
                                    <SearchCheckbox
                                        checkbox={remaster}
                                        setter={() => setRemaster(!remaster)}
                                        checkboxName="remaster"
                                        displayName="Remaster"
                                    />

                                    {/* Expanded Game */}
                                    <SearchCheckbox
                                        checkbox={expanded}
                                        setter={() => setExpanded(!expanded)}
                                        checkboxName="expanded_game"
                                        displayName="Expanded Game"
                                    />

                                    {/* Port */}
                                    <SearchCheckbox
                                        checkbox={port}
                                        setter={() => setPort(!port)}
                                        checkboxName="port"
                                        displayName="Port"
                                    />

                                    {/* Expansion */}
                                    <SearchCheckbox
                                        checkbox={expansion}
                                        setter={() => setExpansion(!expansion)}
                                        checkboxName="expansion"
                                        displayName="Expansion"
                                    />

                                    {/* Standalone Expansion */}
                                    <SearchCheckbox
                                        checkbox={standaloneExpansion}
                                        setter={() => setStandaloneExpansion(!standaloneExpansion)}
                                        checkboxName="standalone_expansion"
                                        displayName="Standalone Expansion"
                                    />

                                    {/* DLC */}
                                    <SearchCheckbox
                                        checkbox={dlc}
                                        setter={() => setDlc(!dlc)}
                                        checkboxName="dlc"
                                        displayName="DLC"
                                    />
                                </AccordionContent>
                            </AccordionItem>

                            <AccordionItem value="item-3">
                                <AccordionTrigger>
                                    Filter by Genre
                                </AccordionTrigger>
                                <AccordionContent>
                                    {/*<h3 className="text-black form-sub-header">
                                        Filter by Genre
                                    </h3>*/}

                                    <CheckboxButton
                                        setter={handleCheckboxes}
                                        setters={[
                                            setAdventure,
                                            setArcade,
                                            setCard,
                                            setFighting,
                                            setHackAndSlash,
                                            setIndie,
                                            setMoba,
                                            setMusic,
                                            setPlatform,
                                            setPointAndClick,
                                            setPuzzle,
                                            setQuiz,
                                            setRacing,
                                            setRts,
                                            setRpg,
                                            setSimulator,
                                            setShooter,
                                            setSports,
                                            setStrategy,
                                            setTactical,
                                            setTbs,
                                            setVisualNovel
                                        ]}
                                    />

                                    {/* Adventure */}
                                    <SearchCheckbox
                                        checkbox={adventure}
                                        setter={() => setAdventure(!adventure)}
                                        checkboxName="adventure"
                                        displayName="Adventure"
                                    />

                                    {/* Arcade */}
                                    <SearchCheckbox
                                        checkbox={arcade}
                                        setter={() => setArcade(!arcade)}
                                        checkboxName="arcade"
                                        displayName="Arcade"
                                    />

                                    {/* Card & Board Game */}
                                    <SearchCheckbox
                                        checkbox={card}
                                        setter={() => setCard(!card)}
                                        checkboxName="card"
                                        displayName="Card/Board"
                                    />

                                    {/* Fighting */}
                                    <SearchCheckbox
                                        checkbox={fighting}
                                        setter={() => setFighting(!fighting)}
                                        checkboxName="fighting"
                                        displayName="Fighting"
                                    />

                                    {/* Hack-and-Slash/Beat-em-up */}
                                    <SearchCheckbox
                                        checkbox={hackAndSlash}
                                        setter={() => setHackAndSlash(!hackAndSlash)}
                                        checkboxName="hack_and_slash"
                                        displayName="Hack-and-Slash/Beat-em-up"
                                    />

                                    {/* Indie */}
                                    <SearchCheckbox
                                        checkbox={indie}
                                        setter={() => setIndie(!indie)}
                                        checkboxName="indie"
                                        displayName="Indie"
                                    />

                                    {/* MOBA */}
                                    <SearchCheckbox
                                        checkbox={moba}
                                        setter={() => setMoba(!moba)}
                                        checkboxName="moba"
                                        displayName="MOBA"
                                    />

                                    {/* Music */}
                                    <SearchCheckbox
                                        checkbox={music}
                                        setter={() => setMusic(!music)}
                                        checkboxName="music"
                                        displayName="Music"
                                    />

                                    {/* Pinball */}
                                    {/*<SearchCheckbox
                                        checkbox={pinball}
                                        setter={() => setPinball(!pinball)}
                                        checkboxName="pinball"
                                        displayName="pinball"
                                    />*/}

                                    {/* Platform */}
                                    <SearchCheckbox
                                        checkbox={platform}
                                        setter={() => setPlatform(!platform)}
                                        checkboxName="platform"
                                        displayName="Platform"
                                    />

                                    {/* Point-and-Click */}
                                    <SearchCheckbox
                                        checkbox={pointAndClick}
                                        setter={() => setPointAndClick(!pointAndClick)}
                                        checkboxName="point_and_click"
                                        displayName="Point-and-Click"
                                    />

                                    {/* Puzzle */}
                                    <SearchCheckbox
                                        checkbox={puzzle}
                                        setter={() => setPuzzle(!puzzle)}
                                        checkboxName="puzzle"
                                        displayName="Puzzle"
                                    />

                                    {/* Quiz/Trivia */}
                                    <SearchCheckbox
                                        checkbox={quiz}
                                        setter={() => setQuiz(!quiz)}
                                        checkboxName="quiz"
                                        displayName="Quiz/Trivia"
                                    />

                                    {/* Racing */}
                                    <SearchCheckbox
                                        checkbox={racing}
                                        setter={() => setRacing(!racing)}
                                        checkboxName="racing"
                                        displayName="Racing"
                                    />

                                    {/* Real-Time Strategy (RTS) */}
                                    <SearchCheckbox
                                        checkbox={rts}
                                        setter={() => setRts(!rts)}
                                        checkboxName="rts"
                                        displayName="Real-Time Strategy (RTS)"
                                    />

                                    {/* Role-Playing (RPG) */}
                                    <SearchCheckbox
                                        checkbox={rpg}
                                        setter={() => setRpg(!rpg)}
                                        checkboxName="rpg"
                                        displayName="Role-Playing (RPG)"
                                    />

                                    {/* Simulator */}
                                    <SearchCheckbox
                                        checkbox={simulator}
                                        setter={() => setSimulator(!simulator)}
                                        checkboxName="simulator"
                                        displayName="Simulator"
                                    />

                                    {/* Shooter */}
                                    <SearchCheckbox
                                        checkbox={shooter}
                                        setter={() => setShooter(!shooter)}
                                        checkboxName="shooter"
                                        displayName="Shooter"
                                    />

                                    {/* Sports */}
                                    <SearchCheckbox
                                        checkbox={sports}
                                        setter={() => setSports(!sports)}
                                        checkboxName="sports"
                                        displayName="Sports"
                                    />

                                    {/* Strategy */}
                                    <SearchCheckbox
                                        checkbox={strategy}
                                        setter={() => setStrategy(!strategy)}
                                        checkboxName="strategy"
                                        displayName="Strategy"
                                    />

                                    {/* Tactical */}
                                    <SearchCheckbox
                                        checkbox={tactical}
                                        setter={() => setTactical(!tactical)}
                                        checkboxName="tactical"
                                        displayName="Tactical"
                                    />

                                    {/* Turn-Based Strategy (TBS) */}
                                    <SearchCheckbox
                                        checkbox={tbs}
                                        setter={() => setTbs(!tbs)}
                                        checkboxName="tbs"
                                        displayName="Turn-Based Strategy (TBS)"
                                    />

                                    {/* Visual Novel */}
                                    <SearchCheckbox
                                        checkbox={visualNovel}
                                        setter={() => setVisualNovel(!visualNovel)}
                                        checkboxName="visual_novel"
                                        displayName="Visual Novel"
                                    />
                                </AccordionContent>
                            </AccordionItem>

                            <AccordionItem value="item-4">
                                <AccordionTrigger>
                                    Filter by Game Mode
                                </AccordionTrigger>
                                <AccordionContent>
                                    {/*<h3 className="text-black form-sub-header">
                                        Filter by Game Mode
                                    </h3>*/}

                                    <CheckboxButton
                                        setter={handleCheckboxes}
                                        setters={[
                                            setSinglePlayer,
                                            setMultiplayer,
                                            setCoop,
                                            setSplitScreen,
                                            setMmo,
                                            setBattleRoyale
                                        ]}
                                    />

                                    {/* Single Player */}
                                    <SearchCheckbox 
                                        checkbox={singlePlayer}
                                        setter={() => setSinglePlayer(!singlePlayer)}
                                        checkboxName="single_player"
                                        displayName="Single Player"
                                    />

                                    {/* Multiplayer */}
                                    <SearchCheckbox
                                        checkbox={multiplayer}
                                        setter={() => setMultiplayer(!multiplayer)}
                                        checkboxName="multiplayer"
                                        displayName="Multiplayer"
                                    />

                                    {/* Co-Op */}
                                    <SearchCheckbox
                                        checkbox={coop}
                                        setter={() => setCoop(!coop)}
                                        checkboxName="co_op"
                                        displayName="Co-Op"
                                    />

                                    {/* Split-Screen */}
                                    <SearchCheckbox
                                        checkbox={splitScreen}
                                        setter={() => setSplitScreen(!splitScreen)}
                                        checkboxName="split_screen"
                                        displayName="Split-Screen"
                                    />

                                    {/* MMO */}
                                    <SearchCheckbox
                                        checkbox={mmo}
                                        setter={() => setMmo(!mmo)}
                                        checkboxName="mmo"
                                        displayName="MMO"
                                    />

                                    {/* Battle Royale */}
                                    <SearchCheckbox
                                        checkbox={battleRoyale}
                                        setter={() => setBattleRoyale(!battleRoyale)}
                                        checkboxName="battle_royale"
                                        displayName="Battle Royale"
                                    />
                                </AccordionContent>
                            </AccordionItem>
                        </Accordion>
                    </div>

                    <div>
                        <label htmlFor="limit" className="block mb-1">Page Limit</label>
                        <select
                            name="limit"
                            id="limit"
                            defaultValue={limit ? limit : "12"}
                            onChange={(e) => setLimit(Number(e.target.value))}
                            className="form-select bg-formFieldBg text-formFieldText" // Formerly had bg-secondaryBg clas
                        >
                            <option value="6">6</option>
                            <option value="8">8</option>
                            <option value="12">12</option>
                            <option value="16">16</option>
                            <option value="18">18</option>
                            <option value="24">24</option>
                        </select>
                    </div>

                    <div className="flex flex-col md:flex-row">
                        
                        <div className="mb-2 md:mb-0 md:mr-2">
                            <button 
                                type="submit"
                                className="
                                    form-submit-btn 
                                    bg-button 
                                    active:bg-buttonDarkened 
                                    hover:bg-buttonDarkened 
                                    disabled:bg-buttonLightened
                                "
                            >
                                Search
                            </button>
                        </div>

                        <div className="md:ml-2">
                            <button
                                type="button"

                                // Formerly had bg-gray-500, text-white, and hover:bg-gray-600 classes
                                className="bg-resetButton hover:bg-resetButtonDarkened text-resetButtonText p-2 rounded-sm cursor-pointer"
                                onClick={() => resetForm()}
                            >
                                Reset
                            </button>
                        </div>
                        
                    </div>
                </Form>
            </div>

            {/* Game Display */}
        </div>
    )
}