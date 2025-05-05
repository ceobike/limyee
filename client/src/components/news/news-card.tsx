"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Calendar, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

export interface NewsCardProps {
  id: number;
  title: string;
  summary?: string;
  imageUrl?: string;
  publishDate: string;
  category?: string;
  className?: string;
  imageClassName?: string;
  aspectRatio?: "square" | "video" | "auto";
  showArrow?: boolean;
  variant?: "default" | "horizontal" | "minimal";
}

export function NewsCard({
  id,
  title,
  summary,
  imageUrl,
  publishDate,
  category,
  className,
  imageClassName,
  aspectRatio = "video",
  showArrow = true,
  variant = "default",
}: NewsCardProps) {
  // Format date
  const formattedDate = new Date(publishDate).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  // Determine aspect ratio class
  const aspectRatioClass = {
    square: "aspect-square",
    video: "aspect-video",
    auto: "aspect-auto",
  }[aspectRatio];

  // Render horizontal variant
  if (variant === "horizontal") {
    return (
      <Link href={getNewsUrl(id)}>
        <div
          className={cn(
            "group rounded-lg border bg-card shadow-sm hover:shadow-md transition-all overflow-hidden flex flex-row h-full",
            className
          )}
        >
          {imageUrl && (
            <div className={cn("relative w-1/3 overflow-hidden", imageClassName)}>
              <Image
                src={imageUrl}
                alt={title}
                fill
                className="object-cover transition-transform group-hover:scale-105"
                sizes="(max-width: 768px) 33vw, 25vw"
                onError={(e) => {
                  // Hide the image on error
                  (e.target as HTMLImageElement).style.display = 'none';
                }}
              />
            </div>
          )}
          
          <div className="p-4 flex flex-col flex-grow">
            <div className="flex items-center gap-2 mb-2">
              {category && (
                <span className="inline-flex items-center rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-semibold text-primary">
                  {category}
                </span>
              )}
              <time className="text-xs text-muted-foreground flex items-center gap-1" dateTime={publishDate}>
                <Calendar className="h-3 w-3" />
                {formattedDate}
              </time>
            </div>
            
            <h3 className="text-lg font-semibold mb-2 group-hover:text-primary transition-colors line-clamp-2">
              {title}
            </h3>
            
            {summary && (
              <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                {summary}
              </p>
            )}
            
            {showArrow && (
              <div className="mt-auto pt-2 flex justify-end">
                <span className="text-primary group-hover:translate-x-1 transition-transform">
                  <ArrowRight className="h-5 w-5" />
                </span>
              </div>
            )}
          </div>
        </div>
      </Link>
    );
  }

  // Render minimal variant
  if (variant === "minimal") {
    return (
      <Link href={getNewsUrl(id)}>
        <div
          className={cn(
            "group py-3 border-b last:border-b-0",
            className
          )}
        >
          <div className="flex items-center gap-2 mb-1">
            {category && (
              <span className="inline-flex items-center rounded-full bg-primary/10 px-2 py-0.5 text-xs font-semibold text-primary">
                {category}
              </span>
            )}
            <time className="text-xs text-muted-foreground" dateTime={publishDate}>
              {formattedDate}
            </time>
          </div>
          
          <h3 className="text-base font-medium group-hover:text-primary transition-colors line-clamp-2">
            {title}
          </h3>
        </div>
      </Link>
    );
  }

  // Render default variant
  return (
    <Link href={getNewsUrl(id)}>
      <div
        className={cn(
          "group rounded-lg border bg-card shadow-sm hover:shadow-md transition-all overflow-hidden flex flex-col h-full",
          className
        )}
      >
        {imageUrl && (
          <div className={cn("relative overflow-hidden", aspectRatioClass, imageClassName)}>
            <Image
              src={imageUrl}
              alt={title}
              fill
              className="object-cover transition-transform group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              onError={(e) => {
                // Hide the image on error
                (e.target as HTMLImageElement).style.display = 'none';
              }}
            />
          </div>
        )}
        
        <div className="p-4 flex flex-col flex-grow">
          <div className="flex items-center gap-2 mb-2">
            {category && (
              <span className="inline-flex items-center rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-semibold text-primary">
                {category}
              </span>
            )}
            <time className="text-xs text-muted-foreground flex items-center gap-1" dateTime={publishDate}>
              <Calendar className="h-3 w-3" />
              {formattedDate}
            </time>
          </div>
          
          <h3 className="text-lg font-semibold mb-2 group-hover:text-primary transition-colors">
            {title}
          </h3>
          
          {summary && (
            <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
              {summary}
            </p>
          )}
          
          {showArrow && (
            <div className="mt-auto pt-2 flex justify-end">
              <span className="text-primary group-hover:translate-x-1 transition-transform">
                <ArrowRight className="h-5 w-5" />
              </span>
            </div>
          )}
        </div>
      </div>
    </Link>
  );
}
