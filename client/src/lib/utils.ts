/**
 * General utility functions
 */

/**
 * Combine class names with conditional logic
 * @param classes Class names to combine
 * @returns Combined class string
 */
export function cn(...classes: (string | boolean | undefined | null)[]): string {
  return classes.filter(Boolean).join(' ');
}

/**
 * Format a date string
 * @param dateString Date string to format
 * @param options Date formatting options
 * @returns Formatted date string
 */
export function formatDate(
  dateString: string,
  options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }
): string {
  if (!dateString) return '';
  
  const date = new Date(dateString);
  
  if (isNaN(date.getTime())) {
    return '';
  }
  
  return new Intl.DateTimeFormat('en-US', options).format(date);
}

/**
 * Truncate text to a specified length
 * @param text Text to truncate
 * @param length Maximum length
 * @param suffix Suffix to add to truncated text
 * @returns Truncated text
 */
export function truncateText(text: string, length: number, suffix: string = '...'): string {
  if (!text) return '';
  if (text.length <= length) return text;
  
  return text.substring(0, length).trim() + suffix;
}

/**
 * Generate a random ID
 * @param prefix Optional prefix for the ID
 * @returns Random ID string
 */
export function generateId(prefix: string = 'id'): string {
  return `${prefix}-${Math.random().toString(36).substring(2, 9)}`;
}

/**
 * Check if the code is running on the client side
 * @returns Boolean indicating if code is running on client
 */
export function isClient(): boolean {
  return typeof window !== 'undefined';
}

/**
 * Check if the code is running on the server side
 * @returns Boolean indicating if code is running on server
 */
export function isServer(): boolean {
  return typeof window === 'undefined';
}

/**
 * Get the current breakpoint based on window width
 * @returns Current breakpoint: 'xs', 'sm', 'md', 'lg', 'xl', or '2xl'
 */
export function getBreakpoint(): string {
  if (!isClient()) return 'md';
  
  const width = window.innerWidth;
  
  if (width < 640) return 'xs';
  if (width < 768) return 'sm';
  if (width < 1024) return 'md';
  if (width < 1280) return 'lg';
  if (width < 1536) return 'xl';
  return '2xl';
}

/**
 * Parse a URL query string
 * @param queryString Query string to parse
 * @returns Parsed query parameters
 */
export function parseQueryString(queryString: string): Record<string, string> {
  const params = new URLSearchParams(queryString);
  const result: Record<string, string> = {};
  
  params.forEach((value, key) => {
    result[key] = value;
  });
  
  return result;
}

/**
 * Safely access nested object properties
 * @param obj Object to access
 * @param path Path to the property
 * @param defaultValue Default value if property doesn't exist
 * @returns Property value or default value
 */
export function getNestedValue<T>(
  obj: any,
  path: string,
  defaultValue: T
): T {
  const keys = path.split('.');
  let result = obj;
  
  for (const key of keys) {
    if (result === undefined || result === null) {
      return defaultValue;
    }
    
    result = result[key];
  }
  
  return (result === undefined || result === null) ? defaultValue : result;
}
