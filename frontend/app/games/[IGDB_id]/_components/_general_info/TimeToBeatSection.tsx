interface TimeToBeatProps {
    title: string
    timeToBeat: number
}

export default function TimeToBeatSection(props: TimeToBeatProps) {
    const title: string = props.title;
    const timeToBeat: number = props.timeToBeat;
    const timeToBeatHours: string = (timeToBeat / 60 / 60).toFixed(2);

    const h3 = "text-secondaryText text-lg md:text-xl lg:text-3xl";

    return (
        <div 
            //className="bg-secondaryBg p-2 m-1 rounded-sm shadow-sm text-center"
        > {/* Originally had bg-violet-600 class */}
            {/*<h3 
                className={`${h3}`}
                data-testid="timeToBeatHeader"
            >
                {title}
            </h3>

            <p className="text-secondaryText">
                {timeToBeatHours} hours
            </p>*/}

            <span className="block">
                <strong>{title}:</strong> {timeToBeatHours} hours
            </span>
        </div>
    )
}