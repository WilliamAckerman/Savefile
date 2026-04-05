export default async function getGameData(IGDB_game_id: string) {
    const res = await fetch(`${process.env.BACKEND_URL}/get_game_data/${IGDB_game_id}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })

    const data = await res.json()

    return data
}