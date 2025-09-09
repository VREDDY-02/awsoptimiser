// Product Categories
export const PRODUCT_CATEGORIES = [
  { value: 't-shirts', label: 'T-Shirts' },
  { value: 'shoes', label: 'Shoes' },
  { value: 'jeans', label: 'Jeans' },
  { value: 'dresses', label: 'Dresses' },
  { value: 'accessories', label: 'Accessories' },
  { value: 'bags', label: 'Bags' },
  { value: 'jewelry', label: 'Jewelry' },
  { value: 'watches', label: 'Watches' },
  { value: 'other', label: 'Other' }
];

// E-commerce Sites
export const ECOMMERCE_SITES = [
  { value: 'amazon', label: 'Amazon', color: '#FF9900' },
  { value: 'flipkart', label: 'Flipkart', color: '#047BD6' },
  { value: 'myntra', label: 'Myntra', color: '#FF3F6C' },
  { value: 'bewakoof', label: 'Bewakoof', color: '#FDD835' },
  { value: 'ajio', label: 'AJIO', color: '#D84315' },
  { value: 'nykaa', label: 'Nykaa', color: '#FC2779' },
  { value: 'snapdeal', label: 'Snapdeal', color: '#E40046' },
  { value: 'jabong', label: 'Jabong', color: '#8E24AA' }
];

// Advertisement Positions
export const AD_POSITIONS = [
  { value: 'header-top', label: 'Header Top' },
  { value: 'header-bottom', label: 'Header Bottom' },
  { value: 'sidebar-left', label: 'Sidebar Left' },
  { value: 'sidebar-right', label: 'Sidebar Right' },
  { value: 'content-top', label: 'Content Top' },
  { value: 'content-middle', label: 'Content Middle' },
  { value: 'content-bottom', label: 'Content Bottom' },
  { value: 'footer-top', label: 'Footer Top' },
  { value: 'footer-bottom', label: 'Footer Bottom' },
  { value: 'popup', label: 'Popup' },
  { value: 'banner', label: 'Banner' }
];

// Product Status
export const PRODUCT_STATUS = [
  { value: 'active', label: 'Active', color: 'green' },
  { value: 'inactive', label: 'Inactive', color: 'red' },
  { value: 'draft', label: 'Draft', color: 'yellow' }
];

// Admin Roles
export const ADMIN_ROLES = [
  { value: 'super-admin', label: 'Super Admin' },
  { value: 'admin', label: 'Admin' },
  { value: 'editor', label: 'Editor' }
];

// Currency Options
export const CURRENCIES = [
  { value: 'INR', label: '₹ Indian Rupee', symbol: '₹' },
  { value: 'USD', label: '$ US Dollar', symbol: '$' },
  { value: 'EUR', label: '€ Euro', symbol: '€' },
  { value: 'GBP', label: '£ British Pound', symbol: '£' }
];

// API Endpoints
export const API_ENDPOINTS = {
  // Auth
  LOGIN: '/api/auth/login',
  REGISTER: '/api/auth/register',
  LOGOUT: '/api/auth/logout',
  ME: '/api/auth/me',
  
  // Products
  PRODUCTS: '/api/products',
  TRENDING_PRODUCTS: '/api/products/trending',
  SEARCH_PRODUCTS: '/api/products/search',
  
  // Admin
  ADMIN_PRODUCTS: '/api/admin/products',
  ADMIN_DASHBOARD: '/api/admin/dashboard/stats',
  ANALYZE_IMAGE: '/api/admin/products/analyze-image',
  
  // Advertisements
  ADS: '/api/ads',
  
  // E-commerce
  ECOMMERCE_SITES: '/api/ecommerce/sites',
  PRICE_COMPARISON: '/api/ecommerce/prices'
};

// Default Values
export const DEFAULTS = {
  PAGE_SIZE: 20,
  MAX_FILE_SIZE: 5 * 1024 * 1024, // 5MB
  SUPPORTED_IMAGE_TYPES: ['image/jpeg', 'image/png', 'image/gif', 'image/webp'],
  TRENDING_SCORE_THRESHOLD: 50,
  CACHE_TTL: 5 * 60 * 1000 // 5 minutes
};

// Validation Rules
export const VALIDATION = {
  PRODUCT_NAME: {
    MIN_LENGTH: 3,
    MAX_LENGTH: 200
  },
  PRODUCT_DESCRIPTION: {
    MIN_LENGTH: 10,
    MAX_LENGTH: 1000
  },
  ADMIN_USERNAME: {
    MIN_LENGTH: 3,
    MAX_LENGTH: 30
  },
  ADMIN_PASSWORD: {
    MIN_LENGTH: 6
  }
};
