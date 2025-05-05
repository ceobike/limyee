"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { BannerData } from "@/lib/types";
import { cn } from "@/lib/utils";

interface BannerProps {
  data: BannerData;
}

export function Banner({ data }: BannerProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(data.autoplay || false);
  const [touchStart, setTouchStart] = useState<number | null>(null);

  const slideCount = data.slides.length;

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % slideCount);
  }, [slideCount]);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + slideCount) % slideCount);
  }, [slideCount]);

  const goToSlide = useCallback((index: number) => {
    setCurrentSlide(index);
    // Pause autoplay briefly when manually changing slides
    setIsAutoPlaying(false);
    const timer = setTimeout(() => {
      setIsAutoPlaying(data.autoplay || false);
    }, 5000);
    return () => clearTimeout(timer);
  }, [data.autoplay]);

  // Handle touch events for swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.touches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (touchStart === null) return;
    
    const touchEnd = e.touches[0].clientX;
    const diff = touchStart - touchEnd;
    
    // If swipe is significant enough (more than 50px)
    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        // Swipe left, go to next slide
        nextSlide();
      } else {
        // Swipe right, go to previous slide
        prevSlide();
      }
      setTouchStart(null);
    }
  };

  // Autoplay functionality
  useEffect(() => {
    if (!isAutoPlaying) return;
    
    const interval = setInterval(() => {
      nextSlide();
    }, data.interval || 5000);
    
    return () => clearInterval(interval);
  }, [isAutoPlaying, nextSlide, data.interval]);

  // Pause autoplay when window is not focused
  useEffect(() => {
    const handleVisibilityChange = () => {
      setIsAutoPlaying(!document.hidden && (data.autoplay || false));
    };
    
    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => document.removeEventListener("visibilitychange", handleVisibilityChange);
  }, [data.autoplay]);

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        prevSlide();
      } else if (e.key === "ArrowRight") {
        nextSlide();
      }
    };
    
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [nextSlide, prevSlide]);

  return (
    <section 
      className="relative overflow-hidden bg-background"
      aria-roledescription="carousel"
      aria-label="Featured content"
    >
      <div 
        className="relative h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px] w-full"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
      >
        {data.slides.map((slide, index) => (
          <div
            key={slide.id}
            className={cn(
              "absolute inset-0 transition-opacity duration-1000",
              index === currentSlide ? "opacity-100 z-10" : "opacity-0 z-0"
            )}
            role="group"
            aria-roledescription="slide"
            aria-label={`${index + 1} of ${slideCount}`}
            aria-hidden={index !== currentSlide}
          >
            <div className="absolute inset-0 bg-black/40 z-10" />
            <Image
              src={slide.image.src}
              alt={slide.image.alt}
              fill
              className="object-cover"
              priority={index === 0}
              sizes="100vw"
            />
            <div className="absolute inset-0 z-20 flex items-center">
              <div className="container mx-auto px-4">
                <div className="max-w-xl text-white">
                  <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
                    {slide.title}
                  </h2>
                  <p className="text-lg md:text-xl mb-6 text-white/90">
                    {slide.description}
                  </p>
                  {slide.ctaLink && (
                    <Link
                      href={slide.ctaLink.href}
                      className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-6 py-2 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                    >
                      {slide.ctaLink.label}
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 z-30 -translate-y-1/2 h-10 w-10 rounded-full bg-background/30 backdrop-blur-sm flex items-center justify-center text-white hover:bg-background/50 focus:outline-none focus:ring-2 focus:ring-primary"
        aria-label="Previous slide"
      >
        <ChevronLeft className="h-6 w-6" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 z-30 -translate-y-1/2 h-10 w-10 rounded-full bg-background/30 backdrop-blur-sm flex items-center justify-center text-white hover:bg-background/50 focus:outline-none focus:ring-2 focus:ring-primary"
        aria-label="Next slide"
      >
        <ChevronRight className="h-6 w-6" />
      </button>

      {/* Slide indicators */}
      <div className="absolute bottom-4 left-0 right-0 z-30 flex justify-center gap-2">
        {data.slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={cn(
              "h-2 w-2 rounded-full transition-all focus:outline-none focus:ring-2 focus:ring-primary",
              index === currentSlide
                ? "bg-white w-6"
                : "bg-white/50 hover:bg-white/80"
            )}
            aria-label={`Go to slide ${index + 1}`}
            aria-current={index === currentSlide ? "true" : "false"}
          />
        ))}
      </div>
    </section>
  );
}
