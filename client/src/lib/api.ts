import { retry } from './error-handling';

/**
 * API endpoints
 */
export const endpoints = {
  // Products
  products: '/api/products',
  productDetails: (slug: string) => `/api/products/${slug}`,
  
  // Solutions
  solutions: '/api/solutions',
  solutionDetails: (slug: string) => `/api/solutions/${slug}`,
  
  // News
  news: '/api/news',
  newsDetails: (slug: string) => `/api/news/${slug}`,
  
  // Pages
  pageContent: (slug: string) => `/api/pages/${slug}`,
  
  // Other
  banners: '/api/banners',
  navigation: '/api/navigation',
  footer: '/api/footer',
  contact: '/api/contact',
};

/**
 * API service for making HTTP requests
 */
export const api = {
  /**
   * Make a GET request
   * @param url The URL to request
   * @param options Additional fetch options
   * @returns Promise with the response data
   */
  async get(url: string, options: RequestInit = {}) {
    return await request(url, {
      method: 'GET',
      ...options,
    });
  },
  
  /**
   * Make a POST request
   * @param url The URL to request
   * @param data The data to send
   * @param options Additional fetch options
   * @returns Promise with the response data
   */
  async post(url: string, data: any, options: RequestInit = {}) {
    return await request(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      body: JSON.stringify(data),
      ...options,
    });
  },
  
  /**
   * Make a PUT request
   * @param url The URL to request
   * @param data The data to send
   * @param options Additional fetch options
   * @returns Promise with the response data
   */
  async put(url: string, data: any, options: RequestInit = {}) {
    return await request(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      body: JSON.stringify(data),
      ...options,
    });
  },
  
  /**
   * Make a DELETE request
   * @param url The URL to request
   * @param options Additional fetch options
   * @returns Promise with the response data
   */
  async delete(url: string, options: RequestInit = {}) {
    return await request(url, {
      method: 'DELETE',
      ...options,
    });
  },
};

/**
 * Base request function with error handling and retries
 * @param url The URL to request
 * @param options Fetch options
 * @returns Promise with the response data
 */
async function request(url: string, options: RequestInit = {}) {
  try {
    // Use retry utility for better reliability
    const response = await retry(async () => {
      const res = await fetch(url, {
        ...options,
        headers: {
          'Accept': 'application/json',
          ...options.headers,
        },
      });
      
      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        const error = new Error(errorData.message || `API error: ${res.status}`);
        (error as any).status = res.status;
        (error as any).data = errorData;
        throw error;
      }
      
      return res;
    }, 3, 300);
    
    // Parse JSON response
    const data = await response.json();
    
    return { data, error: null };
  } catch (error) {
    console.error('API request failed:', error);
    
    if (error instanceof Error) {
      return { data: null, error: error.message };
    }
    
    return { data: null, error: 'Unknown error occurred' };
  }
}
