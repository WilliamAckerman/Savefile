"use client"
import { Carousel } from '@mantine/carousel';
import GameCarouselSkeletonSlide from './GameCarouselSkeletonSlide';


export default function GameCarouselSkeleton() {
    return (
        <Carousel
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
        </Carousel>
    )
}