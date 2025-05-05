"use client";

import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";
import { cn } from "@/lib/utils";
import { ErrorBoundary } from "@/components/ui/error-boundary";

export interface BreadcrumbItem {
  label: string;
  labelEn?: string;
  href?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
  currentLanguage?: "zh" | "en";
  className?: string;
  showHome?: boolean;
}

export function Breadcrumb({
  items,
  currentLanguage = "zh",
  className,
  showHome = true,
}: BreadcrumbProps) {
  // Get label based on language
  const getLabel = (item: BreadcrumbItem) => {
    return currentLanguage === "en" && item.labelEn ? item.labelEn : item.label;
  };

  // Home item
  const homeItem: BreadcrumbItem = {
    label: "首页",
    labelEn: "Home",
    href: "/",
  };

  // All items including home if needed
  const allItems = showHome ? [homeItem, ...items] : items;

  return (
    <ErrorBoundary sectionName="Breadcrumb">
      <nav
        className={cn("flex items-center text-sm", className)}
        aria-label="Breadcrumb"
      >
        <ol className="flex items-center flex-wrap">
          {allItems.map((item, index) => {
            const isLast = index === allItems.length - 1;
            
            return (
              <li
                key={index}
                className={cn(
                  "flex items-center",
                  isLast ? "text-foreground font-medium" : "text-muted-foreground"
                )}
              >
                {index === 0 && showHome && (
                  <Home className="h-4 w-4 mr-1" />
                )}
                
                {item.href && !isLast ? (
                  <Link
                    href={item.href}
                    className="hover:text-primary transition-colors"
                  >
                    {getLabel(item)}
                  </Link>
                ) : (
                  <span>{getLabel(item)}</span>
                )}
                
                {!isLast && (
                  <ChevronRight className="h-4 w-4 mx-2 text-muted-foreground/50" />
                )}
              </li>
            );
          })}
        </ol>
      </nav>
    </ErrorBoundary>
  );
}
