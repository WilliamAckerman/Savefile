'use client';
import Link from 'next/link';

export default function Footer() {

    //const link = "text-blue-200 hover:text-blue-300 underline hover:no-underline"
    const link = "text-accentText underline hover:no-underline"; // Formerly had text-accentLink class

    return (
        <footer /*className="p-6 bg-violet-800"*/ 
            className="p-6 bg-accentBg text-accentText" 
            /*style={{ backgroundColor: 'var(--accentBg)', color: 'var(--accentText)' }}*/
        >
            <h2 className="text-center text-3xl mb-4">
                SaveFile
            </h2>

            <div className="flex justify-evenly mb-4 flex-col md:flex-row text-center md:text-left">
                <div className="mx-auto mb-4 md:mb-0">
                    <h3 className="text-2xl mb-2">Navigation</h3>
                    <hr className="mb-2" />

                    <ul className="list-disc list-inside list-none">
                        <li>
                            <Link className={`${link}`} href={"/about"}>About</Link>
                        </li>

                        <li>
                            <Link className={`${link}`} href={"/update_log"}>Update Log</Link>
                        </li>

                        <li>
                            <Link className={`${link}`} href={"/privacy_policy"}>Privacy Policy</Link>
                        </li>

                        <li>
                            <Link className={`${link}`} href={"/guidelines"}>Guidelines</Link>
                        </li>

                        <li>
                            <Link className={`${link}`} href={"/contact"}>Contact</Link>
                        </li>
                    </ul>
                </div>

                <div className="mx-auto">
                    <h3 className="text-2xl mb-2">My Socials</h3>
                    <hr className="mb-2" />

                    <ul className="list-disc list-inside list-none">
                        <li>
                            <Link href="https://www.linkedin.com/in/william-ackerman-6a4005290/" className={`${link}`} target="_blank" rel="noreferrer">
                                LinkedIn
                            </Link>
                        </li>

                        <li>
                            <Link href="https://github.com/WilliamAckerman" className={`${link}`} target="_blank" rel="noreferrer">
                                Github
                            </Link>
                        </li>

                        <li>
                            <Link href="https://william-ackerman-portfolio.vercel.app/" className={`${link}`} target="_blank" rel="noreferrer">
                                Portfolio
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>

            <p className="text-center mb-2">
                Please support IGDB at <Link className={`${link}`} href={"https://www.igdb.com/"} rel="noreferrer" target="_blank">
                igdb.com
                </Link>
            </p>

            <span className="block text-center">
                William Ackerman, 2026. All Rights Reserved.
            </span>
        </footer>
    )
}