"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { PageHeader } from "@/components/layout/page-header";
import { NewsList } from "@/components/news/news-list";
import { ErrorBoundary } from "@/components/ui/error-boundary";
import { DataLoader } from "@/components/ui/data-loader";
import { api, endpoints } from "@/lib/api";
import { NewsCardProps } from "@/components/news/news-card";
import { Calendar, Share2, ArrowLeft } from "lucide-react";

interface NewsDetailsProps {
  params: {
    id: string;
  };
}

export default function NewsDetailsPage({ params }: NewsDetailsProps) {
  const { id } = params;
  
  const [newsItem, setNewsItem] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [relatedNews, setRelatedNews] = useState<NewsCardProps[]>([]);
  const [isLoadingRelated, setIsLoadingRelated] = useState(false);

  // In a real application, we would fetch from API
  // For now, we'll use mock data
  useEffect(() => {
    const fetchNewsItem = async () => {
      setIsLoading(true);
      setError(null);
      
      try {
        // Mock data for development
        const mockNewsItems = [
          {
            id: "1",
            title: "Limyee Launches New Industrial Panel PC Series",
            summary: "Our latest industrial panel PCs offer improved performance and reliability for demanding environments",
            content: `
              <h2>Introducing the Next Generation of Industrial Panel PCs</h2>
              <p>Limyee is proud to announce the launch of our new LY-IPC8000 series of industrial panel PCs. These cutting-edge devices are designed to meet the demanding requirements of modern industrial environments, offering enhanced performance, reliability, and durability.</p>
              
              <p>The LY-IPC8000 series features the latest Intel processors, providing up to 40% better performance compared to previous generations. With fanless cooling design and IP65-rated front panels, these panel PCs are perfect for harsh industrial environments where dust, moisture, and temperature variations are common challenges.</p>
              
              <h3>Key Features</h3>
              <ul>
                <li>12th Gen Intel Core processors</li>
                <li>Up to 64GB DDR5 memory</li>
                <li>Multiple display sizes: 10.1", 15.6", 18.5", and 21.5"</li>
                <li>Projected capacitive multi-touch screen</li>
                <li>IP65-rated front panel</li>
                <li>Wide operating temperature range: -10°C to 60°C</li>
                <li>Multiple I/O options including GbE LAN, USB 3.2, COM, and more</li>
                <li>Optional Wi-Fi, Bluetooth, and 4G/5G connectivity</li>
              </ul>
              
              <h3>Applications</h3>
              <p>The LY-IPC8000 series is ideal for a wide range of industrial applications, including:</p>
              <ul>
                <li>Factory automation</li>
                <li>Machine control</li>
                <li>Process monitoring</li>
                <li>HMI applications</li>
                <li>SCADA systems</li>
              </ul>
              
              <p>"Our new panel PC series represents a significant step forward in industrial computing technology," said John Smith, Product Manager at Limyee. "We've listened to our customers' feedback and developed a product that addresses their needs for higher performance, better reliability, and enhanced connectivity in industrial environments."</p>
              
              <p>The LY-IPC8000 series is available for order now, with shipping expected to begin next month. For more information, please contact our sales team or visit our website.</p>
            `,
            imageUrl: "https://source.unsplash.com/random/1200x800/?technology",
            publishDate: "2023-11-15",
            author: "Marketing Team",
            category: "Product Launch",
            tags: ["Panel PC", "Industrial Computing", "New Product", "Automation"]
          },
          {
            id: "2",
            title: "Expanding Our Global Presence",
            summary: "Limyee opens new offices in Europe and Asia to better serve our international customers",
            content: `
              <h2>Limyee Expands Global Footprint with New International Offices</h2>
              <p>Limyee is excited to announce the opening of two new international offices in Munich, Germany and Singapore. This expansion is part of our strategic growth plan to better serve our global customer base and strengthen our presence in key markets.</p>
              
              <p>The new European headquarters in Munich will focus on serving customers across Europe, the Middle East, and Africa. With a dedicated sales, support, and engineering team, we aim to provide more localized service and faster response times to our European customers.</p>
              
              <p>Similarly, our new Asia-Pacific headquarters in Singapore will enhance our ability to serve customers across the Asia-Pacific region, including China, Japan, South Korea, Australia, and Southeast Asian countries.</p>
              
              <h3>Strategic Importance</h3>
              <p>"This international expansion marks a significant milestone in Limyee's growth journey," said Jane Doe, CEO of Limyee. "By establishing a physical presence in these key regions, we can better understand local market needs, provide more responsive customer service, and build stronger relationships with our partners and customers."</p>
              
              <p>Both offices will be fully operational by the end of the quarter, with local teams already being assembled. The expansion will create approximately 50 new jobs across both locations, with roles spanning sales, marketing, technical support, and engineering.</p>
              
              <h3>Future Plans</h3>
              <p>Looking ahead, Limyee plans to further expand its global footprint with additional offices in key markets over the next three years. This expansion strategy aligns with our mission to provide high-quality industrial computing solutions to customers worldwide, supported by exceptional local service and support.</p>
              
              <p>For more information about our new international offices or career opportunities, please visit our website or contact our HR department.</p>
            `,
            imageUrl: "https://source.unsplash.com/random/1200x800/?office",
            publishDate: "2023-10-20",
            author: "Corporate Communications",
            category: "Company News",
            tags: ["Global Expansion", "International", "Company Growth"]
          },
          {
            id: "3",
            title: "Industry 4.0 Solutions Showcase",
            summary: "Join us at the upcoming Industry 4.0 expo to see our latest smart manufacturing solutions",
            content: `
              <h2>Limyee to Showcase Industry 4.0 Solutions at Upcoming Expo</h2>
              <p>Limyee is pleased to announce our participation in the upcoming Industry 4.0 Expo, one of the largest industrial technology exhibitions in the region. The event will take place from September 15-18, 2023, at the International Convention Center.</p>
              
              <p>At our booth (#A42), visitors will have the opportunity to experience our comprehensive range of Industry 4.0 solutions designed to help manufacturers embrace digital transformation and smart manufacturing practices.</p>
              
              <h3>Featured Solutions</h3>
              <p>Our showcase will include:</p>
              <ul>
                <li><strong>Smart Factory Platform:</strong> Our integrated software solution for factory-wide monitoring, control, and optimization</li>
                <li><strong>Edge Computing Devices:</strong> The latest generation of our industrial edge computers for real-time data processing</li>
                <li><strong>IIoT Gateways:</strong> Secure and reliable connectivity solutions for industrial IoT applications</li>
                <li><strong>AI-powered Quality Inspection:</strong> Computer vision systems for automated quality control</li>
                <li><strong>Predictive Maintenance Solutions:</strong> Advanced analytics for equipment health monitoring and failure prediction</li>
              </ul>
              
              <h3>Live Demonstrations</h3>
              <p>Throughout the expo, we will conduct live demonstrations showing how our solutions can be implemented in various manufacturing scenarios. Our technical experts will be available to discuss specific applications and answer questions about implementation strategies.</p>
              
              <h3>Special Presentation</h3>
              <p>On September 16 at 2:00 PM, our CTO will deliver a presentation titled "Practical Steps to Industry 4.0 Implementation" in the Technology Theater. This session will provide valuable insights for manufacturers looking to begin or advance their digital transformation journey.</p>
              
              <p>"We're excited to showcase our latest innovations at this premier industry event," said Robert Johnson, VP of Marketing at Limyee. "Visitors to our booth will see firsthand how our solutions can help them improve operational efficiency, reduce costs, and enhance product quality through smart manufacturing technologies."</p>
              
              <p>To schedule a meeting with our team during the expo or to register for our special presentation, please visit our website or contact our events team.</p>
            `,
            imageUrl: "https://source.unsplash.com/random/1200x800/?exhibition",
            publishDate: "2023-09-05",
            author: "Events Team",
            category: "Events",
            tags: ["Industry 4.0", "Exhibition", "Smart Manufacturing", "IIoT"]
          }
        ];
        
        // Find news item by ID
        const foundNewsItem = mockNewsItems.find(item => item.id === id);
        
        if (!foundNewsItem) {
          setError("News item not found");
          return;
        }
        
        setNewsItem(foundNewsItem);
        
        // Fetch related news
        setIsLoadingRelated(true);
        
        // Mock related news (same category)
        const mockRelatedNews = [
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
          }
        ];
        
        // Filter out current news item and limit to 3
        const filteredRelatedNews = mockRelatedNews
          .filter(item => item.id.toString() !== id)
          .slice(0, 3);
        
        setRelatedNews(filteredRelatedNews);
        setIsLoadingRelated(false);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to fetch news details");
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchNewsItem();
  }, [id]);

  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  // Determine breadcrumb items
  const breadcrumbItems = newsItem
    ? [
        { label: "News", href: "/news" },
        { label: newsItem.category, href: `/news?category=${newsItem.category === "Product Launch" ? "1" : newsItem.category === "Company News" ? "2" : "3"}` },
        { label: newsItem.title },
      ]
    : [
        { label: "News", href: "/news" },
        { label: "News Details" },
      ];

  return (
    <div>
      <ErrorBoundary sectionName="News Details Page Header">
        <DataLoader
          isLoading={isLoading}
          error={error}
          data={newsItem}
        >
          {(newsData) => (
            <PageHeader
              title={newsData.title}
              titleEn={newsData.title}
              description={newsData.summary}
              breadcrumbItems={breadcrumbItems}
            />
          )}
        </DataLoader>
      </ErrorBoundary>

      <div className="container mx-auto px-4 py-12">
        <DataLoader
          isLoading={isLoading}
          error={error}
          data={newsItem}
        >
          {(newsData) => (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              {/* Main content */}
              <div className="lg:col-span-2">
                <ErrorBoundary sectionName="News Content">
                  <div className="mb-8">
                    <div className="relative aspect-video rounded-lg overflow-hidden mb-6">
                      <Image
                        src={newsData.imageUrl}
                        alt={newsData.title}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                    </div>
                    
                    <div className="flex items-center gap-4 text-sm text-muted-foreground mb-6">
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-1" />
                        <time dateTime={newsData.publishDate}>{formatDate(newsData.publishDate)}</time>
                      </div>
                      {newsData.author && (
                        <div>By {newsData.author}</div>
                      )}
                      {newsData.category && (
                        <Link
                          href={`/news?category=${newsData.category === "Product Launch" ? "1" : newsData.category === "Company News" ? "2" : "3"}`}
                          className="inline-flex items-center rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-semibold text-primary"
                        >
                          {newsData.category}
                        </Link>
                      )}
                    </div>
                    
                    <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: newsData.content }} />
                    
                    {/* Tags */}
                    {newsData.tags && newsData.tags.length > 0 && (
                      <div className="mt-8 pt-6 border-t">
                        <h3 className="text-sm font-medium mb-2">Tags:</h3>
                        <div className="flex flex-wrap gap-2">
                          {newsData.tags.map((tag: string, index: number) => (
                            <Link
                              key={index}
                              href={`/news?search=${tag}`}
                              className="inline-flex items-center rounded-full bg-muted px-2.5 py-0.5 text-xs font-medium hover:bg-muted/80"
                            >
                              {tag}
                            </Link>
                          ))}
                        </div>
                      </div>
                    )}
                    
                    {/* Share */}
                    <div className="mt-8 pt-6 border-t">
                      <div className="flex items-center justify-between">
                        <Link
                          href="/news"
                          className="inline-flex items-center text-primary hover:underline"
                        >
                          <ArrowLeft className="h-4 w-4 mr-1" />
                          Back to News
                        </Link>
                        
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-medium">Share:</span>
                          <button
                            className="p-2 rounded-full hover:bg-muted"
                            onClick={() => {
                              if (navigator.share) {
                                navigator.share({
                                  title: newsData.title,
                                  text: newsData.summary,
                                  url: window.location.href,
                                });
                              } else {
                                navigator.clipboard.writeText(window.location.href);
                                alert("Link copied to clipboard!");
                              }
                            }}
                          >
                            <Share2 className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </ErrorBoundary>
              </div>
              
              {/* Sidebar */}
              <div className="lg:col-span-1">
                <ErrorBoundary sectionName="News Sidebar">
                  <div className="bg-muted/30 rounded-lg p-6 border sticky top-24">
                    <h3 className="text-xl font-semibold mb-4">Related News</h3>
                    <NewsList
                      news={relatedNews}
                      isLoading={isLoadingRelated}
                      error={null}
                      columns={1}
                      variant="minimal"
                    />
                    
                    <div className="mt-8">
                      <h3 className="text-xl font-semibold mb-4">Subscribe to Our Newsletter</h3>
                      <p className="text-sm text-muted-foreground mb-4">
                        Stay updated with our latest news and announcements.
                      </p>
                      <form
                        onSubmit={(e) => {
                          e.preventDefault();
                          alert("Subscription feature will be implemented soon!");
                        }}
                        className="space-y-2"
                      >
                        <input
                          type="email"
                          placeholder="Your email address"
                          className="w-full px-3 py-2 border rounded-md"
                          required
                        />
                        <button
                          type="submit"
                          className="w-full bg-primary text-primary-foreground px-4 py-2 rounded-md hover:bg-primary/90"
                        >
                          Subscribe
                        </button>
                      </form>
                    </div>
                  </div>
                </ErrorBoundary>
              </div>
            </div>
          )}
        </DataLoader>
      </div>
    </div>
  );
}
