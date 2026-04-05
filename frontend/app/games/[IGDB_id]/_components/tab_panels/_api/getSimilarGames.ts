export default async function getSimilarGames(IGDB_id: number) {
    const res = await fetch(`${process.env.BACKEND_URL}/get_similar_games`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            IGDB_id: IGDB_id
        })
    });

    return res.json();
}