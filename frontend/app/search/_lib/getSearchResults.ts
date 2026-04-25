"use server"

function appendToQueryString(queryArray: string[], key: string, value: boolean) {
    if (value) {
        queryArray.push(`${key}=true`)
    }
}

interface SearchParams {
    search?: string
    page?: string
    limit?: string
    filter?: string

    xbsx?: boolean
    xbo?: boolean
    ps5?: boolean
    ps4?: boolean
    ns2?: boolean
    ns?: boolean
    windows?: boolean
    mac?: boolean
    linux?: boolean

    standard?: boolean
    remake?: boolean
    remaster?: boolean
    expanded_game?: boolean
    port?: boolean
    expansion?: boolean
    standalone_expansion?: boolean
    dlc?: boolean

    adventure?: boolean
    arcade?: boolean
    card?: boolean
    fighting?: boolean
    hack_and_slash?: boolean
    indie?: boolean
    moba?: boolean
    music?: boolean
    platform?: boolean
    point_and_click?: boolean
    puzzle?: boolean
    quiz?: boolean
    racing?: boolean
    rts?: boolean
    rpg?: boolean
    simulator?: boolean
    shooter?: boolean
    sports?: boolean
    strategy?: boolean
    tactical?: boolean
    tbs?: boolean
    visual_novel?: boolean

    single_player?: boolean
    multiplayer?: boolean
    co_op?: boolean
    split_screen?: boolean
    mmo?: boolean
    battle_royale?: boolean
}

const getSearchResults = async (
    /*formData: FormData*/
    searchParams: SearchParams | undefined
) => {
    //const search = formData.get('search') || "";

    let queryString = `${process.env.BACKEND_URL}/get_game_search_results`;
    //queryString += `?search=${search}`

    if (
        searchParams !== undefined &&
        Object.keys(searchParams).length > 0
    ) {
        queryString += `?`;

        const queryArray: string[] = [];

        if (searchParams?.search) {
            queryArray.push(`search=${searchParams?.search}`)
        }

        if (searchParams?.page) {
            queryArray.push(`page=${searchParams?.page}`)
        }

        if (searchParams?.limit) {
            queryArray.push(`limit=${searchParams?.limit}`)
        }

        /*if (searchParams.xbsx) {
            queryArray.push(`xbsx=${searchParams?.xbsx}`)
        }*/

        /*if (searchParams.xbo) {
            queryArray.push(`xbo=${searchParams?.xbo}`)
        }*/
        const filters: string[] = [
            'xbsx',
            'xbo',
            'ps5',
            'ps4',
            'ns2',
            'ns',
            'windows',
            'mac',
            'linux',

            'standard',
            'remake',
            'remaster',
            'expanded_game',
            'port',
            'expansion',
            'standalone_expansion',
            'dlc',

            'adventure',
            'arcade',
            'card',
            'fighting',
            'hack_and_slash',
            'indie',
            'moba',
            'music',
            'platform',
            'point_and_click',
            'puzzle',
            'quiz',
            'racing',
            'rts',
            'rpg',
            'simulator',
            'shooter',
            'sports',
            'strategy',
            'tactical',
            'tbs',
            'visual_novel',

            'single_player',
            'multiplayer',
            'co_op',
            'split_screen',
            'mmo',
            'battle_royale'
        ];

        /*filters.forEach((filter) => {
            appendToQueryString(queryArray, filter, searchParams?.[filter])
        })*/

        if (searchParams?.xbsx) queryArray.push(`xbsx=${searchParams?.xbsx}`)
        if (searchParams?.xbo) queryArray.push(`xbo=${searchParams?.xbo}`)
        if (searchParams?.ps5) queryArray.push(`ps5=${searchParams?.ps5}`)
        if (searchParams?.ps4) queryArray.push(`ps4=${searchParams?.ps4}`)
        if (searchParams?.ns2) queryArray.push(`ns2=${searchParams?.ns2}`)
        if (searchParams?.ns) queryArray.push(`ns=${searchParams?.ns}`)
        if (searchParams?.windows) queryArray.push(`windows=${searchParams?.windows}`)
        if (searchParams?.mac) queryArray.push(`mac=${searchParams?.mac}`)
        if (searchParams?.linux) queryArray.push(`linux=${searchParams?.linux}`)
        
        if (searchParams?.standard) queryArray.push(`standard=${searchParams?.standard}`)
        if (searchParams?.remake) queryArray.push(`remake=${searchParams?.remake}`)
        if (searchParams?.remaster) queryArray.push(`remaster=${searchParams?.remaster}`)
        if (searchParams?.expanded_game) queryArray.push(`expanded_game=${searchParams?.expanded_game}`)
        if (searchParams?.port) queryArray.push(`port=${searchParams?.port}`)
        if (searchParams?.expansion) queryArray.push(`expansion=${searchParams?.expansion}`)
        if (searchParams?.standalone_expansion) queryArray.push(`standalone_expansion=${searchParams?.standalone_expansion}`)
        if (searchParams?.dlc) queryArray.push(`dlc=${searchParams?.dlc}`)

        if (searchParams?.adventure) queryArray.push(`adventure=${searchParams?.adventure}`)
        if (searchParams?.arcade) queryArray.push(`arcade=${searchParams?.arcade}`)
        if (searchParams?.card) queryArray.push(`card=${searchParams?.card}`)
        if (searchParams?.fighting) queryArray.push(`fighting=${searchParams?.fighting}`)
        if (searchParams?.hack_and_slash) queryArray.push(`hack_and_slash=${searchParams?.hack_and_slash}`)
        if (searchParams?.indie) queryArray.push(`indie=${searchParams?.indie}`)
        if (searchParams?.moba) queryArray.push(`moba=${searchParams?.moba}`)
        if (searchParams?.music) queryArray.push(`music=${searchParams?.music}`)
        if (searchParams?.platform) queryArray.push(`platform=${searchParams?.platform}`)
        if (searchParams?.point_and_click) queryArray.push(`point_and_click=${searchParams?.point_and_click}`)
        if (searchParams?.puzzle) queryArray.push(`puzzle=${searchParams?.puzzle}`)
        if (searchParams?.quiz) queryArray.push(`quiz=${searchParams?.quiz}`)
        if (searchParams?.racing) queryArray.push(`racing=${searchParams?.racing}`)
        if (searchParams?.rts) queryArray.push(`rts=${searchParams?.rts}`)
        if (searchParams?.rpg) queryArray.push(`rpg=${searchParams?.rpg}`)
        if (searchParams?.simulator) queryArray.push(`simulator=${searchParams?.simulator}`)
        if (searchParams?.shooter) queryArray.push(`shooter=${searchParams?.shooter}`)
        if (searchParams?.sports) queryArray.push(`sports=${searchParams?.sports}`)
        if (searchParams?.strategy) queryArray.push(`strategy=${searchParams?.strategy}`)
        if (searchParams?.tactical) queryArray.push(`tactical=${searchParams?.tactical}`)
        if (searchParams?.tbs) queryArray.push(`tbs=${searchParams?.tbs}`)
        if (searchParams?.visual_novel) queryArray.push(`visual_novel=${searchParams?.visual_novel}`)

        if (searchParams?.single_player) queryArray.push(`single_player=${searchParams?.single_player}`)
        if (searchParams?.multiplayer) queryArray.push(`multiplayer=${searchParams?.multiplayer}`)
        if (searchParams?.co_op) queryArray.push(`co_op=${searchParams?.co_op}`)
        if (searchParams?.split_screen) queryArray.push(`split_screen=${searchParams?.split_screen}`)
        if (searchParams?.mmo) queryArray.push(`mmo=${searchParams?.mmo}`)
        if (searchParams?.battle_royale) queryArray.push(`battle_royale=${searchParams?.battle_royale}`)

        //if (searchParams) queryArray.push(`xbsx=${searchParams?.xbsx}`)

       //appendToQueryString(queryArray, 'xbo', searchParams?.xbo);
       //appendToQueryString(queryArray, 'ps5', searchParams?.ps5);

        /*if (search.trim() != "") {
            queryArray.push(`search=${search}`)
        }

        if (xbsx === true) {
            queryArray.push(`xbsx=${xbsx}`)
        }*/

        const paramString = queryArray.join("&")

        queryString += paramString;
    }

    try {

        const res = await fetch(queryString, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })

        if (!res.ok) {
            throw new Error("Response was not ok.")
        }

        const data = await res.json();

        //return res;
        return data;

    } catch (error) {
        return {
            'success': false,
            'error': `Error getting search results: ${error}`
        }
    }
}

export default getSearchResults;