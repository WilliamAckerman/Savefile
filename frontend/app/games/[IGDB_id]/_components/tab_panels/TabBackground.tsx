import '@/app/games/[IGDB_id]/_styles/gameSection.css';

export default function TabBackground(props) {
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