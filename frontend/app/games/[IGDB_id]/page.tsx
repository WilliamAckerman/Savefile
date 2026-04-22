import getGameData from '@/app/games/[IGDB_id]/_api/getGameData'
import GameInformation from '@/app/games/[IGDB_id]/_components/GameInformation'
import { Suspense } from 'react'

import getSimilarGames from './_components/tab_panels/_api/getSimilarGames';

export default async function Page(
    { params }: { params: Promise<{ IGDB_id: string }> }
) {
    const slug: { IGDB_id: string } = await params
    //console.log(slug)

    const data = await getGameData(slug.IGDB_id)
    const similarGameData = await getSimilarGames(Number(slug.IGDB_id));
    //console.log(data)

    //console.log(similarGameData);

    return (
        <div>
            <Suspense fallback={<p>Loading game data...</p>}>
                <GameInformation
                    data={data.data}
                    similarGameData={similarGameData}
                />
            </Suspense>
        </div>
    )
}