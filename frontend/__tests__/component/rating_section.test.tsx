import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import RatingSection from '@/app/games/[IGDB_id]/_components/_ratings/RatingSection';

describe('Rating Section', () => {
    it('displays a rating represented as a number', () => {
        render(
            <RatingSection
                rating={91}
                rating_count={40}
                rating_type={"Total"}
            />
        )

        const ratingNumber = screen.getByTestId('ratingNumber')
        expect(ratingNumber).toHaveTextContent('91')
    })

    it('displays the rating number as an integer', () => {
        render(
            <RatingSection
                rating={90.6}
                rating_count={40}
                rating_type={"Total"}
            />
        )

        const ratingNumber = screen.getByTestId('ratingNumber')
        expect(ratingNumber).toHaveTextContent('90')
    })

    it('displays the type of rating', () => {
        render(
            <RatingSection
                rating={90}
                rating_count={40}
                rating_type={"Total"}
            />
        )

        const ratingType = screen.getByTestId('ratingType')
        expect(ratingType).toHaveTextContent('Total Rating')
    })

    /*it('displays the number of ratings', () => {
        render(
            <RatingSection
                rating={90}
                rating_count={2}
                rating_type={"Total"}
            />
        )

        const ratingCount = screen.getByTestId('ratingCount')
        expect(ratingCount).toHaveTextContent('Based on 2 ratings')
    })*/

    /*it('makes ratings singular if there is one rating', () => {
        render(
            <RatingSection
                rating={90}
                rating_count={1}
                rating_type={"Total"}
            />
        )

        const ratingCount = screen.getByTestId('ratingCount')
        expect(ratingCount).toHaveTextContent('Based on 1 rating')
    })*/

    /*it('should not display the number of ratings if ratingCount is not specified', () => {
        render(
            <RatingSection
                rating={90}
                rating_type={"Total"}
            />
        )

        const ratingCount = screen.getByTestId('ratingCount')
        expect(ratingCount).not.toBeInTheDocument()
    })*/
})