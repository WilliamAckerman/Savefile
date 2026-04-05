import './_styles/tabContent.css';
import Link from 'next/link';
import Image from 'next/image';

import type Artwork from '@/app/lib/types/artwork';

interface ArtworksTabProps {
    artworks: Artwork[]
}

export default function ArtworksTab(props: ArtworksTabProps) {
    const artworks: Artwork[] = props.artworks;

    return (
        <div>
            <h1 className="text-white h1">
                Artworks
            </h1>

            <div className="flex flex-row flex-wrap p-4">
                {
                    artworks.map((artwork: Artwork) => {
                        const artworkUrl: string = `https:${artwork.url.replace("t_thumb", "t_cover_big_2x")}`;

                        return (
                            <div key={"A" + artwork.IGDB_artwork_id} className="w-full sm:w-1/2 lg:w-1/3 p-4 transition delay-150 duration-300 ease-in-out hover:scale-110">
                                <Link
                                    href={artworkUrl}
                                    target="_blank"
                                    rel="noreferrer"
                                >
                                    <Image
                                        src={artworkUrl}
                                        alt={`Artwork with url of ${artworkUrl}`}
                                        width={artwork.width}
                                        height={artwork.height}
                                        loading="lazy"
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