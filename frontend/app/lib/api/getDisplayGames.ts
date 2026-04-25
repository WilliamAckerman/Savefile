export default async function getDisplayGames(code="total_rating_count", field="total_rating_count", reverse=false) {
    try {
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

        if (!res.ok) {
            throw new Error("Response was not ok.")
        }
    
        const data = await res.json()

        //return res
        return data;
    } catch (error) {
        return { 
            'success': false, 
            'error': `Error getting display games: ${error}`
        }
    }
}