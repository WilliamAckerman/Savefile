import getDisplayGames from '@/app/lib/api/getDisplayGames'
import GameCarousel from '@/app/components/landing_page/GameCarousel'

interface DisplayGamesProps {
    code: string
    field: string
    reverse: boolean
}

export default async function DisplayGames(props: DisplayGamesProps) {
    const code = props.code ? props.code : "total_rating_count"
    const field = props.field ? props.field : "total_rating_count"
    const reverse: boolean = props.reverse ? props.reverse : false

    const gameData = await getDisplayGames(code, field, reverse)
    //const gameData = await data.json()
    
    return (
        <>
            { 
                (gameData && gameData?.success === true) ?
                <GameCarousel
                    array={gameData}
                    code={code}
                    //field={field}
                    //reverse={reverse}
                />
                :
                <p>Failed to get games.</p>
                
            }
        </>
    )
}