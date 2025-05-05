"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

export interface ProductCardProps {
  id: number;
  model: string;
  name: string;
  shortDescription?: string;
  imageUrl: string;
  isNew?: boolean;
  isFeatured?: boolean;
  className?: string;
  imageClassName?: string;
  aspectRatio?: "square" | "video" | "auto";
  showArrow?: boolean;
}

export function ProductCard({
  id,
  model,
  name,
  shortDescription,
  imageUrl,
  isNew = false,
  isFeatured = false,
  className,
  imageClassName,
  aspectRatio = "video",
  showArrow = true,
}: ProductCardProps) {
  // Determine aspect ratio class
  const aspectRatioClass = {
    square: "aspect-square",
    video: "aspect-video",
    auto: "aspect-auto",
  }[aspectRatio];

  return (
    <Link href={getProductUrl(id)}>
      <div
        className={cn(
          "group rounded-lg border bg-card shadow-sm hover:shadow-md transition-all overflow-hidden flex flex-col h-full",
          className
        )}
      >
        <div className={cn("relative overflow-hidden", aspectRatioClass, imageClassName)}>
          {/* Fallback image if the provided URL is invalid */}
          <div className="absolute inset-0 bg-muted/20 flex items-center justify-center">
            <span className="text-muted-foreground text-sm">{model}</span>
          </div>
          
          {/* Actual image */}
          <Image
            src={imageUrl}
            alt={name}
            fill
            className="object-cover transition-transform group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            onError={(e) => {
              // Hide the image on error, showing the fallback
              (e.target as HTMLImageElement).style.display = 'none';
            }}
          />
          
          {/* Badges */}
          <div className="absolute top-2 left-2 flex flex-col gap-1">
            {isNew && (
              <span className="inline-flex items-center rounded-full bg-primary px-2.5 py-0.5 text-xs font-semibold text-primary-foreground">
                New
              </span>
            )}
            {isFeatured && (
              <span className="inline-flex items-center rounded-full bg-secondary px-2.5 py-0.5 text-xs font-semibold text-secondary-foreground">
                Featured
              </span>
            )}
          </div>
        </div>
        
        <div className="p-4 flex flex-col flex-grow">
          <div className="text-sm text-muted-foreground mb-1">{model}</div>
          <h3 className="text-lg font-semibold mb-2 group-hover:text-primary transition-colors">
            {name}
          </h3>
          
          {shortDescription && (
            <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
              {shortDescription}
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
