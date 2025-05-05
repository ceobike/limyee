"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

export interface SolutionCardProps {
  id: number;
  title: string;
  description?: string;
  imageUrl: string;
  className?: string;
  imageClassName?: string;
  aspectRatio?: "square" | "video" | "auto";
  showArrow?: boolean;
}

export function SolutionCard({
  id,
  title,
  description,
  imageUrl,
  className,
  imageClassName,
  aspectRatio = "video",
  showArrow = true,
}: SolutionCardProps) {
  // Determine aspect ratio class
  const aspectRatioClass = {
    square: "aspect-square",
    video: "aspect-video",
    auto: "aspect-auto",
  }[aspectRatio];

  return (
    <Link href={getSolutionUrl(id)}>
      <div
        className={cn(
          "group rounded-lg border bg-card shadow-sm hover:shadow-md transition-all overflow-hidden flex flex-col h-full",
          className
        )}
      >
        <div className={cn("relative overflow-hidden", aspectRatioClass, imageClassName)}>
          {/* Fallback image if the provided URL is invalid */}
          <div className="absolute inset-0 bg-muted/20 flex items-center justify-center">
            <span className="text-muted-foreground text-sm">{title}</span>
          </div>
          
          {/* Actual image */}
          <Image
            src={imageUrl}
            alt={title}
            fill
            className="object-cover transition-transform group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            onError={(e) => {
              // Hide the image on error, showing the fallback
              (e.target as HTMLImageElement).style.display = 'none';
            }}
          />
          
          {/* Overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-70 group-hover:opacity-80 transition-opacity" />
          
          {/* Title overlay */}
          <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
            <h3 className="text-lg font-semibold mb-1 group-hover:text-primary-foreground transition-colors">
              {title}
            </h3>
            
            {description && (
              <p className="text-sm text-white/80 line-clamp-2 group-hover:text-white transition-colors">
                {description}
              </p>
            )}
            
            {showArrow && (
              <div className="mt-2 flex items-center">
                <span className="text-white group-hover:translate-x-1 transition-transform">
                  <ArrowRight className="h-5 w-5" />
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}
