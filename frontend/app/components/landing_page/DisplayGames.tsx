import getDisplayGames from '@/app/lib/api/getDisplayGames'
import GameCarousel from '@/app/components/landing_page/GameCarousel'

export default async function DisplayGames(props) {
    const code = props.code ? props.code : "total_rating_count"
    const field = props.field ? props.field : "total_rating_count"
    const reverse: boolean = props.reverse ? props.reverse : false

    const data = await getDisplayGames(code, field, reverse)
    const gameData = await data.json()
    
    return (
        <>
            { 
                gameData &&
                <GameCarousel
                    array={gameData}
                    code={code}
                    field={field}
                    reverse={reverse}
                />
            }
        </>
    )
}