export default async function getSimilarGames(IGDB_id: number) {
    try {
        const res = await fetch(`${process.env.BACKEND_URL}/get_similar_games`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                IGDB_id: IGDB_id
            })
        });

        if (!res.ok) {
            throw new Error("Response was not ok.")
        }

        return res.json();
    } catch (error) {
        return {
            success: false,
            error: `Error getting similar games: ${error}`
        }
    }
}