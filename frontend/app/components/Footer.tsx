import Link from 'next/link';

export default function Footer() {

    const link = "text-blue-200 hover:text-blue-300 underline hover:no-underline"

    return (
        <footer className="p-6 bg-violet-800">
            <h2 className="text-center text-white text-3xl mb-4">
                SaveFile
            </h2>

            <div className="flex justify-evenly mb-4">
                <div className="text-white">
                    <h3 className="text-2xl">Links</h3>

                    <ul className="list-disc list-inside">
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

                <div className="text-white">
                    <h3 className="text-2xl">My Socials</h3>

                    <div>
                        <strong>LinkedIn:</strong> <Link href="https://www.linkedin.com/in/william-ackerman-6a4005290/" className={`${link}`} target="_blank" rel="noreferrer">
                        https://www.linkedin.com/in/william-ackerman-6a4005290/
                        </Link>
                    </div>

                    <div>
                        <strong>Github:</strong> <Link href="https://github.com/WilliamAckerman" className={`${link}`} target="_blank" rel="noreferrer">
                        https://github.com/WilliamAckerman
                        </Link>
                    </div>
                </div>
            </div>

            <p className="text-white text-center mb-2">
                Please support IGDB at <Link className={`${link}`} href={"https://www.igdb.com/"} rel="noreferrer" target="_blank">
                igdb.com
                </Link>
            </p>

            <span className="block text-white text-center">
                William Ackerman, 2026. All Rights Reserved.
            </span>
        </footer>
    )
}