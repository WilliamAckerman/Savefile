import type Video from "@/app/lib/types/video";
import SectionHeader from "../_general/SectionHeader";

interface VideosTabProps {
    videos: Video[]
}

export default function VideosTab(props: VideosTabProps) {
    const videos = props.videos;

    return (
        <div className="w-full max-h-[80vh]">
            <SectionHeader
                title="Videos"
            />
            {/*<h1 className="text-white text-xl md:text-2xl lg:text-3xl">
                Videos
            </h1>*/}

            <p className="block">
                <strong>Warning:</strong> Videos may contain flashing lights.
            </p>

            {/* Formerly had flex flex-row and flex-wrap classes */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
                {
                    videos.map((video: Video) => {
                        return (
                            <div key={`V${video.IGDB_video_id}`} className="w-full p-4 flex flex-col mx-auto bg-secondaryBg"> {/* Formerly had md:w-1/2 and lg:w-1/3 classes */}
                                <iframe src={`https://youtube.com/embed/${video.video_id}`} allowFullScreen />

                                {/* Originally had mt-2, text-xl, md:text-2xl, and lg:text-3xl classes */}
                                <div className="w-auto p-1">
                                    <h2 className="text-base md:text-lg lg:text-xl font-normal">{video.title}</h2>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}