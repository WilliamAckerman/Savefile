import Link from 'next/link'
import '@/app/styles/General.css';

import type Breadcrumb from '../lib/types/breadcrumb'
import {
    Breadcrumb as BreadcrumbComponent,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator
} from "@/components/ui/breadcrumb";

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
            <BreadcrumbComponent className="pl-4 pb-4 ml-4">
                <BreadcrumbList>
                    {
                        breadcrumbs.map((breadcrumb) => {
                            return (
                                <BreadcrumbItem key={breadcrumb.page}>
                                    <BreadcrumbLink href={`${breadcrumb.link}`} className="text-primaryLink underline hover:no-underline hover:text-primaryLink">
                                        {breadcrumb.page}
                                    </BreadcrumbLink>
                                </BreadcrumbItem>
                            )
                        })
                    } 
                    <BreadcrumbSeparator className="text-primaryText">{">"}</BreadcrumbSeparator>
                    {
                        <BreadcrumbItem>
                            <BreadcrumbPage className="text-primaryText">
                                {props.current_page}
                            </BreadcrumbPage>
                        </BreadcrumbItem>
                    }
                </BreadcrumbList>
            </BreadcrumbComponent>

            <hr className="text-primaryText" />
        </div>
    )
}