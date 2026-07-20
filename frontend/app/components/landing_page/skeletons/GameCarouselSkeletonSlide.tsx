import {
    CarouselItem
} from '@/app/components/EmblaCarousel';

export default function GameCarouselSkeletonSlide() {
    return (
        <CarouselItem
            className="
                basis-full
                sm:basis-1/2
                md:basis-1/3
                lg:basis-1/4
                xl:basis-1/6
                w-auto
            "
        >
            <div
                className="
                    h-auto
                    pt-2
                "
            >
                <div 
                    className="
                        bg-secondaryBg
                        min-h-[112px] 
                        sm:h-[280px]
                        md:h-[331px] 
                        xl:h-[270px]

                        animate-pulse
                    "
                >
                </div>
                <div className="bg-secondaryBg animate-pulse p-1">

                </div>
            </div>

            {/*<div 
            className="
                max-w-[100px]
                sm:max-w-[200px]
                w-auto
                md:w-1/2
                lg:w-1/4
                xl:w-1/6
                h-[250px]

                bg-black
                animate-pulse
            "
        >
        </div>*/}
        </CarouselItem>
    )
}