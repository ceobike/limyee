"use client";

import React from "react";
import { NewsCard, NewsCardProps } from "./news-card";
import { DataLoader } from "@/components/ui/data-loader";
import { Pagination } from "@/components/ui/pagination";
import { cn } from "@/lib/utils";

interface NewsListProps {
  news: NewsCardProps[];
  isLoading: boolean;
  error: string | null;
  className?: string;
  columns?: 1 | 2 | 3 | 4;
  aspectRatio?: "square" | "video" | "auto";
  showPagination?: boolean;
  currentPage?: number;
  totalPages?: number;
  onPageChange?: (page: number) => void;
  variant?: "default" | "horizontal" | "minimal";
}

export function NewsList({
  news,
  isLoading,
  error,
  className,
  columns = 3,
  aspectRatio = "video",
  showPagination = false,
  currentPage = 1,
  totalPages = 1,
  onPageChange = () => {},
  variant = "default",
}: NewsListProps) {
  // Determine grid columns class
  const gridColumnsClass = {
    1: "grid-cols-1",
    2: "grid-cols-1 md:grid-cols-2",
    3: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
    4: "grid-cols-1 md:grid-cols-2 lg:grid-cols-4",
  }[columns];

  // For minimal variant, don't use grid
  const useGrid = variant !== "minimal";

  return (
    <div className={className}>
      <DataLoader
        isLoading={isLoading}
        error={error}
        data={news}
        emptyComponent={
          <div className="p-8 text-center">
            <h3 className="text-lg font-medium mb-2">No news found</h3>
            <p className="text-muted-foreground">
              Check back later for updates.
            </p>
          </div>
        }
      >
        {(loadedNews) => (
          <>
            {useGrid ? (
              <div className={cn("grid gap-6", gridColumnsClass)}>
                {loadedNews.map((newsItem) => (
                  <NewsCard
                    key={newsItem.id}
                    {...newsItem}
                    aspectRatio={aspectRatio}
                    variant={variant}
                  />
                ))}
              </div>
            ) : (
              <div className="space-y-0 divide-y">
                {loadedNews.map((newsItem) => (
                  <NewsCard
                    key={newsItem.id}
                    {...newsItem}
                    variant={variant}
                  />
                ))}
              </div>
            )}
            
            {showPagination && totalPages > 1 && (
              <div className="mt-8">
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={onPageChange}
                />
              </div>
            )}
          </>
        )}
      </DataLoader>
    </div>
  );
}
