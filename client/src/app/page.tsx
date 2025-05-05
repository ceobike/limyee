"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { Carousel } from "@/components/ui/carousel";
import { ProductList } from "@/components/products/product-list";
import { SolutionList } from "@/components/solutions/solution-list";
import { NewsList } from "@/components/news/news-list";
import { ErrorBoundary } from "@/components/ui/error-boundary";

// Mock data for development
const mockBanners = [
  {
    id: 1,
    title: "Industrial Computing Solutions",
    description: "High-performance computing solutions for industrial applications",
    imageUrl: "https://source.unsplash.com/random/1600x900/?technology",
    ctaLink: { href: "/products", label: "Explore Products" }
  },
  {
    id: 2,
    title: "Tailored Industry Solutions",
    description: "Custom solutions designed for your specific industry needs",
    imageUrl: "https://source.unsplash.com/random/1600x900/?industry",
    ctaLink: { href: "/solutions", label: "View Solutions" }
  }
];

const mockProducts = [
  {
    id: 1,
    model: "LY-IPC6000",
    name: "Industrial Panel PC",
    shortDescription: "High-performance panel PC for industrial environments",
    imageUrl: "https://source.unsplash.com/random/600x600/?computer",
    isNew: true,
    isFeatured: true
  },
  {
    id: 2,
    model: "LY-SBC8500",
    name: "Single Board Computer",
    shortDescription: "Compact and powerful single board computer",
    imageUrl: "https://source.unsplash.com/random/600x600/?circuit",
    isNew: false,
    isFeatured: true
  },
  {
    id: 3,
    model: "LY-BOX3000",
    name: "Embedded Box PC",
    shortDescription: "Rugged box PC for harsh environments",
    imageUrl: "https://source.unsplash.com/random/600x600/?server",
    isNew: true,
    isFeatured: true
  },
  {
    id: 4,
    model: "LY-HMI2000",
    name: "Human Machine Interface",
    shortDescription: "Intuitive touch interface for industrial control",
    imageUrl: "https://source.unsplash.com/random/600x600/?touchscreen",
    isNew: false,
    isFeatured: true
  }
];

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
  }
];

const mockNews = [
  {
    id: 1,
    title: "Limyee Launches New Industrial Panel PC Series",
    summary: "Our latest industrial panel PCs offer improved performance and reliability for demanding environments",
    imageUrl: "https://source.unsplash.com/random/800x600/?news",
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
  }
];

export default function Home() {
  // In a real application, these would be fetched from an API
  const [banners, setBanners] = useState(mockBanners);
  const [featuredProducts, setFeaturedProducts] = useState(mockProducts);
  const [solutions, setSolutions] = useState(mockSolutions);
  const [news, setNews] = useState(mockNews);
  const [isLoading, setIsLoading] = useState(false);

  return (
    <div>
      {/* Banner Section */}
      <ErrorBoundary sectionName="Banner">
        <section className="relative">
          <div className="h-[500px]">
            <Carousel
              autoPlay={true}
              interval={5000}
              showArrows={true}
              showIndicators={true}
            >
              {banners.map((banner) => (
                <div key={banner.id} className="relative h-full">
                  <Image
                    src={banner.imageUrl}
                    alt={banner.title}
                    fill
                    className="object-cover"
                    priority
                    sizes="100vw"
                  />
                  <div className="absolute inset-0 bg-black/40" />
                  <div className="absolute inset-0 flex items-center">
                    <div className="container mx-auto px-4">
                      <div className="max-w-xl text-white">
                        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
                          {banner.title}
                        </h2>
                        <p className="text-lg md:text-xl mb-6 text-white/90">
                          {banner.description}
                        </p>
                        {banner.ctaLink && (
                          <Link
                            href={banner.ctaLink.href}
                            className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-6 py-2 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                          >
                            {banner.ctaLink.label}
                          </Link>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </Carousel>
          </div>
        </section>
      </ErrorBoundary>

      {/* Featured Products Section */}
      <ErrorBoundary sectionName="Featured Products">
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
              <div>
                <h2 className="text-3xl font-bold tracking-tight mb-4">Featured Products</h2>
                <p className="text-lg text-muted-foreground max-w-2xl">
                  Discover our high-quality industrial computing solutions designed for reliability and performance.
                </p>
              </div>

              <Link
                href="/products"
                className="inline-flex items-center text-primary font-medium hover:underline mt-4 md:mt-0"
              >
                View All Products
                <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </div>

            <ProductList
              products={featuredProducts}
              isLoading={isLoading}
              error={null}
              columns={4}
              aspectRatio="square"
            />
          </div>
        </section>
      </ErrorBoundary>

      {/* Solutions Section */}
      <ErrorBoundary sectionName="Solutions">
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
              <div>
                <h2 className="text-3xl font-bold tracking-tight mb-4">Industry Solutions</h2>
                <p className="text-lg text-muted-foreground max-w-2xl">
                  Tailored solutions for various industries to meet your specific requirements.
                </p>
              </div>

              <Link
                href="/solutions"
                className="inline-flex items-center text-primary font-medium hover:underline mt-4 md:mt-0"
              >
                View All Solutions
                <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </div>

            <SolutionList
              solutions={solutions}
              isLoading={isLoading}
              error={null}
              columns={3}
              aspectRatio="video"
            />
          </div>
        </section>
      </ErrorBoundary>

      {/* Company Profile Section */}
      <ErrorBoundary sectionName="Company Profile">
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold tracking-tight mb-4">About Limyee</h2>
                <p className="text-lg text-muted-foreground mb-6">
                  Limyee is a leading provider of industrial computing solutions with over 15 years of experience.
                  We specialize in designing and manufacturing high-quality, reliable computing products for various industries.
                </p>

                <Link
                  href="/about"
                  className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                >
                  Learn More About Us
                </Link>
              </div>

              <div className="relative h-[300px] rounded-lg overflow-hidden shadow-md">
                <Image
                  src="https://source.unsplash.com/random/800x600/?company"
                  alt="Limyee Company"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
            </div>

            <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { value: "15+", label: "Years of Experience" },
                { value: "500+", label: "Clients Worldwide" },
                { value: "98%", label: "Client Satisfaction" },
                { value: "24/7", label: "Support Available" },
              ].map((stat, i) => (
                <div key={i} className="bg-card rounded-lg border p-6 text-center shadow-sm hover:shadow-md transition-all">
                  <div className="text-3xl font-bold mb-2">{stat.value}</div>
                  <div className="text-muted-foreground">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </ErrorBoundary>

      {/* News Section */}
      <ErrorBoundary sectionName="News">
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
              <div>
                <h2 className="text-3xl font-bold tracking-tight mb-4">Latest News</h2>
                <p className="text-lg text-muted-foreground max-w-2xl">
                  Stay updated with our latest news, events, and announcements.
                </p>
              </div>

              <Link
                href="/news"
                className="inline-flex items-center text-primary font-medium hover:underline mt-4 md:mt-0"
              >
                View All News
                <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </div>

            <NewsList
              news={news}
              isLoading={isLoading}
              error={null}
              columns={3}
              aspectRatio="video"
            />
          </div>
        </section>
      </ErrorBoundary>
    </div>
  );
}
