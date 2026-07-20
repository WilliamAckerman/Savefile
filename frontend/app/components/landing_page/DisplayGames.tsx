import { Suspense } from 'react'

import getDisplayGames from '@/app/lib/api/getDisplayGames'
import GameCarousel from '@/app/components/landing_page/GameCarousel'

import GameCarouselSkeleton from './skeletons/GameCarouselSkeleton'

interface DisplayGamesProps {
    code: string
    field: string
    reverse: boolean
    title: string
    sectionClass?: string
}

export default async function DisplayGames(props: DisplayGamesProps) {
    const code = props.code ? props.code : "total_rating_count"
    const field = props.field ? props.field : "total_rating_count"
    const reverse: boolean = props.reverse ? props.reverse : false

    const sectionClass = props.sectionClass ? props.sectionClass : "";
    const title = props.title ? props.title : "";

    const gameData = await getDisplayGames(code, field, reverse)
    //const gameData = await data.json()
    
    return (
        <>
            <section className={`${sectionClass} mx-16 p-4`}>
                <h2 className="text-primaryText mb-4 lg:mb-6 text-xl sm:text-2xl md:text-3xl lg:text-4xl">
                    {title}
                </h2>
                <Suspense fallback={<GameCarouselSkeleton />}>
            { 
                (gameData && gameData?.success === true) ?
                <>
                {/*<GameCarousel
                    array={gameData}
                    code={code}
                    //field={field}
                    //reverse={reverse}
                />*/}
                <p>Deprecated</p>
                </>
                :
                <p>Failed to get games.</p>
                
            }
                </Suspense>
            </section>
        </>
    )
}