import { cacheLife } from 'next/cache';

export default async function getHomePageGames() {
    'use cache' // Caches what is returned
    cacheLife('hours') // Sets cache lifetime

    try {
        const res = await fetch(`${process.env.BACKEND_URL}/get_home_page_games`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })

        if (!res.ok) {
            throw new Error("Failed to get game covers for home page.")
        }

        const data = await res.json()

        return data;
    } catch (error) {
        return {
            'success': false,
            'error': `Error getting game covers for home page: ${error}`
        }
    }
}

//export const dynamic = 'auto'