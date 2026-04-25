export default async function getGameData(IGDB_game_id: string) {
    try {
        const res = await fetch(`${process.env.BACKEND_URL}/get_game_data/${IGDB_game_id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })

        if (!res.ok) {
            throw new Error("Response was not ok.")
        }

        const data = await res.json()

        return data
    } catch (error) {
        return {
            'success': false,
            'error': `Error getting game data: ${error}`
        }
    }
}