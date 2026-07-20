"use client"
import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import { useState, useEffect } from 'react';

import { useTheme } from 'next-themes';
import { usePathname } from 'next/navigation';

const checkIfActive = (pathname: string, page: string) => {
    return pathname == page ? "text-active" : "";
}

export default function Header() {
    const link = "text-accentText hover:underline hover:underline-offset-8 hover:decoration-4 font-semibold uppercase"

    const [menuOpen, setMenuOpen] = useState(false);

    const { theme, setTheme } = useTheme();
    const pathname = usePathname();
    //console.log(pathname)

    /*const [mounted, setMounted] = useState(false);
    useEffect(() => {
        setMounted(true)
    , []})*/

    //console.log(`Theme: ${theme}`)

    return (
        <header 
            className="p-4 motion-reduce:transition-none ease-in-out duration-300 bg-accentBg text-accentText" 
        >
            <div className="flex items-center justify-between">
                <div>
                    <Link href="/" className="text-xl font-semibold">
                        SaveFile
                    </Link>
                </div>

                <div className="flex flex-row justify-around hidden lg:block">
                    <div className="inline">
                        <Link href="/search" className={`${link} mr-4 ${checkIfActive(pathname, "/search")}`}>
                            Search
                        </Link>
                    </div>

                    <div className="inline">
                        <Link href="/about" className={`${link} ml-4 mr-4 ${checkIfActive(pathname, "/about")}`}>
                            About
                        </Link>
                    </div>

                    <div className="inline">
                        <Link href="/contact" className={`${link} ml-4 mr-4 ${checkIfActive(pathname, "/contact")}`}>
                            Contact
                        </Link>
                    </div>

                    <div className="inline">
                        <Link href="/update_log" className={`${link} ml-4 ${checkIfActive(pathname, "/update_log")}`}>
                            Update Log
                        </Link>
                    </div>
                </div>

                {/* Theme Select */}
                <div className="flex items-center">
                    { //mounted ?
                    <>
                    <div>
                        <label htmlFor="theme">Theme:</label> <select 
                            className="cursor-pointer mr-2 lg:mr-0 border-solid rounded-sm p-1 bg-formFieldBg text-formFieldText"
                            onChange={(e) => setTheme(e.target.value)}
                            id="theme"
                            value={theme}
                        >
                            <option value="default">Default</option>
                            {/*<option value="dark">Dark</option>*/}
                            <option value="light">Light</option>
                            <option value="blue">Blue</option>
                            <option value="green">Green</option>
                            <option value="red">Red</option>
                            <option value="pink">Pink</option>
                        </select>
                    </div>

                    {/* This button is used to allow the user to remove their theme preference from local storage */}
                    <button 
                        type="button"
                        className="bg-resetButton hover:bg-resetButtonDarkened text-resetButtonText p-1 rounded-sm cursor-pointer ml-2"
                        onClick={() => {
                            setTheme('default')
                            localStorage.removeItem('theme')
                        }}
                    >
                        Reset Theme {/*localStorage.getItem('theme') ? 'Theme found' : "Theme not found"*/}
                    </button>
                    </>
                    /*:
                    <span>Loading...</span>*/
                    }

                    <div className="lg:hidden ml-2">
                        {
                            menuOpen ?
                            <X onClick={() => setMenuOpen(!menuOpen)} className="cursor-pointer" />
                            :
                            <Menu onClick={() => setMenuOpen(!menuOpen)} className="cursor-pointer" />
                        }
                    </div>
                </div>

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

            {
                menuOpen &&
                <div className="lg:hidden mt-2">
                    <ul className="list-none text-accentText">

                        {/* Formerly had hover:bg-violet-900 class */}
                        <li className="block">
                            <Link href="/search" className="block hover:bg-accentBgDarkened p-2 cursor-pointer uppercase font-semibold">
                                Search
                            </Link>
                        </li>
                        <li className="block">
                            <Link href="/about" className="block hover:bg-accentBgDarkened p-2 cursor-pointer uppercase font-semibold">
                                About
                            </Link>
                        </li>
                        <li className="block">
                            <Link href="/contact" className="block hover:bg-accentBgDarkened p-2 cursor-pointer uppercase font-semibold">
                                Contact
                            </Link>
                        </li>
                        <li className="block">
                            <Link href="/update_log" className="block hover:bg-accentBgDarkened p-2 cursor-pointer uppercase font-semibold">
                                Update Log
                            </Link>
                        </li>
                    </ul>
                </div>
            }
        </header>
    )
}