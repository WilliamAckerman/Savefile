import type { Metadata } from 'next';
import ContactForm from "./_components/ContactForm"

export const metadata: Metadata = {
    title: 'Contact'
}

export default function Page() {
    return (
        <>
            {/*<main>*/}
                <h1 className="main-header">Contact</h1>

                <div>
                    <ContactForm />
                </div>
            {/*</main>*/}
        </>
    )
}