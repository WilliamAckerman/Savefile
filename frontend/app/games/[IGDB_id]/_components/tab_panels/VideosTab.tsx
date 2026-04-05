import type Video from "@/app/lib/types/video";

interface VideosTabProps {
    videos: Video[]
}

export default function VideosTab(props: VideosTabProps) {
    const videos = props.videos;

    return (
        <div className="w-full">
            <h1 className="text-white text-xl md:text-2xl lg:text-3xl">
                Videos
            </h1>

            <p className="block text-white">
                <strong>Warning:</strong> Videos may contain flashing lights.
            </p>

            <div className="flex flex-row flex-wrap p-4">
                {
                    videos.map((video: Video) => {
                        return (
                            <div key={`V${video.IGDB_video_id}`} className="w-full md:w-1/2 lg:w-1/3 p-4 flex items-center flex-col mx-auto">
                                <iframe src={`https://youtube.com/embed/${video.video_id}`} allowFullScreen />
                                <h2 className="mt-2 text-white text-xl md:text-2xl lg:text-3xl font-normal">{video.title}</h2>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}