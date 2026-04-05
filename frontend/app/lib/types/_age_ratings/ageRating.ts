import type AgeRatingCategory from '@/app/lib/types/_age_ratings/ageRatingCategory';
import type AgeRatingContentDescription from '@/app/lib/types/_age_ratings/ageRatingContentDescription';

type AgeRating = {
    IGDB_age_rating_id: number
    organization: number
    organization_name: string
    rating_category: number
    age_rating_category: AgeRatingCategory
    age_rating_content_descriptions: AgeRatingContentDescription[]
}

export default AgeRating;