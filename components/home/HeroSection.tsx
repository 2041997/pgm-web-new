"use client";
import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import useEmblaCarousel from 'embla-carousel-react';

export type HeroSlide = {
  id: string | number;
  title: string;
  subtitle?: string;
  ctaLabel?: string;
  image: string;
};

const defaultSlides: HeroSlide[] = [
  {
    id: 1,
    title: `Don't miss amazing\n grocery deals`,
    subtitle: "Sign up for the daily newsletter",
    ctaLabel: "Subscribe",
    image:
      "https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
  },
  {
    id: 2,
    title: `Fresh fruits &\nvegetables every day`,
    subtitle: "Locally sourced & packed",
    ctaLabel: "Shop Now",
    image:
      "https://images.unsplash.com/photo-1542838132-92c53300491e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
  },
  {
    id: 3,
    title: `Daily discounts on\n essentials`,
    subtitle: "Save more with our deals",
    ctaLabel: "See Deals",
    image:
      "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
  },
];

export default function HeroSection({
  slides = defaultSlides,
  backgroundImage,
}: {
  slides?: HeroSlide[]
  backgroundImage?: any
}) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);
  
  const scrollPrev = React.useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = React.useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const scrollTo = React.useCallback((index: number) => {
    if (emblaApi) emblaApi.scrollTo(index);
  }, [emblaApi]);

  const onSelect = React.useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    setScrollSnaps(emblaApi.scrollSnapList());
    emblaApi.on('select', onSelect);
    emblaApi.on('reInit', onSelect);
    
    // Auto-play functionality
    const interval = setInterval(() => {
      if (emblaApi) {
        emblaApi.scrollNext();
      }
    }, 6000);
    
    return () => {
      emblaApi.off('select', onSelect);
      emblaApi.off('reInit', onSelect);
      clearInterval(interval);
    };
  }, [emblaApi, onSelect]);

  const bgStyle: React.CSSProperties | undefined = backgroundImage
    ? {
        backgroundImage: `url(${typeof backgroundImage === "string" ? backgroundImage : backgroundImage.src})`,
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'right center',
        backgroundSize: 'cover',
    }
    : undefined;

  return (
    <section className="relative max-w-full bg-white mx-auto px-4 py-4 md:px-8">
      <div
        className="relative rounded-2xl"
        style={{
          ...bgStyle,
          backgroundColor: "rgba(0, 128, 128, 0.15)",
          backgroundBlendMode: "overlay",
        }}
      >
        <div className="embla" ref={emblaRef}>
          <div className="embla__container">
            {slides.map((slide, index) => (
              <div className="embla__slide" key={slide.id}>
                <div className="w-full py-12 md:py-20 px-4 md:px-10">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
                    {/* Left: Text & Search */}
                    <div className="space-y-8 md:pr-10">
                      <h2 className="text-4xl md:text-6xl font-extrabold text-gray-900 leading-tight whitespace-pre-line drop-shadow-lg">
                        {slide.title}
                      </h2>
                      {slide.subtitle && (
                        <p className="text-lg md:text-xl text-gray-700 font-medium">
                          {slide.subtitle}
                        </p>
                      )}

                      {/* Search bar with button */}
                      <div className="mt-8 flex flex-col sm:flex-row items-stretch gap-4 w-auto xl:max-w-xl">
                        <div className="flex flex-1 items-center bg-white rounded-full px-5 py-2 shadow-lg border border-gray-200 focus-within:ring-2 focus-within:ring-blue-500 transition">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5 text-blue-500 mr-3"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                          >
                            <circle cx="11" cy="11" r="8" strokeWidth={2} />
                            <line x1="21" y1="21" x2="16.65" y2="16.65" strokeWidth={2} />
                          </svg>
                          <input
                            className="flex-1 outline-none text-base bg-transparent"
                            placeholder="Search for groceries, deals, or fruits..."
                            aria-label="Search"
                          />
                        </div>
                        <button className="bg-blue-600 text-white px-6 py-2 rounded-full shadow-lg font-semibold hover:bg-blue-700 transition-colors ml-3">
                          {slide.ctaLabel ?? "Search"}
                        </button>
                      </div>
                    </div>

                    {/* Right: Image */}
                    <div className="relative h-64 md:h-[28rem] rounded-xl overflow-hidden shadow-xl border-4 border-gray-200">
                      <Image
                        src={slide.image}
                        alt="hero"
                        fill
                        sizes="(max-width: 768px) 100vw, 50vw"
                        className="object-cover object-center scale-105 transition-transform duration-500"
                        priority={index === 0}
                      />
                      {/* Decorative overlay */}
                      <div className="absolute inset-0 bg-gray-100/60 pointer-events-none" />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Prev/Next buttons */}
        <button
          onClick={scrollPrev}
          aria-label="Previous"
          className="absolute left-4 top-1/2 -translate-y-1/2 bg-white p-3 rounded-full shadow-md"
        >
          <ChevronLeftIcon className="h-5 w-5 text-slate-700" />
        </button>
        <button
          onClick={scrollNext}
          aria-label="Next"
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-white p-3 rounded-full shadow-md"
        >
          <ChevronRightIcon className="h-5 w-5 text-slate-700" />
        </button>

        {/* Indicators */}
        <div className="absolute left-1/2 z-10 bottom-8 transform -translate-x-1/2">
          <div className="flex items-center gap-3">
            {scrollSnaps.map((_, index) => (
              <button
                key={index}
                onClick={() => scrollTo(index)}
                className={`h-3 w-3 rounded-full ${
                  index === selectedIndex ? "bg-emerald-500" : "bg-slate-300"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>

      <div className="absolute left-1/2 bottom-0 transform -translate-x-1/2 text-black animate-bounce">
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 14l-7 7m0 0l-7-7m7 7V3"
          />
        </svg>
      </div>

      <style jsx global>{`
        .embla {
          overflow: hidden;
        }
        .embla__container {
          display: flex;
        }
        .embla__slide {
          flex: 0 0 100%;
          min-width: 0;
        }
      `}</style>
    </section>
  );
}