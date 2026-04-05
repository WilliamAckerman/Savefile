interface TimeToBeatProps {
    title: string
    timeToBeat: number
}

export default function TimeToBeatSection(props: TimeToBeatProps) {
    const title: string = props.title;
    const timeToBeat: number = props.timeToBeat;
    const timeToBeatHours: string = (timeToBeat / 60 / 60).toFixed(2);

    const h3 = "text-white text-lg md:text-xl lg:text-3xl";

    return (
        <div className="bg-green-500 p-1 m-1 rounded-sm">
            <h3 
                className={`${h3}`}
                data-testid="timeToBeatHeader"
            >
                {title}
            </h3>

            <p className="text-white">
                {timeToBeatHours} hours
            </p>
        </div>
    )
}