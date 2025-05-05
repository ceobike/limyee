"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { PageHeader } from "@/components/layout/page-header";
import { NewsList } from "@/components/news/news-list";
import { ErrorBoundary } from "@/components/ui/error-boundary";
import { api, endpoints } from "@/lib/api";
import { NewsCardProps } from "@/components/news/news-card";
import { getNewsUrl } from "@/lib/url-utils";

export default function NewsPage() {
  const searchParams = useSearchParams();
  const categoryId = searchParams.get("category");
  const search = searchParams.get("search");
  
  const [news, setNews] = useState<NewsCardProps[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [categoryName, setCategoryName] = useState<string | null>(null);

  // In a real application, we would fetch from API
  // For now, we'll use mock data
  useEffect(() => {
    const fetchNews = async () => {
      setIsLoading(true);
      setError(null);
      
      try {
        // Mock data for development
        const mockNews = [
          {
            id: 1,
            title: "Limyee Launches New Industrial Panel PC Series",
            summary: "Our latest industrial panel PCs offer improved performance and reliability for demanding environments",
            imageUrl: "https://source.unsplash.com/random/800x600/?technology",
            publishDate: "2023-11-15",
            category: "Product Launch"
          },
          {
            id: 2,
            title: "Expanding Our Global Presence",
            summary: "Limyee opens new offices in Europe and Asia to better serve our international customers",
            imageUrl: "https://source.unsplash.com/random/800x600/?office",
            publishDate: "2023-10-20",
            category: "Company News"
          },
          {
            id: 3,
            title: "Industry 4.0 Solutions Showcase",
            summary: "Join us at the upcoming Industry 4.0 expo to see our latest smart manufacturing solutions",
            imageUrl: "https://source.unsplash.com/random/800x600/?exhibition",
            publishDate: "2023-09-05",
            category: "Events"
          },
          {
            id: 4,
            title: "New Partnership with Leading Automation Provider",
            summary: "Limyee announces strategic partnership to enhance our industrial automation offerings",
            imageUrl: "https://source.unsplash.com/random/800x600/?partnership",
            publishDate: "2023-08-12",
            category: "Partnership"
          },
          {
            id: 5,
            title: "Limyee Receives Industry Innovation Award",
            summary: "Our commitment to innovation recognized with prestigious industry award",
            imageUrl: "https://source.unsplash.com/random/800x600/?award",
            publishDate: "2023-07-28",
            category: "Awards"
          },
          {
            id: 6,
            title: "Introducing New Edge Computing Solutions",
            summary: "Our new edge computing products bring processing power closer to data sources",
            imageUrl: "https://source.unsplash.com/random/800x600/?server",
            publishDate: "2023-06-15",
            category: "Product Launch"
          },
          {
            id: 7,
            title: "Limyee Celebrates 15 Years of Innovation",
            summary: "Marking 15 years of delivering cutting-edge industrial computing solutions",
            imageUrl: "https://source.unsplash.com/random/800x600/?celebration",
            publishDate: "2023-05-10",
            category: "Company News"
          },
          {
            id: 8,
            title: "Quarterly Financial Results Exceed Expectations",
            summary: "Strong performance across all business segments drives record quarterly results",
            imageUrl: "https://source.unsplash.com/random/800x600/?finance",
            publishDate: "2023-04-22",
            category: "Financial News"
          },
          {
            id: 9,
            title: "New R&D Center Opens in Silicon Valley",
            summary: "Expanding our research and development capabilities with new state-of-the-art facility",
            imageUrl: "https://source.unsplash.com/random/800x600/?laboratory",
            publishDate: "2023-03-18",
            category: "Company News"
          }
        ];
        
        // Filter by category if provided
        let filteredNews = mockNews;
        if (categoryId) {
          // In a real app, we would filter by category ID
          // For mock data, we'll filter by category name
          const categoryMap: Record<string, string> = {
            "1": "Product Launch",
            "2": "Company News",
            "3": "Events",
            "4": "Partnership",
            "5": "Awards"
          };
          
          const categoryNameToFilter = categoryMap[categoryId];
          if (categoryNameToFilter) {
            filteredNews = mockNews.filter(item => item.category === categoryNameToFilter);
            setCategoryName(categoryNameToFilter);
          }
        }
        
        // Filter by search if provided
        if (search) {
          const searchLower = search.toLowerCase();
          filteredNews = filteredNews.filter(
            item => 
              item.title.toLowerCase().includes(searchLower) || 
              (item.summary && item.summary.toLowerCase().includes(searchLower))
          );
        }
        
        // Pagination
        const itemsPerPage = 6;
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        const paginatedNews = filteredNews.slice(startIndex, endIndex);
        
        setNews(paginatedNews);
        setTotalPages(Math.ceil(filteredNews.length / itemsPerPage));
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to fetch news");
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchNews();
  }, [categoryId, search, currentPage]);

  // Handle page change
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    // Scroll to top
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Determine page title and breadcrumb
  const pageTitle = categoryName ? `${categoryName} News` : "News";
  const breadcrumbItems = [
    { label: "News", href: "/news" },
    ...(categoryName ? [{ label: categoryName }] : []),
  ];

  return (
    <div>
      <ErrorBoundary sectionName="News Page Header">
        <PageHeader
          title={pageTitle}
          titleEn={pageTitle}
          description={search ? `Search results for: ${search}` : "Stay updated with the latest news and announcements from Limyee."}
          breadcrumbItems={breadcrumbItems}
        />
      </ErrorBoundary>

      <div className="container mx-auto px-4 py-12">
        {/* News categories */}
        <ErrorBoundary sectionName="News Categories">
          <div className="mb-8 flex flex-wrap gap-2">
            <a 
              href="/news" 
              className={`px-4 py-2 rounded-full text-sm font-medium ${!categoryId ? 'bg-primary text-primary-foreground' : 'bg-muted hover:bg-muted/80'}`}
            >
              All News
            </a>
            <a 
              href="/news?category=1" 
              className={`px-4 py-2 rounded-full text-sm font-medium ${categoryId === '1' ? 'bg-primary text-primary-foreground' : 'bg-muted hover:bg-muted/80'}`}
            >
              Product Launch
            </a>
            <a 
              href="/news?category=2" 
              className={`px-4 py-2 rounded-full text-sm font-medium ${categoryId === '2' ? 'bg-primary text-primary-foreground' : 'bg-muted hover:bg-muted/80'}`}
            >
              Company News
            </a>
            <a 
              href="/news?category=3" 
              className={`px-4 py-2 rounded-full text-sm font-medium ${categoryId === '3' ? 'bg-primary text-primary-foreground' : 'bg-muted hover:bg-muted/80'}`}
            >
              Events
            </a>
            <a 
              href="/news?category=4" 
              className={`px-4 py-2 rounded-full text-sm font-medium ${categoryId === '4' ? 'bg-primary text-primary-foreground' : 'bg-muted hover:bg-muted/80'}`}
            >
              Partnership
            </a>
            <a 
              href="/news?category=5" 
              className={`px-4 py-2 rounded-full text-sm font-medium ${categoryId === '5' ? 'bg-primary text-primary-foreground' : 'bg-muted hover:bg-muted/80'}`}
            >
              Awards
            </a>
          </div>
        </ErrorBoundary>

        <ErrorBoundary sectionName="News List">
          <NewsList
            news={news}
            isLoading={isLoading}
            error={error}
            columns={3}
            aspectRatio="video"
            showPagination={true}
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </ErrorBoundary>
      </div>
    </div>
  );
}
