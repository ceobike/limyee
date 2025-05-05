// Common types
export interface ImageData {
  src: string;
  alt: string;
  width?: number;
  height?: number;
}

export interface LinkData {
  href: string;
  label: string;
  isExternal?: boolean;
}

// Banner types
export interface BannerSlide {
  id: string;
  title: string;
  description: string;
  image: ImageData;
  ctaLink?: LinkData;
  backgroundColor?: string;
}

export interface BannerData {
  slides: BannerSlide[];
  autoplay?: boolean;
  interval?: number;
}

// Product Card types
export interface ProductCard {
  id: string;
  title: string;
  description: string;
  image: ImageData;
  link: LinkData;
}

export interface ProductSectionData {
  title: string;
  description?: string;
  products: ProductCard[];
}

// Solution types
export interface SolutionItem {
  id: string;
  title: string;
  description: string;
  image: ImageData;
  link: LinkData;
  tags?: string[];
}

export interface SolutionSectionData {
  title: string;
  description?: string;
  solutions: SolutionItem[];
}

// Company Profile types
export interface StatItem {
  id: string;
  value: string;
  label: string;
  icon?: string;
}

export interface CompanyProfileData {
  title: string;
  description: string;
  image?: ImageData;
  stats: StatItem[];
  ctaLink?: LinkData;
}

// News types
export interface NewsItem {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  image?: ImageData;
  link: LinkData;
  category?: string;
}

export interface NewsSectionData {
  title: string;
  description?: string;
  news: NewsItem[];
  viewAllLink?: LinkData;
}

// Footer types
export interface FooterColumn {
  title: string;
  links: LinkData[];
}

export interface FooterData {
  logo: ImageData;
  columns: FooterColumn[];
  bottomLinks: LinkData[];
  copyright: string;
  socialLinks?: {
    platform: string;
    url: string;
    icon: string;
  }[];
}

// Floating Action Bar types
export interface ActionItem {
  id: string;
  label: string;
  icon: string;
  action: 'link' | 'modal' | 'scroll';
  target?: string;
}

export interface FloatingActionBarData {
  actions: ActionItem[];
}

// Navigation types
export interface NavItem {
  label: string;
  href: string;
  children?: Omit<NavItem, 'children'>[];
}

export interface HeaderData {
  logo: ImageData;
  navigation: NavItem[];
  ctaButton?: LinkData;
}
