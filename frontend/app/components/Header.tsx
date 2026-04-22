import Link from 'next/link';

export default function Header() {
    const link = "text-white underline hover:no-underline"

    return (
        <header className="p-4 bg-violet-800">
            <div className="flex items-center justify-between">
                <div>
                    <Link href="/" className="text-white text-xl font-semibold">
                        SaveFile
                    </Link>
                </div>

                <div className="flex justify-around">
                    <div>
                        <Link href="/search" className={`${link} mr-4`}>
                            Search
                        </Link>
                    </div>

                    <div>
                        <Link href="/about" className={`${link} ml-4 mr-4`}>
                            About
                        </Link>
                    </div>

                    <div>
                        <Link href="/contact" className={`${link} ml-4`}>
                            Contact
                        </Link>
                    </div>
                </div>

                {/* Theme Select */}
                {/*<div>
                    <select>
                        <option value="default">Default</option>
                        <option value="blue">Blue</option>
                        <option value="green">Green</option>
                        <option value="red">Red</option>
                        <option value="pink">Pink</option>
                    </select>
                </div>*/}

                {/*<div className="flex justify-around">
                    <div className="flex justify-around">
                        <div>
                            <Link href="" className={`${link} mr-4`}>Log In</Link>
                        </div>

                        <div>
                            <Link href="" className={`${link} ml-4`}>Sign Up</Link>
                        </div>
                    </div>
                </div>*/}
            </div>
        </header>
    )
}