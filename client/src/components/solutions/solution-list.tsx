"use client";

import React from "react";
import { SolutionCard, SolutionCardProps } from "./solution-card";
import { DataLoader } from "@/components/ui/data-loader";
import { Pagination } from "@/components/ui/pagination";
import { cn } from "@/lib/utils";

interface SolutionListProps {
  solutions: SolutionCardProps[];
  isLoading: boolean;
  error: string | null;
  className?: string;
  columns?: 1 | 2 | 3 | 4;
  aspectRatio?: "square" | "video" | "auto";
  showPagination?: boolean;
  currentPage?: number;
  totalPages?: number;
  onPageChange?: (page: number) => void;
}

export function SolutionList({
  solutions,
  isLoading,
  error,
  className,
  columns = 3,
  aspectRatio = "video",
  showPagination = false,
  currentPage = 1,
  totalPages = 1,
  onPageChange = () => {},
}: SolutionListProps) {
  // Determine grid columns class
  const gridColumnsClass = {
    1: "grid-cols-1",
    2: "grid-cols-1 md:grid-cols-2",
    3: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
    4: "grid-cols-1 md:grid-cols-2 lg:grid-cols-4",
  }[columns];

  return (
    <div className={className}>
      <DataLoader
        isLoading={isLoading}
        error={error}
        data={solutions}
        emptyComponent={
          <div className="p-8 text-center">
            <h3 className="text-lg font-medium mb-2">No solutions found</h3>
            <p className="text-muted-foreground">
              Try adjusting your search or filter criteria.
            </p>
          </div>
        }
      >
        {(loadedSolutions) => (
          <>
            <div className={cn("grid gap-6", gridColumnsClass)}>
              {loadedSolutions.map((solution) => (
                <SolutionCard
                  key={solution.id}
                  {...solution}
                  aspectRatio={aspectRatio}
                />
              ))}
            </div>
            
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
