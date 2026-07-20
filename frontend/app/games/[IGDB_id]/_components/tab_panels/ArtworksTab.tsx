import './_styles/tabContent.css';
import Link from 'next/link';
import Image from 'next/image';

import type Artwork from '@/app/lib/types/artwork';
import type ArtworkType from '@/app/lib/types/artworkType';
import SectionHeader from '../_general/SectionHeader';

interface ArtworksTabProps {
    //artworks: Artwork[]
    artwork_types: ArtworkType[]
}

import ArtworksSection from '../_artworks/ArtworkSection';

export default function ArtworksTab(props: ArtworksTabProps) {
    //const artworks: Artwork[] = props.artworks;
    const artworks = props.artwork_types;

    return (
        <div className="w-full max-h-[80vh]">
            <SectionHeader
                title="Artworks"
            />

            {
                artworks.map((artwork) => {
                    return (
                        <div key={artwork.IGDB_artwork_type_id}>
                        <ArtworksSection
                            //id={artwork.IGDB_artwork_type_id}
                            type={artwork.name}
                            artworks={artwork.artworks}
                        />
                        </div>
                    )
                })
            }

            {/*<div className="flex flex-row flex-wrap p-4">
                {
                    artworks.map((artwork: Artwork) => {
                        const artworkUrl: string = `https:${artwork.url.replace("t_thumb", "t_cover_big_2x")}`;

                        return (
                            <div 
                                key={"A" + artwork.IGDB_artwork_id} 
                                className="w-full sm:w-1/2 lg:w-1/3 p-4 transition delay-150 duration-300 ease-in-out hover:scale-110"

                                //title={artwork.artwork_type.name ? artwork.artwork_type.name : "Unknown artwork"}
                            >
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
                                {/*
                                    artwork.artwork_type &&
                                    <h2 className="mt-2 text-xl md:text-2xl lg:text-3xl font-normal">{artwork.artwork_type.name}</h2>
                                */}{/*
                            </div>
                        )
                    })
                }
            </div>*/}
        </div>
    )
}