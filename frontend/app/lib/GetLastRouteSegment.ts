"use client"
import { usePathname } from 'next/navigation';

export default function GetLastRouteSegment() {
    const pathname = usePathname();
    const pathArray = pathname.split('/')
    const segment = pathArray[pathArray.length - 1]
    return segment
}