export default async function getDisplayGames(code="total_rating_count", field="total_rating_count", reverse=false) {
    const res = await fetch(`${process.env.BACKEND_URL}/get_display_games`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            'code': code,
            'field': field,
            'reverse': reverse
        })
    })
    
    const data = await res.json()

    //return res
    return data;
}