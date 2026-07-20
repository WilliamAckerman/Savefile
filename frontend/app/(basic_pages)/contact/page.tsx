import type { Metadata } from 'next';
import ContactForm from "./_components/ContactForm"
import { PageHeaderSection } from '@/app/components/PageHeaderSection';

export const metadata: Metadata = {
    title: 'Contact'
}

export default function Page() {
    return (
        <>
            {/*<div>
                <h1 className="main-header">Contact</h1>
                <hr />
            </div>*/}
            <PageHeaderSection
                current_page="Contact"
            />

            <section className="p-4">
                <ContactForm />
            </section>
        </>
    )
}