import {
    CarouselItem
} from '@/app/components/EmblaCarousel';

export default function HeroCarouselSkeletonSlide() {
    return (
        <CarouselItem
            className="max-w-[25vw] sm:max-w-[100%] basis-1/3 sm:basis-1/4 md:basis-1/4 lg:basis-1/6 xl:basis-1/8"
        >
            <div
                className="bg-primaryBg animate-pulse"
            ></div>
        </CarouselItem>
    )
}