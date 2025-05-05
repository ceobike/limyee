"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { PageHeader } from "@/components/layout/page-header";
import { SolutionList } from "@/components/solutions/solution-list";
import { ErrorBoundary } from "@/components/ui/error-boundary";
import { api, endpoints } from "@/lib/api";
import { SolutionCardProps } from "@/components/solutions/solution-card";
import { getSolutionUrl } from "@/lib/url-utils";

export default function SolutionsPage() {
  const searchParams = useSearchParams();
  const categoryId = searchParams.get("category");
  const search = searchParams.get("search");
  
  const [solutions, setSolutions] = useState<SolutionCardProps[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [categoryName, setCategoryName] = useState<string | null>(null);

  // In a real application, we would fetch from API
  // For now, we'll use mock data
  useEffect(() => {
    const fetchSolutions = async () => {
      setIsLoading(true);
      setError(null);
      
      try {
        // Mock data for development
        const mockSolutions = [
          {
            id: 1,
            title: "Manufacturing Automation",
            description: "Streamline your manufacturing processes with our automation solutions",
            imageUrl: "https://source.unsplash.com/random/800x600/?factory"
          },
          {
            id: 2,
            title: "Medical Equipment",
            description: "Reliable computing solutions for medical devices and healthcare",
            imageUrl: "https://source.unsplash.com/random/800x600/?medical"
          },
          {
            id: 3,
            title: "Transportation Systems",
            description: "Robust solutions for transportation and logistics applications",
            imageUrl: "https://source.unsplash.com/random/800x600/?transportation"
          },
          {
            id: 4,
            title: "Smart Retail",
            description: "Enhance customer experience with intelligent retail solutions",
            imageUrl: "https://source.unsplash.com/random/800x600/?retail"
          },
          {
            id: 5,
            title: "Energy Management",
            description: "Optimize energy consumption with our monitoring and control systems",
            imageUrl: "https://source.unsplash.com/random/800x600/?energy"
          },
          {
            id: 6,
            title: "Security & Surveillance",
            description: "Comprehensive security solutions for various environments",
            imageUrl: "https://source.unsplash.com/random/800x600/?security"
          }
        ];
        
        // Filter by category if provided
        let filteredSolutions = mockSolutions;
        if (categoryId) {
          // In a real app, we would filter by category ID
          // For mock data, we'll just take a subset
          filteredSolutions = mockSolutions.slice(0, 3);
          setCategoryName("Industry Solutions");
        }
        
        // Filter by search if provided
        if (search) {
          const searchLower = search.toLowerCase();
          filteredSolutions = filteredSolutions.filter(
            solution => 
              solution.title.toLowerCase().includes(searchLower) || 
              (solution.description && solution.description.toLowerCase().includes(searchLower))
          );
        }
        
        setSolutions(filteredSolutions);
        setTotalPages(Math.ceil(filteredSolutions.length / 6)); // Assuming 6 items per page
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to fetch solutions");
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchSolutions();
  }, [categoryId, search]);

  // Handle page change
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    // Scroll to top
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Determine page title and breadcrumb
  const pageTitle = categoryName || "Solutions";
  const breadcrumbItems = [
    { label: "Solutions", href: "/solutions" },
    ...(categoryName ? [{ label: categoryName }] : []),
  ];

  return (
    <div>
      <ErrorBoundary sectionName="Solutions Page Header">
        <PageHeader
          title={pageTitle}
          titleEn={pageTitle}
          description={search ? `Search results for: ${search}` : "Discover our industry-specific solutions designed to meet your unique challenges."}
          breadcrumbItems={breadcrumbItems}
          backgroundImage="https://source.unsplash.com/random/1920x400/?technology"
        />
      </ErrorBoundary>

      <div className="container mx-auto px-4 py-12">
        <ErrorBoundary sectionName="Solutions List">
          <SolutionList
            solutions={solutions}
            isLoading={isLoading}
            error={error}
            columns={3}
            aspectRatio="video"
            showPagination={totalPages > 1}
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </ErrorBoundary>
      </div>
    </div>
  );
}
