import { NextResponse } from 'next/server';

// Simple in-memory cache
let cachedData: any = null;
let cacheTime = 0;
const CACHE_DURATION = 60 * 1000; // 1 minute

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const type = searchParams.get('type');
  
  // Check if we have valid cached data
  const now = Date.now();
  if (cachedData && (now - cacheTime < CACHE_DURATION)) {
    // Return cached data if available and not expired
    if (type && cachedData[type]) {
      return NextResponse.json({ data: cachedData[type] });
    } else if (!type) {
      return NextResponse.json({ data: cachedData });
    }
  }
  
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 300));
  
  try {
    // Create mock data
    const mockData = {
      header: {
        logo: { src: "/logo.svg", alt: "MyEE Logo", width: 120, height: 40 },
        navigation: [
          { label: "Home", href: "/" },
          { 
            label: "Products", 
            href: "/products",
            children: [
              { label: "Product A", href: "/products/a" },
              { label: "Product B", href: "/products/b" }
            ]
          },
          { label: "About", href: "/about" }
        ]
      },
      banner: {
        slides: [
          {
            id: "slide1",
            title: "API-Driven Banner",
            description: "This banner content is loaded from the API",
            image: { src: "https://source.unsplash.com/random/1600x900/?technology", alt: "Technology" }
          }
        ]
      }
    };
    
    // Update cache
    cachedData = mockData;
    cacheTime = now;
    
    // Return requested data
    if (type && mockData[type as keyof typeof mockData]) {
      return NextResponse.json({ data: mockData[type as keyof typeof mockData] });
    }
    
    return NextResponse.json({ data: mockData });
  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch data' },
      { status: 500 }
    );
  }
}
