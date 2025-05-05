import {
  BannerData,
  ProductSectionData,
  SolutionSectionData,
  CompanyProfileData,
  NewsSectionData,
  FooterData,
  FloatingActionBarData,
  HeaderData,
} from "./types";

export const mockHeaderData: HeaderData = {
  logo: {
    src: "/logo.svg",
    alt: "MyEE Logo",
    width: 120,
    height: 40,
  },
  navigation: [
    {
      label: "Home",
      href: "/",
    },
    {
      label: "Products",
      href: "/products",
      children: [
        { label: "Product A", href: "/products/a" },
        { label: "Product B", href: "/products/b" },
        { label: "Product C", href: "/products/c" },
      ],
    },
    {
      label: "Solutions",
      href: "/solutions",
      children: [
        { label: "Industry 1", href: "/solutions/industry-1" },
        { label: "Industry 2", href: "/solutions/industry-2" },
        { label: "Industry 3", href: "/solutions/industry-3" },
      ],
    },
    {
      label: "About",
      href: "/about",
    },
    {
      label: "News",
      href: "/news",
    },
    {
      label: "Contact",
      href: "/contact",
    },
  ],
  ctaButton: {
    label: "Get Started",
    href: "/contact",
  },
};

export const mockBannerData: BannerData = {
  slides: [
    {
      id: "slide1",
      title: "Innovative Solutions for Modern Businesses",
      description: "Transforming the way businesses operate with cutting-edge technology",
      image: {
        src: "https://source.unsplash.com/random/1600x900/?technology",
        alt: "Modern technology",
      },
      ctaLink: {
        href: "/solutions",
        label: "Explore Solutions",
      },
    },
    {
      id: "slide2",
      title: "Enterprise-Grade Security",
      description: "Protect your business with our advanced security solutions",
      image: {
        src: "https://source.unsplash.com/random/1600x900/?security",
        alt: "Security concept",
      },
      ctaLink: {
        href: "/products/security",
        label: "Learn More",
      },
    },
    {
      id: "slide3",
      title: "Digital Transformation",
      description: "Partner with us on your digital transformation journey",
      image: {
        src: "https://source.unsplash.com/random/1600x900/?digital",
        alt: "Digital transformation",
      },
      ctaLink: {
        href: "/contact",
        label: "Contact Us",
      },
    },
  ],
  autoplay: true,
  interval: 5000,
};

export const mockProductsData: ProductSectionData = {
  title: "Our Products",
  description: "Discover our range of innovative products designed to meet your business needs",
  products: [
    {
      id: "product1",
      title: "Enterprise Management System",
      description: "Comprehensive solution for managing all aspects of your enterprise",
      image: {
        src: "https://source.unsplash.com/random/600x400/?software",
        alt: "Enterprise Management System",
      },
      link: {
        href: "/products/ems",
        label: "Learn More",
      },
    },
    {
      id: "product2",
      title: "Cloud Infrastructure",
      description: "Scalable and secure cloud infrastructure for your business applications",
      image: {
        src: "https://source.unsplash.com/random/600x400/?cloud",
        alt: "Cloud Infrastructure",
      },
      link: {
        href: "/products/cloud",
        label: "Learn More",
      },
    },
    {
      id: "product3",
      title: "Data Analytics Platform",
      description: "Turn your data into actionable insights with our analytics platform",
      image: {
        src: "https://source.unsplash.com/random/600x400/?data",
        alt: "Data Analytics Platform",
      },
      link: {
        href: "/products/analytics",
        label: "Learn More",
      },
    },
    {
      id: "product4",
      title: "Security Suite",
      description: "Comprehensive security solutions to protect your business",
      image: {
        src: "https://source.unsplash.com/random/600x400/?security",
        alt: "Security Suite",
      },
      link: {
        href: "/products/security",
        label: "Learn More",
      },
    },
  ],
};

export const mockSolutionsData: SolutionSectionData = {
  title: "Industry Solutions",
  description: "Tailored solutions for various industries to address specific challenges",
  solutions: [
    {
      id: "solution1",
      title: "Healthcare",
      description: "Digital solutions for modern healthcare providers",
      image: {
        src: "https://source.unsplash.com/random/600x400/?healthcare",
        alt: "Healthcare Solutions",
      },
      link: {
        href: "/solutions/healthcare",
        label: "Explore",
      },
      tags: ["Electronic Health Records", "Telemedicine", "Healthcare Analytics"],
    },
    {
      id: "solution2",
      title: "Finance",
      description: "Secure and efficient solutions for financial institutions",
      image: {
        src: "https://source.unsplash.com/random/600x400/?finance",
        alt: "Finance Solutions",
      },
      link: {
        href: "/solutions/finance",
        label: "Explore",
      },
      tags: ["Banking", "Insurance", "Investment Management"],
    },
    {
      id: "solution3",
      title: "Manufacturing",
      description: "Optimize operations and increase productivity",
      image: {
        src: "https://source.unsplash.com/random/600x400/?manufacturing",
        alt: "Manufacturing Solutions",
      },
      link: {
        href: "/solutions/manufacturing",
        label: "Explore",
      },
      tags: ["Supply Chain", "Production Planning", "Quality Control"],
    },
  ],
};

export const mockCompanyProfileData: CompanyProfileData = {
  title: "About MyEE",
  description:
    "MyEE is a leading provider of enterprise solutions with over 15 years of experience helping businesses transform and grow. Our team of experts is dedicated to delivering innovative solutions that drive results.",
  image: {
    src: "https://source.unsplash.com/random/800x600/?office",
    alt: "MyEE Office",
  },
  stats: [
    {
      id: "stat1",
      value: "15+",
      label: "Years of Experience",
      icon: "calendar",
    },
    {
      id: "stat2",
      value: "500+",
      label: "Clients Worldwide",
      icon: "users",
    },
    {
      id: "stat3",
      value: "98%",
      label: "Client Satisfaction",
      icon: "thumbs-up",
    },
    {
      id: "stat4",
      value: "24/7",
      label: "Support Available",
      icon: "headphones",
    },
  ],
  ctaLink: {
    href: "/about",
    label: "Learn More About Us",
  },
};

export const mockNewsData: NewsSectionData = {
  title: "Latest News",
  description: "Stay updated with the latest news and developments from MyEE",
  news: [
    {
      id: "news1",
      title: "MyEE Launches New Cloud Platform",
      excerpt:
        "Our new cloud platform offers enhanced performance and security features for enterprise clients.",
      date: "2024-05-01",
      image: {
        src: "https://source.unsplash.com/random/600x400/?cloud",
        alt: "Cloud Platform",
      },
      link: {
        href: "/news/cloud-platform-launch",
        label: "Read More",
      },
      category: "Product Launch",
    },
    {
      id: "news2",
      title: "Partnership with Leading Healthcare Provider",
      excerpt:
        "MyEE announces strategic partnership to revolutionize healthcare technology solutions.",
      date: "2024-04-15",
      image: {
        src: "https://source.unsplash.com/random/600x400/?partnership",
        alt: "Partnership",
      },
      link: {
        href: "/news/healthcare-partnership",
        label: "Read More",
      },
      category: "Partnership",
    },
    {
      id: "news3",
      title: "MyEE Recognized as Industry Leader",
      excerpt:
        "MyEE has been recognized as an industry leader in enterprise solutions by Tech Analysts.",
      date: "2024-03-28",
      image: {
        src: "https://source.unsplash.com/random/600x400/?award",
        alt: "Award",
      },
      link: {
        href: "/news/industry-recognition",
        label: "Read More",
      },
      category: "Recognition",
    },
  ],
  viewAllLink: {
    href: "/news",
    label: "View All News",
  },
};

export const mockFooterData: FooterData = {
  logo: {
    src: "/logo.svg",
    alt: "MyEE Logo",
    width: 120,
    height: 40,
  },
  columns: [
    {
      title: "Products",
      links: [
        { href: "/products/ems", label: "Enterprise Management" },
        { href: "/products/cloud", label: "Cloud Infrastructure" },
        { href: "/products/analytics", label: "Data Analytics" },
        { href: "/products/security", label: "Security Suite" },
      ],
    },
    {
      title: "Solutions",
      links: [
        { href: "/solutions/healthcare", label: "Healthcare" },
        { href: "/solutions/finance", label: "Finance" },
        { href: "/solutions/manufacturing", label: "Manufacturing" },
        { href: "/solutions/retail", label: "Retail" },
      ],
    },
    {
      title: "Company",
      links: [
        { href: "/about", label: "About Us" },
        { href: "/careers", label: "Careers" },
        { href: "/contact", label: "Contact Us" },
        { href: "/partners", label: "Partners" },
      ],
    },
    {
      title: "Resources",
      links: [
        { href: "/blog", label: "Blog" },
        { href: "/resources/whitepapers", label: "Whitepapers" },
        { href: "/resources/case-studies", label: "Case Studies" },
        { href: "/resources/webinars", label: "Webinars" },
      ],
    },
  ],
  bottomLinks: [
    { href: "/privacy", label: "Privacy Policy" },
    { href: "/terms", label: "Terms of Service" },
    { href: "/cookies", label: "Cookie Policy" },
  ],
  copyright: "© 2024 MyEE. All rights reserved.",
  socialLinks: [
    { platform: "Twitter", url: "https://twitter.com", icon: "twitter" },
    { platform: "LinkedIn", url: "https://linkedin.com", icon: "linkedin" },
    { platform: "Facebook", url: "https://facebook.com", icon: "facebook" },
    { platform: "YouTube", url: "https://youtube.com", icon: "youtube" },
  ],
};

export const mockFloatingActionBarData: FloatingActionBarData = {
  actions: [
    {
      id: "action1",
      label: "Contact Us",
      icon: "mail",
      action: "link",
      target: "/contact",
    },
    {
      id: "action2",
      label: "Request Demo",
      icon: "presentation",
      action: "modal",
      target: "demo-modal",
    },
    {
      id: "action3",
      label: "Back to Top",
      icon: "arrow-up",
      action: "scroll",
      target: "top",
    },
  ],
};
