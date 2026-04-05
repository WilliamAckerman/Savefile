import type AgeRatingContentDescription from "@/app/lib/types/_age_ratings/ageRatingContentDescription";

interface AgeRatingSectionProps {
    rating: string
    descriptors: AgeRatingContentDescription[]
    title: string
}

export default function AgeRatingSection(props: AgeRatingSectionProps) {
    const rating = props.rating;
    const descriptors = props.descriptors;
    const title = props.title;

    const h2 = "mb-4 text-white text-lg md:text-xl lg:text-3xl";

    return (
        <div className="p-2 bg-violet-700 rounded-sm">
            <h2 className={h2}>{title} Rating</h2>

            <p><strong>Rated {rating}</strong></p>

            {
                descriptors.length > 0
                &&
                <ul className="list-inside list-disc">
                    {descriptors.map((descriptor) => {
                        return (
                            <li key={`${descriptor.IGDB_content_description_id}${title}`} className="text-white">{descriptor.description}</li>
                        )
                    })}
                </ul>
            }
        </div>
    )
}