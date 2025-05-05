/**
 * Simple internationalization (i18n) utility
 */

// Default language
const DEFAULT_LANGUAGE = 'en';

// Available languages
export const AVAILABLE_LANGUAGES = ['en', 'zh'];

// Get current language from browser or localStorage
export function getCurrentLanguage(): string {
  if (typeof window === 'undefined') {
    return DEFAULT_LANGUAGE;
  }
  
  // Check localStorage first
  const savedLanguage = localStorage.getItem('language');
  if (savedLanguage && AVAILABLE_LANGUAGES.includes(savedLanguage)) {
    return savedLanguage;
  }
  
  // Check browser language
  const browserLanguage = navigator.language.split('-')[0];
  if (AVAILABLE_LANGUAGES.includes(browserLanguage)) {
    return browserLanguage;
  }
  
  return DEFAULT_LANGUAGE;
}

// Set current language
export function setCurrentLanguage(language: string): void {
  if (typeof window === 'undefined') {
    return;
  }
  
  if (AVAILABLE_LANGUAGES.includes(language)) {
    localStorage.setItem('language', language);
    window.location.reload();
  }
}

// Translation dictionaries
const translations: Record<string, Record<string, string>> = {
  en: {
    // Common
    'common.home': 'Home',
    'common.products': 'Products',
    'common.solutions': 'Solutions',
    'common.about': 'About',
    'common.contact': 'Contact',
    'common.news': 'News',
    'common.support': 'Support',
    'common.search': 'Search',
    'common.readMore': 'Read More',
    'common.viewAll': 'View All',
    'common.loading': 'Loading...',
    'common.error': 'An error occurred',
    'common.retry': 'Retry',
    
    // Products
    'products.title': 'Products',
    'products.description': 'Explore our range of industrial computing solutions',
    'products.featured': 'Featured Products',
    'products.new': 'New',
    'products.details': 'Product Details',
    'products.specifications': 'Specifications',
    'products.features': 'Features',
    'products.relatedProducts': 'Related Products',
    
    // Solutions
    'solutions.title': 'Solutions',
    'solutions.description': 'Industry-specific solutions for your business needs',
    'solutions.keyFeatures': 'Key Features',
    'solutions.benefits': 'Benefits',
    'solutions.caseStudies': 'Case Studies',
    
    // About
    'about.title': 'About Us',
    'about.description': 'Learn more about our company and mission',
    'about.history': 'Our History',
    'about.mission': 'Our Mission',
    'about.vision': 'Our Vision',
    'about.values': 'Our Values',
    'about.team': 'Our Team',
    
    // Contact
    'contact.title': 'Contact Us',
    'contact.description': 'Get in touch with our team',
    'contact.name': 'Name',
    'contact.email': 'Email',
    'contact.phone': 'Phone',
    'contact.message': 'Message',
    'contact.submit': 'Submit',
    'contact.success': 'Your message has been sent successfully',
    'contact.error': 'An error occurred while sending your message',
    
    // Footer
    'footer.copyright': '© 2023 Limyee. All rights reserved.',
    'footer.privacyPolicy': 'Privacy Policy',
    'footer.termsOfService': 'Terms of Service',
  },
  
  zh: {
    // Common
    'common.home': '首页',
    'common.products': '产品',
    'common.solutions': '解决方案',
    'common.about': '关于我们',
    'common.contact': '联系我们',
    'common.news': '新闻',
    'common.support': '支持',
    'common.search': '搜索',
    'common.readMore': '阅读更多',
    'common.viewAll': '查看全部',
    'common.loading': '加载中...',
    'common.error': '发生错误',
    'common.retry': '重试',
    
    // Products
    'products.title': '产品',
    'products.description': '探索我们的工业计算解决方案',
    'products.featured': '精选产品',
    'products.new': '新品',
    'products.details': '产品详情',
    'products.specifications': '规格',
    'products.features': '特点',
    'products.relatedProducts': '相关产品',
    
    // Solutions
    'solutions.title': '解决方案',
    'solutions.description': '满足您业务需求的行业特定解决方案',
    'solutions.keyFeatures': '主要特点',
    'solutions.benefits': '优势',
    'solutions.caseStudies': '案例研究',
    
    // About
    'about.title': '关于我们',
    'about.description': '了解更多关于我们公司和使命',
    'about.history': '我们的历史',
    'about.mission': '我们的使命',
    'about.vision': '我们的愿景',
    'about.values': '我们的价值观',
    'about.team': '我们的团队',
    
    // Contact
    'contact.title': '联系我们',
    'contact.description': '与我们的团队取得联系',
    'contact.name': '姓名',
    'contact.email': '电子邮件',
    'contact.phone': '电话',
    'contact.message': '留言',
    'contact.submit': '提交',
    'contact.success': '您的留言已成功发送',
    'contact.error': '发送留言时发生错误',
    
    // Footer
    'footer.copyright': '© 2023 Limyee. 保留所有权利。',
    'footer.privacyPolicy': '隐私政策',
    'footer.termsOfService': '服务条款',
  },
};

/**
 * Translate a key to the current language
 * @param key Translation key
 * @param params Optional parameters for interpolation
 * @returns Translated string
 */
export function t(key: string, params: Record<string, string> = {}): string {
  const language = getCurrentLanguage();
  const dictionary = translations[language] || translations[DEFAULT_LANGUAGE];
  
  let translation = dictionary[key] || key;
  
  // Replace parameters
  Object.entries(params).forEach(([param, value]) => {
    translation = translation.replace(`{${param}}`, value);
  });
  
  return translation;
}

/**
 * React hook for translations
 * @returns Translation function
 */
export function useTranslation() {
  return { t };
}
