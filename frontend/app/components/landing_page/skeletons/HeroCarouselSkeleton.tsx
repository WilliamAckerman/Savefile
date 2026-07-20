"use client"

import {
    Carousel,
    CarouselContent,
    CarouselItem
} from '@/app/components/EmblaCarousel';

import HeroCarouselSkeletonSlide from './HeroCarouselSkeletonSlide';

export default function HeroCarouselSkeleton() {
    return (
        <div
            className="mt-2 mb-2"
        >
            <Carousel
                opts={{
                    align: 'start',
                    loop: true
                }}
                orientation="horizontal"
            >
                <CarouselContent>
                    <HeroCarouselSkeletonSlide />
                    <HeroCarouselSkeletonSlide />
                    <HeroCarouselSkeletonSlide />
                    <HeroCarouselSkeletonSlide />
                    <HeroCarouselSkeletonSlide />
                    <HeroCarouselSkeletonSlide />
                    <HeroCarouselSkeletonSlide />
                    <HeroCarouselSkeletonSlide />
                    <HeroCarouselSkeletonSlide />
                    <HeroCarouselSkeletonSlide />
                </CarouselContent>
            </Carousel>
        </div>
    )
}