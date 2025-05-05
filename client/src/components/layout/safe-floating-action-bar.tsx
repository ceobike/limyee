"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export function SafeFloatingActionBar() {
  const [showScrollTop, setShowScrollTop] = useState(false);
  
  // Show/hide scroll to top button based on scroll position
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  
  // Handle scroll to top
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  
  return (
    <div className="fixed right-4 bottom-4 z-40 flex flex-col gap-2">
      <Link
        href="/contact"
        className="h-10 w-10 rounded-full bg-primary text-primary-foreground shadow-md flex items-center justify-center hover:bg-primary/90 transition-colors"
        aria-label="Contact Us"
        title="Contact Us"
      >
        ✉️
      </Link>
      
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="h-10 w-10 rounded-full bg-primary text-primary-foreground shadow-md flex items-center justify-center hover:bg-primary/90 transition-colors"
          aria-label="Back to Top"
          title="Back to Top"
        >
          ↑
        </button>
      )}
    </div>
  );
}
