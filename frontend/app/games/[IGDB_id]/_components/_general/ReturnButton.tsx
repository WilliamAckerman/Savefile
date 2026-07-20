import Link from 'next/link';
import { House, Search } from 'lucide-react';

interface ReturnButtonProps {
    link: string
    text: string
    icon?: string
}

export default function ReturnButton(props: ReturnButtonProps) {
    return (
        <div className="text-white mt-2 mb-2"> {/* Formerly had text-white class */}
            <Link className="ml-4 mb-2 mt-2" href={`${props.link}`}>
                <button
                    type="button"

                    // Formerly had bg-blue-500 and hover:bg-blue-600 class
                    // bg-buttonDarkened class for darker button
                    className="bg-accentBg text-accentText rounded-sm shadow-sm p-1 cursor-pointer hover:scale-110 transition"
                >
                    <span>
                        {
                            props.icon == "search" ?
                            <Search className="inline-block" /> : <House className="inline-block" />
                        } {props.text}
                    </span>
                </button>
            </Link>
        </div>
    )
}