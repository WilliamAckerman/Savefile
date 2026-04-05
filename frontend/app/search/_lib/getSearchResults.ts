"use server"

function appendToQueryString(queryArray: string[], key: string, value: boolean) {
    if (value) {
        queryArray.push(`${key}=true`)
    }
}

const getSearchResults = async (
    /*formData: FormData*/
    searchParams
) => {
    //const search = formData.get('search') || "";

    let queryString = `${process.env.BACKEND_URL}/get_game_search_results`;
    //queryString += `?search=${search}`

    if (
        Object.keys(searchParams).length > 0
    ) {
        queryString += `?`;

        const queryArray: string[] = [];

        if (searchParams.search) {
            queryArray.push(`search=${searchParams?.search}`)
        }

        if (searchParams.page) {
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

        filters.forEach((filter) => {
            appendToQueryString(queryArray, filter, searchParams?.[filter])
        })

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

    const res = await fetch(queryString, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })

    return res;
}

export default getSearchResults;