"use client";

import { useState } from "react";
import Link from "next/link";

export function SafeBanner() {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  const slides = [
    {
      title: "Welcome to MyEE",
      description: "Enterprise solutions for modern businesses",
      ctaLink: { href: "/solutions", label: "Explore Solutions" },
      bgColor: "bg-primary/10",
    },
    {
      title: "Robust Error Handling",
      description: "Our pages continue to work even when components fail",
      ctaLink: { href: "/about", label: "Learn More" },
      bgColor: "bg-secondary/20",
    },
  ];
  
  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };
  
  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };
  
  return (
    <section className="relative overflow-hidden">
      <div className="relative h-[300px] sm:h-[400px] w-full">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-500 ${
              index === currentSlide ? "opacity-100 z-10" : "opacity-0 z-0"
            } ${slide.bgColor}`}
          >
            <div className="container h-full flex items-center">
              <div className="max-w-xl">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  {slide.title}
                </h2>
                <p className="text-lg md:text-xl mb-6 text-muted-foreground">
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
        ))}
      </div>

      {/* Navigation buttons */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 z-20 -translate-y-1/2 h-10 w-10 rounded-full bg-background/50 flex items-center justify-center hover:bg-background/70 transition-colors"
        aria-label="Previous slide"
      >
        ←
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 z-20 -translate-y-1/2 h-10 w-10 rounded-full bg-background/50 flex items-center justify-center hover:bg-background/70 transition-colors"
        aria-label="Next slide"
      >
        →
      </button>

      {/* Indicators */}
      <div className="absolute bottom-4 left-0 right-0 z-20 flex justify-center gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`h-2 rounded-full transition-all ${
              index === currentSlide ? "w-8 bg-primary" : "w-2 bg-primary/50"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
