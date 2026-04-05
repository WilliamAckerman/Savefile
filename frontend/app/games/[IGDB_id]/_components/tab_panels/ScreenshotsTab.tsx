import './_styles/tabContent.css';
import Link from 'next/link';
import Image from 'next/image';

import type Screenshot from '@/app/lib/types/screenshot';

interface ScreenshotsTabProps {
    screenshots: Screenshot[]
}

export default function ScreenshotsTab(props: ScreenshotsTabProps) {
    const screenshots: Screenshot[] = props.screenshots;

    return (
        <div>
            <h1 className="text-white h1">
                Screenshots
            </h1>

            <div className="flex flex-row flex-wrap p-4">
                {
                    screenshots &&
                    screenshots.map((screenshot: Screenshot) => {
                        const screenshotUrl: string = `https:${screenshot.url.replace("t_thumb", "t_cover_big_2x")}`;

                        return (
                            <div key={"S" + screenshot.IGDB_screenshot_id} className="w-full sm:w-1/2 lg:w-1/3 p-4 transition delay-150 duration-300 ease-in-out hover:scale-110">
                                <Link
                                    href={screenshotUrl}
                                    target="_blank"
                                    rel="noreferrer"
                                >
                                    <Image
                                        key={screenshot.IGDB_screenshot_id}
                                        src={screenshotUrl}
                                        alt={`Screenshot with URL of ${screenshotUrl}`}
                                        width={screenshot.width}
                                        height={screenshot.height}
                                    />
                                </Link>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}