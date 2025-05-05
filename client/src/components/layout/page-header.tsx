"use client";

import { cn } from "@/lib/utils";
import { ErrorBoundary } from "@/components/ui/error-boundary";
import { Breadcrumb, BreadcrumbItem } from "./breadcrumb";

interface PageHeaderProps {
  title: string;
  titleEn?: string;
  description?: string;
  descriptionEn?: string;
  breadcrumbItems?: BreadcrumbItem[];
  currentLanguage?: "zh" | "en";
  className?: string;
  backgroundImage?: string;
  children?: React.ReactNode;
}

export function PageHeader({
  title,
  titleEn,
  description,
  descriptionEn,
  breadcrumbItems = [],
  currentLanguage = "zh",
  className,
  backgroundImage,
  children,
}: PageHeaderProps) {
  // Get text based on language
  const getTitle = () => {
    return currentLanguage === "en" && titleEn ? titleEn : title;
  };

  const getDescription = () => {
    if (!description) return "";
    return currentLanguage === "en" && descriptionEn ? descriptionEn : description;
  };

  // Background style
  const backgroundStyle = backgroundImage
    ? {
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }
    : {};

  // Text color based on background
  const textColorClass = backgroundImage
    ? "text-white"
    : "text-foreground";

  return (
    <ErrorBoundary sectionName="PageHeader">
      <div
        className={cn(
          "py-8 md:py-12",
          backgroundImage ? "bg-muted" : "bg-muted/30",
          className
        )}
        style={backgroundStyle}
      >
        <div className="container mx-auto px-4">
          {breadcrumbItems.length > 0 && (
            <div className="mb-4">
              <Breadcrumb
                items={breadcrumbItems}
                currentLanguage={currentLanguage}
                className={backgroundImage ? "text-white/80" : ""}
              />
            </div>
          )}
          
          <h1 className={cn("text-3xl md:text-4xl font-bold", textColorClass)}>
            {getTitle()}
          </h1>
          
          {description && (
            <p className={cn("mt-4 text-lg", backgroundImage ? "text-white/80" : "text-muted-foreground")}>
              {getDescription()}
            </p>
          )}
          
          {children && <div className="mt-6">{children}</div>}
        </div>
      </div>
    </ErrorBoundary>
  );
}
