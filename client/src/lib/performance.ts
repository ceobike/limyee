/**
 * Performance optimization utilities
 */

/**
 * Debounce function to limit the rate at which a function can fire
 * @param func The function to debounce
 * @param wait The debounce wait time in milliseconds
 * @returns Debounced function
 */
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout | null = null;
  
  return function(...args: Parameters<T>) {
    const later = () => {
      timeout = null;
      func(...args);
    };
    
    if (timeout !== null) {
      clearTimeout(timeout);
    }
    timeout = setTimeout(later, wait);
  };
}

/**
 * Throttle function to limit the rate at which a function can fire
 * @param func The function to throttle
 * @param limit The throttle limit time in milliseconds
 * @returns Throttled function
 */
export function throttle<T extends (...args: any[]) => any>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle: boolean = false;
  
  return function(...args: Parameters<T>) {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => {
        inThrottle = false;
      }, limit);
    }
  };
}

/**
 * Memoize function to cache function results
 * @param func The function to memoize
 * @returns Memoized function
 */
export function memoize<T extends (...args: any[]) => any>(
  func: T
): (...args: Parameters<T>) => ReturnType<T> {
  const cache = new Map<string, ReturnType<T>>();
  
  return function(...args: Parameters<T>): ReturnType<T> {
    const key = JSON.stringify(args);
    
    if (cache.has(key)) {
      return cache.get(key) as ReturnType<T>;
    }
    
    const result = func(...args);
    cache.set(key, result);
    return result;
  };
}

/**
 * Lazy load images with Intersection Observer
 * @param imageSelector The CSS selector for images to lazy load
 */
export function lazyLoadImages(imageSelector: string = 'img[data-src]'): void {
  if (typeof window === 'undefined' || !('IntersectionObserver' in window)) {
    return;
  }
  
  const images = document.querySelectorAll<HTMLImageElement>(imageSelector);
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const image = entry.target as HTMLImageElement;
        const src = image.getAttribute('data-src');
        
        if (src) {
          image.src = src;
          image.removeAttribute('data-src');
        }
        
        observer.unobserve(image);
      }
    });
  });
  
  images.forEach((image) => {
    observer.observe(image);
  });
}
