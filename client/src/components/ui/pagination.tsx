"use client";

import React from "react";
import { ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react";
import { cn } from "@/lib/utils";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  className?: string;
  showPageNumbers?: boolean;
  showFirstLastButtons?: boolean;
  maxPageButtons?: number;
}

export function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  className,
  showPageNumbers = true,
  showFirstLastButtons = false,
  maxPageButtons = 5,
}: PaginationProps) {
  // Don't render pagination if there's only one page
  if (totalPages <= 1) {
    return null;
  }

  // Generate page numbers to display
  const getPageNumbers = () => {
    const pageNumbers: (number | "ellipsis")[] = [];
    
    // If we have fewer pages than the max, show all pages
    if (totalPages <= maxPageButtons) {
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
      return pageNumbers;
    }
    
    // Always show first page
    pageNumbers.push(1);
    
    // Calculate start and end of page numbers around current page
    let start = Math.max(2, currentPage - Math.floor(maxPageButtons / 2));
    let end = Math.min(totalPages - 1, start + maxPageButtons - 3);
    
    // Adjust start if end is too close to totalPages
    if (end === totalPages - 1) {
      start = Math.max(2, end - (maxPageButtons - 3));
    }
    
    // Add ellipsis if needed before middle pages
    if (start > 2) {
      pageNumbers.push("ellipsis");
    }
    
    // Add middle pages
    for (let i = start; i <= end; i++) {
      pageNumbers.push(i);
    }
    
    // Add ellipsis if needed after middle pages
    if (end < totalPages - 1) {
      pageNumbers.push("ellipsis");
    }
    
    // Always show last page
    pageNumbers.push(totalPages);
    
    return pageNumbers;
  };

  return (
    <nav
      className={cn("flex items-center justify-center space-x-1", className)}
      aria-label="Pagination"
    >
      {/* Previous page button */}
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={cn(
          "inline-flex h-9 w-9 items-center justify-center rounded-md text-sm transition-colors",
          currentPage === 1
            ? "pointer-events-none text-muted-foreground"
            : "text-foreground hover:bg-muted"
        )}
        aria-label="Previous page"
      >
        <ChevronLeft className="h-4 w-4" />
      </button>

      {/* First page button */}
      {showFirstLastButtons && currentPage > 2 && (
        <button
          onClick={() => onPageChange(1)}
          className="inline-flex h-9 w-9 items-center justify-center rounded-md text-sm text-foreground transition-colors hover:bg-muted"
          aria-label="First page"
        >
          1
        </button>
      )}

      {/* Page numbers */}
      {showPageNumbers &&
        getPageNumbers().map((pageNumber, index) => {
          if (pageNumber === "ellipsis") {
            return (
              <span
                key={`ellipsis-${index}`}
                className="inline-flex h-9 w-9 items-center justify-center text-sm text-muted-foreground"
              >
                <MoreHorizontal className="h-4 w-4" />
              </span>
            );
          }

          return (
            <button
              key={pageNumber}
              onClick={() => onPageChange(pageNumber)}
              className={cn(
                "inline-flex h-9 w-9 items-center justify-center rounded-md text-sm transition-colors",
                pageNumber === currentPage
                  ? "bg-primary text-primary-foreground"
                  : "text-foreground hover:bg-muted"
              )}
              aria-label={`Page ${pageNumber}`}
              aria-current={pageNumber === currentPage ? "page" : undefined}
            >
              {pageNumber}
            </button>
          );
        })}

      {/* Last page button */}
      {showFirstLastButtons && currentPage < totalPages - 1 && (
        <button
          onClick={() => onPageChange(totalPages)}
          className="inline-flex h-9 w-9 items-center justify-center rounded-md text-sm text-foreground transition-colors hover:bg-muted"
          aria-label="Last page"
        >
          {totalPages}
        </button>
      )}

      {/* Next page button */}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={cn(
          "inline-flex h-9 w-9 items-center justify-center rounded-md text-sm transition-colors",
          currentPage === totalPages
            ? "pointer-events-none text-muted-foreground"
            : "text-foreground hover:bg-muted"
        )}
        aria-label="Next page"
      >
        <ChevronRight className="h-4 w-4" />
      </button>
    </nav>
  );
}
