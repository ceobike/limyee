"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Mail, PresentationScreen, ArrowUp } from "lucide-react";
import { FloatingActionBarData } from "@/lib/types";
import { cn } from "@/lib/utils";

interface FloatingActionBarProps {
  data: FloatingActionBarData;
}

export function FloatingActionBar({ data }: FloatingActionBarProps) {
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [showDemoModal, setShowDemoModal] = useState(false);

  // Get icon component based on icon name
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case "mail":
        return <Mail className="h-5 w-5" />;
      case "presentation":
        return <PresentationScreen className="h-5 w-5" />;
      case "arrow-up":
        return <ArrowUp className="h-5 w-5" />;
      default:
        return null;
    }
  };

  // Handle scroll to top
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // Handle action click
  const handleActionClick = (action: string, target?: string) => {
    if (action === "scroll" && target === "top") {
      scrollToTop();
    } else if (action === "modal" && target === "demo-modal") {
      setShowDemoModal(true);
    }
  };

  // Show/hide scroll to top button based on scroll position
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <div className="fixed right-4 bottom-4 z-40 flex flex-col gap-2">
        {data.actions.map((action) => {
          // For scroll to top button, only show when scrolled down
          if (action.action === "scroll" && action.target === "top" && !showScrollTop) {
            return null;
          }

          // For link actions, render a Link
          if (action.action === "link" && action.target) {
            return (
              <Link
                key={action.id}
                href={action.target}
                className="h-10 w-10 rounded-full bg-primary text-primary-foreground shadow-md flex items-center justify-center hover:bg-primary/90 transition-colors"
                aria-label={action.label}
                title={action.label}
              >
                {getIcon(action.icon)}
              </Link>
            );
          }

          // For other actions (modal, scroll), render a button
          return (
            <button
              key={action.id}
              onClick={() => handleActionClick(action.action, action.target)}
              className="h-10 w-10 rounded-full bg-primary text-primary-foreground shadow-md flex items-center justify-center hover:bg-primary/90 transition-colors"
              aria-label={action.label}
              title={action.label}
            >
              {getIcon(action.icon)}
            </button>
          );
        })}
      </div>

      {/* Demo Request Modal */}
      {showDemoModal && (
        <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-card rounded-lg shadow-lg max-w-md w-full p-6 border">
            <h3 className="text-xl font-semibold mb-4">Request a Demo</h3>
            <p className="text-muted-foreground mb-4">
              Fill out the form below to request a personalized demo of our products.
            </p>
            
            <form className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-1">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="Your name"
                />
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-1">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="your.email@example.com"
                />
              </div>
              
              <div>
                <label htmlFor="company" className="block text-sm font-medium mb-1">
                  Company
                </label>
                <input
                  type="text"
                  id="company"
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="Your company"
                />
              </div>
              
              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowDemoModal(false)}
                  className="px-4 py-2 border rounded-md hover:bg-muted transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
                >
                  Submit Request
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
