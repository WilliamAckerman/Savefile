import type { Metadata } from 'next';
import { PageHeaderSection } from '@/app/components/PageHeaderSection';

import '@/app/styles/General.css';

export const metadata: Metadata = {
    title: 'Guidelines'
}

export default function Page() {
    return (
        <>
            {/*<div>
                <h1 className="main-header">Guidelines</h1>
                <hr />
            </div>*/}
            <PageHeaderSection
                current_page="Guidelines"
            />

            <section className="p-4">
                <p>
                    As there is currently no implemented functionality regarding user accounts, 
                    there are no guidelines to be listed. When accounts have been implemented, this page 
                    will be updated, detailing user guidelines regarding Savefile. Thank you for understanding.
                </p>
            </section>
        </>
    )
}