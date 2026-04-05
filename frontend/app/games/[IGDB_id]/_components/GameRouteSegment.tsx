"use client"
import GetLastRouteSegment from '@/app/lib/GetLastRouteSegment'

export default function GameRouteSegment() {
    const IGDB_id = GetLastRouteSegment()

    return (
        <div>{IGDB_id}</div>
    )
}