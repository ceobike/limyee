"use client";

import { useState, useEffect } from 'react';
import Image, { ImageProps } from 'next/image';
import { cn } from '@/lib/utils';

interface OptimizedImageProps extends Omit<ImageProps, 'onLoad' | 'onError'> {
  fallbackSrc?: string;
  loadingComponent?: React.ReactNode;
  errorComponent?: React.ReactNode;
}

/**
 * Optimized image component with loading and error states
 */
export function OptimizedImage({
  src,
  alt,
  fallbackSrc,
  loadingComponent,
  errorComponent,
  className,
  ...props
}: OptimizedImageProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);
  const [imageSrc, setImageSrc] = useState(src);
  
  // Reset states when src changes
  useEffect(() => {
    setIsLoading(true);
    setError(false);
    setImageSrc(src);
  }, [src]);
  
  // Handle image load
  const handleLoad = () => {
    setIsLoading(false);
  };
  
  // Handle image error
  const handleError = () => {
    setError(true);
    setIsLoading(false);
    
    if (fallbackSrc && imageSrc !== fallbackSrc) {
      setImageSrc(fallbackSrc);
    }
  };
  
  // Default loading component
  const defaultLoadingComponent = (
    <div className="absolute inset-0 flex items-center justify-center bg-muted/20">
      <div className="h-8 w-8 rounded-full border-2 border-primary border-t-transparent animate-spin"></div>
    </div>
  );
  
  // Default error component
  const defaultErrorComponent = (
    <div className="absolute inset-0 flex items-center justify-center bg-muted/20">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="text-muted-foreground"
      >
        <path d="M10 13a2 2 0 1 0 4 0 2 2 0 0 0-4 0z" />
        <path d="M13.73 21a9.98 9.98 0 0 1-3.46 0" />
        <path d="M18.63 15.28a9.9 9.9 0 0 1-1.63 2.72" />
        <path d="M7 15.28a9.9 9.9 0 0 0 1.63 2.72" />
        <path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20z" />
        <path d="M2 12h2" />
        <path d="M20 12h2" />
        <path d="M12 2v2" />
        <path d="M12 20v2" />
      </svg>
    </div>
  );
  
  return (
    <div className={cn('relative', className)}>
      <Image
        src={imageSrc}
        alt={alt}
        {...props}
        onLoadingComplete={handleLoad}
        onError={handleError}
      />
      
      {isLoading && (loadingComponent || defaultLoadingComponent)}
      {error && !fallbackSrc && (errorComponent || defaultErrorComponent)}
    </div>
  );
}
