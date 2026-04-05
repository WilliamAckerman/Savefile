function getRatingColor(rating: number) {
    if (rating >= 70) return "bg-green-500";
    if (rating >= 50) return "bg-yellow-500";
    return "bg-red-500";
}

interface RatingSectionProps {
    rating: number
    rating_count: number
    rating_type: string
}

export default function RatingSection(props: RatingSectionProps) {
    const rating: number = Math.floor(props.rating);
    const ratingCount: number = props.rating_count;
    const ratingType: string = props.rating_type;

    const ratingColor: string = getRatingColor(rating);
    const fixedRating = rating.toFixed();

    return (
        <div className="p-4">
            <div className={`${ratingColor} mx-auto flex items-center border-white-2px border-sold w-[15vh] h-[15vh] rounded-xl`}>
                <span className="-top-50 -left-50 text-center mx-auto text-xl md:text-2xl lg:text-3xl">
                    {fixedRating}
                </span>
            </div>

            <span className="block text-center md:text-lg lg:text-xl">{ratingType} Rating</span>
            { ratingCount && <span className="block mt-2 text-center lg:text-lg">Based on {ratingCount} review{ratingCount == 1 ? "" : "s"}</span>}
        </div>
    )
}