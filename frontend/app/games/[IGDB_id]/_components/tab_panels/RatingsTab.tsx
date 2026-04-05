import './_styles/tabContent.css';
import RatingSection from '@/app/games/[IGDB_id]/_components/_ratings/RatingSection';

interface RatingsTabProps {
    rating: number
    rating_count: number
    aggregated_rating: number
    aggregated_rating_count: number
    total_rating: number
    total_rating_count: number
}

export default function RatingsTab(props: RatingsTabProps) {
    const rating: number = props.rating;
    const ratingCount: number = props.rating_count;
    const aggregatedRating: number = props.aggregated_rating;
    const aggregatedRatingCount: number = props.aggregated_rating_count;
    const totalRating: number = props.total_rating;
    const totalRatingCount: number = props.total_rating_count;

    return (
        <div className="w-full">
            <h1 className="text-white h1">
                Ratings
            </h1>

            <div className="flex flex-row flex-wrap items-center justify-evenly">
                {
                    rating &&
                    <RatingSection
                        rating={rating}
                        rating_count={ratingCount}
                        rating_type={"General"}
                    />
                }

                {
                    aggregatedRating &&
                    <RatingSection
                        rating={aggregatedRating}
                        rating_count={aggregatedRatingCount}
                        rating_type={"Aggregated"}
                    />
                }

                {
                    totalRating &&
                    <RatingSection
                        rating={totalRating}
                        rating_count={totalRatingCount}
                        rating_type={"Total"}
                    />
                }
            </div>
        </div>
    )
}