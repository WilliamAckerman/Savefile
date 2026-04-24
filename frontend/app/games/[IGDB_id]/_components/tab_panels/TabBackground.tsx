import '@/app/games/[IGDB_id]/_styles/gameSection.css';

import type Cover from '@/app/lib/types/cover';
import { ReactNode } from 'react';

interface TabBackgroundProps {
    cover: Cover | null
    children: ReactNode
    center?: boolean
}

export default function TabBackground(props: TabBackgroundProps) {
    const cover = props.cover
    const center: boolean = props.center ? props.center : false;

    const centerCss: string = center ? "items-center" : "";

    return (
        <div 
            className="gameSectionBg bg-repeat"
            style={{
                backgroundImage: (cover && cover.url) ? `url(https:${cover.url.replace("t_thumb", "t_cover_big_2x")})` : "",
                backgroundPosition: 'center'
            }}
        >
            <div className={`gameSectionBox ${centerCss}`}>
                {props.children}
            </div>
        </div>
    )
}