import Link from 'next/link'
import '@/app/styles/General.css';

import type Breadcrumb from '../lib/types/breadcrumb'

interface PageHeaderProps {
    current_page: string
    breadcrumbs?: Breadcrumb[]
}

export const PageHeaderSection = (props: PageHeaderProps) => {
    const breadcrumbs: Breadcrumb[] = props.breadcrumbs ? props.breadcrumbs : []
    breadcrumbs.unshift({ link: "/", page: "Home" })

    return (
        <div>
            <h1 className="main-header text-primaryText font-semibold">{props.current_page}</h1>

            {/* Breadcrumb Section */}
            <div className="pl-4 pb-4 ml-4">
                <nav>
                    {
                        breadcrumbs.map((breadcrumb) => {
                            return (
                                <span key={breadcrumb.page}>
                                    <Link href={`${breadcrumb.link}`} className="text-primaryLink underline hover:no-underline">
                                        {breadcrumb.page}
                                    </Link> <span className="text-primaryText">{">"}</span>
                                </span>
                            )
                        })
                    } {
                        <span className="text-primaryText">{props.current_page}</span>
                    }
                </nav>
            </div>

            <hr className="text-primaryText" />
        </div>
    )
}