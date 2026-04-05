import './_styles/tabContent.css';
import type AgeRating from '@/app/lib/types/_age_ratings/ageRating';
import AgeRatingSection from '@/app/games/[IGDB_id]/_components/_age_ratings/AgeRatingSection';

interface AgeRatingsTabProps {
    age_ratings: AgeRating[]
}

export default function AgeRatingsTab(props: AgeRatingsTabProps) {
    const ageRatings = props.age_ratings;

    let widthClasses = "";
    if (ageRatings.length > 1) widthClasses += "sm:w-1/2";
    if (ageRatings.length > 2) widthClasses += " md:w-1/3";
    if (ageRatings.length > 3) widthClasses += " lg:w-1/4";

    return (
        <div>
            <h1 className={`text-white h1`}>
                Age Ratings
            </h1>

            <div className="flex flex-col sm:flex-row justify-around flex-wrap lg:p-4">
                {
                    ageRatings.map((rating) => {
                        return (
                            <div key={`${rating.IGDB_age_rating_id}${rating.organization_name}`} className={`p-4 mx-auto w-full ${widthClasses} w-auto`}> {/*  sm:w-1/2 md:w-1/3 lg:w-1/4 */}
                                <AgeRatingSection
                                    rating={rating.age_rating_category.rating}
                                    title={rating.organization_name}
                                    descriptors={rating.age_rating_content_descriptions}
                                />
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}