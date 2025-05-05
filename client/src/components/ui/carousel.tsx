"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface CarouselProps {
  children: React.ReactNode[];
  autoPlay?: boolean;
  interval?: number;
  showArrows?: boolean;
  showIndicators?: boolean;
  className?: string;
  slideClassName?: string;
  arrowClassName?: string;
  indicatorClassName?: string;
  activeIndicatorClassName?: string;
}

export function Carousel({
  children,
  autoPlay = true,
  interval = 5000,
  showArrows = true,
  showIndicators = true,
  className,
  slideClassName,
  arrowClassName,
  indicatorClassName,
  activeIndicatorClassName,
}: CarouselProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(autoPlay);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const slideCount = children.length;
  const carouselRef = useRef<HTMLDivElement>(null);

  // Go to next slide
  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % slideCount);
  }, [slideCount]);

  // Go to previous slide
  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + slideCount) % slideCount);
  }, [slideCount]);

  // Go to specific slide
  const goToSlide = useCallback((index: number) => {
    setCurrentSlide(index);
    // Pause autoplay briefly when manually changing slides
    setIsAutoPlaying(false);
    const timer = setTimeout(() => {
      setIsAutoPlaying(autoPlay);
    }, 5000);
    return () => clearTimeout(timer);
  }, [autoPlay]);

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
    
    const autoPlayTimer = setInterval(() => {
      nextSlide();
    }, interval);
    
    return () => clearInterval(autoPlayTimer);
  }, [isAutoPlaying, nextSlide, interval]);

  // Pause autoplay when window is not focused
  useEffect(() => {
    const handleVisibilityChange = () => {
      setIsAutoPlaying(!document.hidden && autoPlay);
    };
    
    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => document.removeEventListener("visibilitychange", handleVisibilityChange);
  }, [autoPlay]);

  // Pause autoplay when hovering over carousel
  const handleMouseEnter = () => {
    setIsAutoPlaying(false);
  };

  const handleMouseLeave = () => {
    setIsAutoPlaying(autoPlay);
  };

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Only handle keyboard events when carousel is focused or one of its children is focused
      if (!carouselRef.current?.contains(document.activeElement)) return;
      
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
    <div 
      ref={carouselRef}
      className={cn("relative overflow-hidden", className)}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      aria-roledescription="carousel"
      aria-label="Image carousel"
      tabIndex={0}
    >
      <div 
        className="relative w-full h-full"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
      >
        {React.Children.map(children, (child, index) => (
          <div
            key={index}
            className={cn(
              "absolute inset-0 transition-opacity duration-1000",
              index === currentSlide ? "opacity-100 z-10" : "opacity-0 z-0",
              slideClassName
            )}
            role="group"
            aria-roledescription="slide"
            aria-label={`${index + 1} of ${slideCount}`}
            aria-hidden={index !== currentSlide}
          >
            {child}
          </div>
        ))}
      </div>

      {/* Navigation arrows */}
      {showArrows && slideCount > 1 && (
        <>
          <button
            onClick={prevSlide}
            className={cn(
              "absolute left-4 top-1/2 z-30 -translate-y-1/2 h-10 w-10 rounded-full bg-background/30 backdrop-blur-sm flex items-center justify-center text-white hover:bg-background/50 focus:outline-none focus:ring-2 focus:ring-primary",
              arrowClassName
            )}
            aria-label="Previous slide"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
          <button
            onClick={nextSlide}
            className={cn(
              "absolute right-4 top-1/2 z-30 -translate-y-1/2 h-10 w-10 rounded-full bg-background/30 backdrop-blur-sm flex items-center justify-center text-white hover:bg-background/50 focus:outline-none focus:ring-2 focus:ring-primary",
              arrowClassName
            )}
            aria-label="Next slide"
          >
            <ChevronRight className="h-6 w-6" />
          </button>
        </>
      )}

      {/* Slide indicators */}
      {showIndicators && slideCount > 1 && (
        <div className="absolute bottom-4 left-0 right-0 z-30 flex justify-center gap-2">
          {Array.from({ length: slideCount }).map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={cn(
                "h-2 w-2 rounded-full transition-all focus:outline-none focus:ring-2 focus:ring-primary",
                index === currentSlide
                  ? cn("bg-white w-6", activeIndicatorClassName)
                  : cn("bg-white/50 hover:bg-white/80", indicatorClassName)
              )}
              aria-label={`Go to slide ${index + 1}`}
              aria-current={index === currentSlide ? "true" : "false"}
            />
          ))}
        </div>
      )}
    </div>
  );
}
