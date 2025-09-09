# Trending Commerce Hub API Documentation

## Base URL
- Development: `http://localhost:5000`
- Production: `https://api.trending-commerce-hub.com`

## Authentication
Most admin endpoints require JWT authentication. Include the token in the Authorization header:
```
Authorization: Bearer <your-jwt-token>
```

## Response Format
All API responses follow this format:

### Success Response
```json
{
  "success": true,
  "data": {...},
  "message": "Optional success message"
}
```

### Error Response
```json
{
  "success": false,
  "error": "Error message",
  "details": "Optional detailed error information"
}
```

## Endpoints

### Authentication

#### POST /api/auth/login
Login admin user
```json
Request:
{
  "email": "admin@example.com",
  "password": "password123"
}

Response:
{
  "success": true,
  "data": {
    "user": {
      "id": "user_id",
      "email": "admin@example.com",
      "firstName": "John",
      "lastName": "Doe",
      "role": "admin"
    },
    "token": "jwt_token_here"
  }
}
```

#### POST /api/auth/register
Register new admin user
```json
Request:
{
  "username": "johndoe",
  "email": "admin@example.com",
  "password": "password123",
  "firstName": "John",
  "lastName": "Doe"
}

Response:
{
  "success": true,
  "data": {
    "user": {...},
    "token": "jwt_token_here"
  }
}
```

#### GET /api/auth/me
Get current user information (Protected)
```json
Response:
{
  "success": true,
  "data": {
    "id": "user_id",
    "username": "johndoe",
    "email": "admin@example.com",
    "firstName": "John",
    "lastName": "Doe",
    "role": "admin"
  }
}
```

### Products

#### GET /api/products
Get all active products
```
Query Parameters:
- page: number (default: 1)
- limit: number (default: 20)
- category: string (optional)
- sort: string (trending, newest, price-low, price-high)
```

```json
Response:
{
  "success": true,
  "data": {
    "products": [...],
    "pagination": {
      "currentPage": 1,
      "totalPages": 5,
      "totalProducts": 100,
      "hasNext": true,
      "hasPrev": false
    }
  }
}
```

#### GET /api/products/trending
Get trending products
```
Query Parameters:
- limit: number (default: 20)
- category: string (optional)
```

#### GET /api/products/:id
Get single product
```json
Response:
{
  "success": true,
  "data": {
    "id": "product_id",
    "name": "Trendy T-Shirt",
    "description": "...",
    "category": "t-shirts",
    "brand": "Brand Name",
    "images": [...],
    "prices": [
      {
        "site": {
          "name": "amazon",
          "displayName": "Amazon"
        },
        "price": 999,
        "currency": "INR",
        "url": "https://amazon.in/product/123",
        "availability": "in-stock",
        "lastUpdated": "2024-01-01T00:00:00.000Z"
      }
    ],
    "trending": {
      "score": 85,
      "views": 1500,
      "clicks": 120
    },
    "minPrice": 999,
    "priceRange": {
      "min": 999,
      "max": 1299
    }
  }
}
```

#### POST /api/products/search
Search products
```json
Request:
{
  "query": "trending t-shirt",
  "category": "t-shirts",
  "priceRange": {
    "min": 500,
    "max": 2000
  },
  "brands": ["Brand1", "Brand2"],
  "page": 1,
  "limit": 20
}

Response:
{
  "success": true,
  "data": {
    "products": [...],
    "pagination": {...},
    "filters": {
      "categories": [...],
      "brands": [...],
      "priceRange": {
        "min": 100,
        "max": 5000
      }
    }
  }
}
```

### Admin Products

#### POST /api/admin/products (Protected)
Add new product
```json
Request (multipart/form-data):
{
  "name": "New Product",
  "description": "Product description",
  "category": "t-shirts",
  "brand": "Brand Name",
  "tags": ["trendy", "summer"],
  "image": <file>,
  "prices": [
    {
      "site": "site_id",
      "price": 999,
      "url": "https://example.com/product"
    }
  ]
}

Response:
{
  "success": true,
  "data": {
    "id": "new_product_id",
    ...
  },
  "message": "Product created successfully"
}
```

#### PUT /api/admin/products/:id (Protected)
Update product
Similar to create but with product ID in URL

#### DELETE /api/admin/products/:id (Protected)
Delete product
```json
Response:
{
  "success": true,
  "message": "Product deleted successfully"
}
```

#### POST /api/admin/products/analyze-image (Protected)
Analyze uploaded image for product suggestions
```json
Request (multipart/form-data):
{
  "image": <file>
}

Response:
{
  "success": true,
  "data": {
    "analysis": {
      "labels": ["clothing", "t-shirt", "casual"],
      "colors": ["blue", "white"],
      "suggestions": {
        "category": "t-shirts",
        "tags": ["casual", "trendy"],
        "similarProducts": [...]
      }
    }
  }
}
```

### Advertisements

#### GET /api/ads
Get active advertisements
```
Query Parameters:
- position: string (header-top, sidebar-left, etc.)
- limit: number
```

#### GET /api/ads/position/:position
Get ads for specific position
```json
Response:
{
  "success": true,
  "data": [
    {
      "id": "ad_id",
      "title": "Summer Sale",
      "image": {
        "url": "https://example.com/ad.jpg",
        "altText": "Summer Sale Ad"
      },
      "link": {
        "url": "https://example.com/sale",
        "target": "_blank"
      },
      "position": "header-top",
      "dimensions": {
        "width": 728,
        "height": 90
      }
    }
  ]
}
```

#### POST /api/ads (Protected)
Create advertisement
```json
Request (multipart/form-data):
{
  "title": "Ad Title",
  "description": "Ad description",
  "banner": <file>,
  "link": "https://example.com",
  "position": "header-top",
  "dimensions": {
    "width": 728,
    "height": 90
  },
  "schedule": {
    "startDate": "2024-01-01",
    "endDate": "2024-12-31"
  },
  "targeting": {
    "categories": ["t-shirts"],
    "devices": ["desktop", "mobile"]
  }
}
```

#### POST /api/ads/:id/click
Track ad click
```json
Request:
{
  "userAgent": "user_agent_string",
  "referrer": "http://example.com"
}

Response:
{
  "success": true,
  "data": {
    "redirectUrl": "https://advertiser.com/product"
  }
}
```

### E-commerce Integration

#### GET /api/ecommerce/sites
Get all supported e-commerce sites
```json
Response:
{
  "success": true,
  "data": [
    {
      "id": "site_id",
      "name": "amazon",
      "displayName": "Amazon",
      "logo": {
        "url": "https://example.com/amazon-logo.png"
      },
      "status": "active"
    }
  ]
}
```

#### GET /api/ecommerce/prices/:productId
Get live prices for product
```json
Response:
{
  "success": true,
  "data": {
    "productId": "product_id",
    "prices": [
      {
        "site": {...},
        "price": 999,
        "currency": "INR",
        "availability": "in-stock",
        "url": "https://amazon.in/product/123",
        "lastUpdated": "2024-01-01T00:00:00.000Z"
      }
    ],
    "lowestPrice": {
      "site": "amazon",
      "price": 899
    },
    "highestPrice": {
      "site": "myntra",
      "price": 1299
    }
  }
}
```

### Dashboard & Analytics

#### GET /api/admin/dashboard/stats (Protected)
Get dashboard statistics
```json
Response:
{
  "success": true,
  "data": {
    "products": {
      "total": 150,
      "active": 140,
      "draft": 10,
      "trending": 25
    },
    "views": {
      "today": 1250,
      "thisWeek": 8900,
      "thisMonth": 35000
    },
    "clicks": {
      "today": 450,
      "thisWeek": 3200,
      "thisMonth": 12000
    },
    "ads": {
      "active": 5,
      "impressions": 50000,
      "clicks": 2500,
      "ctr": 5.0
    },
    "topCategories": [
      {
        "category": "t-shirts",
        "count": 45,
        "percentage": 30
      }
    ],
    "recentActivity": [...]
  }
}
```

## Error Codes

- `400` - Bad Request (validation errors, missing parameters)
- `401` - Unauthorized (invalid or missing token)
- `403` - Forbidden (insufficient permissions)
- `404` - Not Found (resource doesn't exist)
- `409` - Conflict (duplicate resource)
- `422` - Unprocessable Entity (business logic errors)
- `429` - Too Many Requests (rate limiting)
- `500` - Internal Server Error

## Rate Limiting

API endpoints are rate-limited:
- Public endpoints: 100 requests per 15 minutes per IP
- Admin endpoints: 200 requests per 15 minutes per user
- Image upload endpoints: 10 requests per minute per user

## Pagination

All list endpoints support pagination:
```
?page=1&limit=20
```

Pagination response format:
```json
{
  "pagination": {
    "currentPage": 1,
    "totalPages": 10,
    "totalItems": 200,
    "limit": 20,
    "hasNext": true,
    "hasPrev": false
  }
}
```

## File Upload

File upload endpoints accept:
- Max file size: 5MB
- Supported formats: JPEG, PNG, GIF, WebP
- Form field name: `image` or `banner`

## Webhooks

The system supports webhooks for real-time updates:
- Product updates
- Price changes
- New trending items
- Advertisement performance

Configure webhook URLs in the admin dashboard.
