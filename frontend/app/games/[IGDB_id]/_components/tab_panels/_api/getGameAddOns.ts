export default async function getGameAddOns(IGDB_id: number, type: string) {
    const res = await fetch(`${process.env.BACKEND_URL}/get_game_add_ons`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            IGDB_id: IGDB_id,
            type: type
        })
    });
    return res;
}