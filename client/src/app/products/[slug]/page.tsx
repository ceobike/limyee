"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { PageHeader } from "@/components/layout/page-header";
import { ProductList } from "@/components/products/product-list";
import { ErrorBoundary } from "@/components/ui/error-boundary";
import { DataLoader } from "@/components/ui/data-loader";
import { api, endpoints } from "@/lib/api";
import { ProductCardProps } from "@/components/products/product-card";
import { getProductIdFromSlug, getProductStructuredData } from "@/lib/url-utils";
import { MetaTags } from "@/components/seo/meta-tags";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Container } from "@/components/layout/container";
import { OptimizedImage } from "@/components/ui/optimized-image";

interface ProductDetailsProps {
  params: {
    slug: string;
  };
}

export default function ProductDetailsPage({ params }: ProductDetailsProps) {
  const { slug } = params;
  // Extract the ID from the slug
  const id = getProductIdFromSlug(slug);
  
  const [product, setProduct] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<ProductCardProps[]>([]);
  const [isLoadingRelated, setIsLoadingRelated] = useState(false);

  // In a real application, we would fetch from API
  // For now, we'll use mock data
  useEffect(() => {
    const fetchProduct = async () => {
      setIsLoading(true);
      setError(null);
      
      try {
        // Mock data for development
        const mockProducts = [
          {
            id: "1",
            model: "LY-IPC6000",
            name: "Industrial Panel PC",
            shortDescription: "High-performance panel PC for industrial environments",
            description: "The LY-IPC6000 is a high-performance industrial panel PC designed for demanding industrial environments. With its robust design and powerful processing capabilities, it's ideal for factory automation, machine control, and HMI applications.",
            content: `
              <h2>Industrial Panel PC</h2>
              <p>The LY-IPC6000 is a high-performance industrial panel PC designed for demanding industrial environments. With its robust design and powerful processing capabilities, it's ideal for factory automation, machine control, and HMI applications.</p>
              
              <h3>Key Features</h3>
              <ul>
                <li>Intel Core i5/i7 processor</li>
                <li>15" to 21.5" display options</li>
                <li>Projected capacitive multi-touch screen</li>
                <li>IP65 front panel protection</li>
                <li>Wide operating temperature range</li>
                <li>Multiple I/O options</li>
              </ul>
              
              <h3>Applications</h3>
              <p>The LY-IPC6000 is suitable for a wide range of industrial applications, including:</p>
              <ul>
                <li>Factory automation</li>
                <li>Machine control</li>
                <li>Process monitoring</li>
                <li>HMI applications</li>
                <li>SCADA systems</li>
              </ul>
            `,
            imageUrl: "https://source.unsplash.com/random/800x600/?computer",
            gallery: [
              "https://source.unsplash.com/random/800x600/?computer,1",
              "https://source.unsplash.com/random/800x600/?computer,2",
              "https://source.unsplash.com/random/800x600/?computer,3"
            ],
            specifications: [
              { name: "Processor", value: "Intel Core i5/i7" },
              { name: "Memory", value: "8GB to 32GB DDR4" },
              { name: "Storage", value: "256GB to 1TB SSD" },
              { name: "Display", value: "15\", 17\", 19\", or 21.5\" LCD" },
              { name: "Resolution", value: "1920 x 1080" },
              { name: "Touch Screen", value: "Projected Capacitive Multi-Touch" },
              { name: "Operating System", value: "Windows 10 IoT Enterprise" },
              { name: "I/O Ports", value: "4x USB 3.0, 2x COM, 2x GbE LAN, HDMI" },
              { name: "Protection", value: "IP65 Front Panel" },
              { name: "Operating Temperature", value: "-10°C to 60°C" },
              { name: "Power Supply", value: "12V DC (AC adapter included)" },
              { name: "Dimensions", value: "Varies by display size" }
            ],
            features: [
              "Fanless design for silent operation",
              "Rugged aluminum housing",
              "Wide voltage input range",
              "Vibration and shock resistance",
              "Optional Wi-Fi and Bluetooth",
              "VESA mounting support"
            ],
            isNew: true,
            isFeatured: true,
            category: {
              id: 1,
              name: "Panel PCs"
            }
          },
          {
            id: "2",
            model: "LY-SBC8500",
            name: "Single Board Computer",
            shortDescription: "Compact and powerful single board computer",
            description: "The LY-SBC8500 is a compact yet powerful single board computer designed for embedded applications. With its small form factor and low power consumption, it's perfect for space-constrained applications requiring reliable computing power.",
            content: `
              <h2>Single Board Computer</h2>
              <p>The LY-SBC8500 is a compact yet powerful single board computer designed for embedded applications. With its small form factor and low power consumption, it's perfect for space-constrained applications requiring reliable computing power.</p>
              
              <h3>Key Features</h3>
              <ul>
                <li>Intel Atom processor</li>
                <li>Up to 8GB RAM</li>
                <li>eMMC storage options</li>
                <li>Multiple I/O interfaces</li>
                <li>Low power consumption</li>
                <li>Extended temperature range</li>
              </ul>
              
              <h3>Applications</h3>
              <p>The LY-SBC8500 is suitable for a wide range of embedded applications, including:</p>
              <ul>
                <li>IoT gateways</li>
                <li>Digital signage</li>
                <li>Embedded control systems</li>
                <li>Kiosks and vending machines</li>
                <li>Medical devices</li>
              </ul>
            `,
            imageUrl: "https://source.unsplash.com/random/800x600/?circuit",
            gallery: [
              "https://source.unsplash.com/random/800x600/?circuit,1",
              "https://source.unsplash.com/random/800x600/?circuit,2",
              "https://source.unsplash.com/random/800x600/?circuit,3"
            ],
            specifications: [
              { name: "Processor", value: "Intel Atom x5-E3940" },
              { name: "Memory", value: "4GB to 8GB LPDDR4" },
              { name: "Storage", value: "32GB to 128GB eMMC" },
              { name: "Graphics", value: "Intel HD Graphics 500" },
              { name: "I/O Ports", value: "2x USB 3.0, 2x USB 2.0, 1x HDMI, 1x GbE LAN" },
              { name: "Expansion", value: "1x mPCIe, 1x M.2 Key E" },
              { name: "Operating Temperature", value: "-20°C to 70°C" },
              { name: "Power Consumption", value: "6W typical" },
              { name: "Dimensions", value: "100mm x 72mm" },
              { name: "Operating System Support", value: "Windows 10 IoT, Linux" }
            ],
            features: [
              "Compact form factor",
              "Low power consumption",
              "Passive cooling design",
              "Wide temperature range",
              "Long product lifecycle",
              "Industrial-grade components"
            ],
            isNew: false,
            isFeatured: true,
            category: {
              id: 2,
              name: "Single Board Computers"
            }
          }
        ];
        
        // Find product by ID
        const foundProduct = mockProducts.find(p => p.id === id);
        
        if (!foundProduct) {
          setError("Product not found");
          return;
        }
        
        setProduct(foundProduct);
        
        // Fetch related products
        setIsLoadingRelated(true);
        
        // Mock related products (same category)
        const mockRelatedProducts = mockProducts
          .filter(p => p.id !== id && p.category.id === foundProduct.category.id)
          .slice(0, 3);
        
        setRelatedProducts(mockRelatedProducts);
        setIsLoadingRelated(false);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to fetch product details");
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchProduct();
  }, [id]);

  // Determine breadcrumb items
  const breadcrumbItems = product
    ? [
        { label: "Products", href: "/products" },
        { label: product.category.name, href: `/products?category=${product.category.id}` },
        { label: product.name },
      ]
    : [
        { label: "Products", href: "/products" },
        { label: "Product Details" },
      ];

  return (
    <>
      {product && (
        <MetaTags
          title={`${product.name} | ${product.model} | Limyee`}
          description={product.shortDescription}
          keywords={`${product.name}, ${product.model}, industrial computing, ${product.category.name}`}
          ogImage={product.imageUrl}
          ogType="product"
          structuredData={getProductStructuredData(product)}
        />
      )}
      
      <ErrorBoundary sectionName="Product Details Page Header">
        <DataLoader
          isLoading={isLoading}
          error={error}
          data={product}
        >
          {(productData) => (
            <PageHeader
              title={productData.name}
              titleEn={productData.model}
              description={productData.shortDescription}
              breadcrumbItems={breadcrumbItems}
            />
          )}
        </DataLoader>
      </ErrorBoundary>

      <Container className="py-12">
        <DataLoader
          isLoading={isLoading}
          error={error}
          data={product}
        >
          {(productData) => (
            <>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12">
                {/* Product Gallery */}
                <ErrorBoundary sectionName="Product Gallery">
                  <div className="space-y-4">
                    <div className="relative aspect-video rounded-lg overflow-hidden border">
                      <OptimizedImage
                        src={productData.imageUrl}
                        alt={productData.name}
                        fill
                        className="object-cover"
                        sizes="(max-width: 1024px) 100vw, 50vw"
                        priority
                      />
                    </div>
                    
                    {productData.gallery && productData.gallery.length > 0 && (
                      <div className="grid grid-cols-3 gap-4">
                        {productData.gallery.map((image: string, index: number) => (
                          <div key={index} className="relative aspect-video rounded-lg overflow-hidden border">
                            <OptimizedImage
                              src={image}
                              alt={`${productData.name} - Image ${index + 1}`}
                              fill
                              className="object-cover"
                              sizes="(max-width: 1024px) 33vw, 16vw"
                            />
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </ErrorBoundary>
                
                {/* Product Info */}
                <ErrorBoundary sectionName="Product Info">
                  <div>
                    <div className="mb-6">
                      <h1 className="text-3xl font-bold mb-2">{productData.name}</h1>
                      <p className="text-xl text-muted-foreground mb-4">{productData.model}</p>
                      
                      <div className="flex flex-wrap gap-2 mb-4">
                        {productData.isNew && (
                          <span className="inline-flex items-center rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-semibold text-blue-800">
                            New
                          </span>
                        )}
                        
                        <span className="inline-flex items-center rounded-full bg-muted px-2.5 py-0.5 text-xs font-semibold">
                          {productData.category.name}
                        </span>
                      </div>
                      
                      <p className="text-lg">{productData.description}</p>
                    </div>
                    
                    <div className="space-y-4 mb-8">
                      <h3 className="text-lg font-semibold">Key Features</h3>
                      <ul className="space-y-2">
                        {productData.features.slice(0, 5).map((feature: string, index: number) => (
                          <li key={index} className="flex items-start">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-5 w-5 text-primary mr-2 mt-0.5 flex-shrink-0"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                            >
                              <path
                                fillRule="evenodd"
                                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                clipRule="evenodd"
                              />
                            </svg>
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div className="space-y-4">
                      <Link
                        href={`/contact?product=${productData.model}`}
                        className="inline-flex items-center justify-center w-full rounded-md bg-primary px-4 py-3 text-sm font-medium text-primary-foreground shadow hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                      >
                        Request Information
                      </Link>
                      
                      <Link
                        href={`/support?product=${productData.model}`}
                        className="inline-flex items-center justify-center w-full rounded-md bg-muted px-4 py-3 text-sm font-medium shadow hover:bg-muted/80 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                      >
                        Download Datasheet
                      </Link>
                    </div>
                  </div>
                </ErrorBoundary>
              </div>
              
              {/* Product Details Tabs */}
              <ErrorBoundary sectionName="Product Details Tabs">
                <Tabs defaultValue="overview" className="w-full">
                  <TabsList className="w-full border-b rounded-none justify-start mb-8">
                    <TabsTrigger value="overview">Overview</TabsTrigger>
                    <TabsTrigger value="specifications">Specifications</TabsTrigger>
                    <TabsTrigger value="features">Features</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="overview" className="pt-4">
                    <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: productData.content }} />
                  </TabsContent>
                  
                  <TabsContent value="specifications" className="pt-4">
                    <div className="overflow-x-auto">
                      <table className="w-full border-collapse">
                        <thead>
                          <tr className="bg-muted/50">
                            <th className="px-4 py-3 text-left font-medium w-1/3">Specification</th>
                            <th className="px-4 py-3 text-left font-medium w-2/3">Value</th>
                          </tr>
                        </thead>
                        <tbody>
                          {productData.specifications.map((spec: { name: string; value: string }, index: number) => (
                            <tr key={index} className="border-b">
                              <td className="px-4 py-3 font-medium">{spec.name}</td>
                              <td className="px-4 py-3">{spec.value}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="features" className="pt-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      {productData.features.map((feature: string, index: number) => (
                        <div key={index} className="flex items-start">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5 text-primary mr-3 mt-0.5 flex-shrink-0"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path
                              fillRule="evenodd"
                              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                              clipRule="evenodd"
                            />
                          </svg>
                          <div>
                            <p className="font-medium">{feature}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </TabsContent>
                </Tabs>
              </ErrorBoundary>
              
              {/* Related Products */}
              <ErrorBoundary sectionName="Related Products">
                <div className="mt-16">
                  <h2 className="text-2xl font-bold mb-6">Related Products</h2>
                  <ProductList
                    products={relatedProducts}
                    isLoading={isLoadingRelated}
                    error={null}
                    columns={3}
                    aspectRatio="square"
                  />
                </div>
              </ErrorBoundary>
            </>
          )}
        </DataLoader>
      </Container>
    </>
  );
}
