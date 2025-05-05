"use client";

import { ErrorBoundary } from "@/components/ui/error-boundary";
import { Header } from "@/components/layout/header";
import { Banner } from "@/components/sections/banner";
import { Products } from "@/components/sections/products";
import { Solutions } from "@/components/sections/solutions";
import { CompanyProfile } from "@/components/sections/company-profile";
import { News } from "@/components/sections/news";
import { Footer } from "@/components/layout/footer";
import { FloatingActionBar } from "@/components/layout/floating-action-bar";
import { TestError } from "@/components/test-error";
import { ApiTest } from "@/components/api-test";

// In a real application, these would be fetched from an API
import {
  mockHeaderData as headerData,
  mockBannerData as bannerData,
  mockProductsData as productsData,
  mockSolutionsData as solutionsData,
  mockCompanyProfileData as companyProfileData,
  mockNewsData as newsData,
  mockFooterData as footerData,
  mockFloatingActionBarData as floatingActionBarData,
} from "@/lib/mock-data";

export function HomePage() {
  return (
    <div className="flex min-h-screen flex-col">
      <ErrorBoundary sectionName="Header">
        <Header data={headerData} />
      </ErrorBoundary>

      <main className="flex-grow">
        <ErrorBoundary sectionName="Banner">
          <Banner data={bannerData} />
        </ErrorBoundary>

        <ErrorBoundary sectionName="Products">
          <Products data={productsData} />
        </ErrorBoundary>

        <ErrorBoundary sectionName="Solutions">
          <Solutions data={solutionsData} />
        </ErrorBoundary>

        <ErrorBoundary sectionName="Company Profile">
          <CompanyProfile data={companyProfileData} />
        </ErrorBoundary>

        <ErrorBoundary sectionName="News">
          <News data={newsData} />
        </ErrorBoundary>

        <ErrorBoundary
          sectionName="API Test Component"
          onError={(error) => {
            console.log("Error in API Test Component:", error.message);
          }}
        >
          <div className="container mx-auto my-8">
            <h2 className="text-2xl font-bold mb-4">API Testing Section</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <ApiTest endpoint="/api/test" />
                <ApiTest endpoint="/api/mock-data" />
                <ApiTest endpoint="/api/mock-data" params={{ type: 'header' }} />
              </div>

              <div className="space-y-4">
                <TestError shouldError={false} />

                {/* This component will intentionally throw an error to demonstrate error boundary */}
                <ErrorBoundary
                  sectionName="Test Error (Will Fail)"
                  onError={(error) => {
                    console.log("Error caught by boundary:", error.message);
                  }}
                >
                  <TestError shouldError={true} />
                </ErrorBoundary>
              </div>
            </div>
          </div>
        </ErrorBoundary>
      </main>

      <ErrorBoundary sectionName="Footer">
        <Footer data={footerData} />
      </ErrorBoundary>

      <ErrorBoundary sectionName="Floating Action Bar">
        <FloatingActionBar data={floatingActionBarData} />
      </ErrorBoundary>
    </div>
  );
}
