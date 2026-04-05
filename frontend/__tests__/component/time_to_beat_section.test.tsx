import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import TimeToBeatSection from '@/app/games/[IGDB_id]/_components/_general_info/TimeToBeatSection';

describe('Time to Beat Section', () => {
    it('Has a heading that depends on what was passed as its title prop', () => {
        render(
            <TimeToBeatSection 
                title={"Completely"} 
                timeToBeat={50} 
            />
        )

        const heading = screen.getByTestId('timeToBeatHeader');

        expect(heading).toHaveTextContent('Completely')
    })
})