"use client"
//import { Carousel } from '@mantine/carousel';
import GameCarouselSkeletonSlide from './GameCarouselSkeletonSlide';

import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious
} from '@/app/components/EmblaCarousel';


export default function GameCarouselSkeleton() {
    return (
        <Carousel
            opts={{
                align: 'start'
            }}
            orientation="horizontal"
            className="mx-8 w-auto"
        >
            <CarouselContent>
                <GameCarouselSkeletonSlide />
                <GameCarouselSkeletonSlide />
                <GameCarouselSkeletonSlide />
                <GameCarouselSkeletonSlide />
                <GameCarouselSkeletonSlide />
                <GameCarouselSkeletonSlide />
                <GameCarouselSkeletonSlide />
                <GameCarouselSkeletonSlide />
                <GameCarouselSkeletonSlide />
                <GameCarouselSkeletonSlide />
                <GameCarouselSkeletonSlide />
                <GameCarouselSkeletonSlide />
            </CarouselContent>

            <div className="-left-8 bg-button m-1 animate-pulse"></div>

            <div className="-right-8 bg-button m-1 animate-pulse"></div>

            {/*<Carousel
            slideGap="md"
        >
            <Carousel.Slide
            >
                <GameCarouselSkeletonSlide />
            </Carousel.Slide>

            <Carousel.Slide
            >
                <GameCarouselSkeletonSlide />
            </Carousel.Slide>

            <Carousel.Slide
            >
                <GameCarouselSkeletonSlide />
            </Carousel.Slide>
        </Carousel>*/}
        </Carousel>
    )
}