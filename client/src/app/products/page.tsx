"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { PageHeader } from "@/components/layout/page-header";
import { ProductList } from "@/components/products/product-list";
import { ErrorBoundary } from "@/components/ui/error-boundary";
import { api, endpoints } from "@/lib/api";
import { ProductCardProps } from "@/components/products/product-card";
import { getProductUrl } from "@/lib/url-utils";

export default function ProductsPage() {
  const searchParams = useSearchParams();
  const categoryId = searchParams.get("category");
  const search = searchParams.get("search");
  
  const [products, setProducts] = useState<ProductCardProps[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [categoryName, setCategoryName] = useState<string | null>(null);

  // Fetch products
  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);
      setError(null);
      
      try {
        // Build query parameters
        const params = new URLSearchParams();
        params.append("page", currentPage.toString());
        params.append("pageSize", "12");
        
        if (categoryId) {
          params.append("categoryId", categoryId);
        }
        
        if (search) {
          params.append("search", search);
        }
        
        // Fetch products
        const response = await api.get(`${endpoints.products}?${params.toString()}`);
        
        if (response.error) {
          setError(response.error);
          return;
        }
        
        // Map API response to ProductCardProps
        const productItems = response.data?.items.map((item: any) => ({
          id: item.id,
          model: item.model,
          name: item.name,
          shortDescription: item.shortDescription,
          imageUrl: item.imageUrl,
          isNew: item.isNew,
          isFeatured: item.isFeatured,
        })) || [];
        
        setProducts(productItems);
        setTotalPages(response.data?.pagination.totalPages || 1);
        
        // Set category name if available
        if (categoryId && response.data?.items.length > 0) {
          setCategoryName(response.data.items[0].category.name);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to fetch products");
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchProducts();
  }, [categoryId, search, currentPage]);

  // Handle page change
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    // Scroll to top
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Determine page title and breadcrumb
  const pageTitle = categoryName || "Products";
  const breadcrumbItems = [
    { label: "Products", href: "/products" },
    ...(categoryName ? [{ label: categoryName }] : []),
  ];

  return (
    <div>
      <ErrorBoundary sectionName="Products Page Header">
        <PageHeader
          title={pageTitle}
          titleEn={pageTitle}
          description={search ? `Search results for: ${search}` : undefined}
          breadcrumbItems={breadcrumbItems}
        />
      </ErrorBoundary>

      <div className="container mx-auto px-4 py-12">
        <ErrorBoundary sectionName="Products List">
          <ProductList
            products={products}
            isLoading={isLoading}
            error={error}
            columns={3}
            aspectRatio="square"
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
