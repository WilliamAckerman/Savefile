import Link from 'next/link';
import { X } from 'lucide-react';

export default function MobileMenu() {
    return (
        <div className="p-4 bg-accentBg text-accentText h-dvh overflow-hidden">
            <div className="flex items-center justify-between">
                <div>
                    <Link href="/" className="text-xl font-semibold">
                        SaveFile
                    </Link>

                    <hr />
                </div>
            </div>
        </div>
    )
}