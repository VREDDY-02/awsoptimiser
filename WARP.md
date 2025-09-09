# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Project Overview

**Trending Commerce Hub** is a modern e-commerce aggregator platform built with a microservices-like monorepo architecture. It consists of three main applications:
- **Backend**: Express.js API server with MongoDB
- **Frontend**: React customer-facing website  
- **Admin**: React admin dashboard
- **Shared**: Common utilities and constants

The platform showcases trending fashion items from multiple e-commerce platforms, enabling price comparison and deal discovery across Amazon, Flipkart, Myntra, and other sites.

## Development Commands

### Essential Commands for Development

```bash
# Start all services in development mode
npm run dev

# Start individual services
npm run dev:backend    # Express.js API server (port 5000)
npm run dev:frontend   # React customer site (port 3000) 
npm run dev:admin      # React admin dashboard (port 3001)

# Build all applications
npm run build

# Build individual applications
npm run build:backend
npm run build:frontend
npm run build:admin
npm run build:shared

# Production start (backend only)
npm start

# Run tests
npm test                # All tests
npm run test:backend    # Backend Jest tests
npm run test:frontend   # Frontend React tests

# Code quality
npm run lint           # ESLint across all workspaces
npm run format         # Prettier formatting
```

### Backend-Specific Commands

```bash
# From backend/ directory
npm run dev            # Start with nodemon (auto-reload)
npm start              # Production start
npm test               # Run Jest tests
```

### Frontend/Admin-Specific Commands

```bash
# From frontend/ or admin/ directory
npm run dev            # Start development server
npm run build          # Create production build
npm test               # Run React tests
npm run eject          # Eject from Create React App (irreversible)
```

## Architecture & Key Patterns

### High-Level Architecture

This is a **monorepo workspace** using npm workspaces with three separate React/Node.js applications that communicate via REST APIs:

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Frontend      │    │   Admin         │    │   Backend       │
│   (React)       │────┤   (React)       │────┤   (Express.js)  │
│   Port: 3000    │    │   Port: 3001    │    │   Port: 5000    │
└─────────────────┘    └─────────────────┘    └─────────────────┘
                                               │
                                               ▼
                                        ┌─────────────────┐
                                        │   MongoDB       │
                                        │   Database      │
                                        └─────────────────┘
```

### Backend Architecture (Express.js + MongoDB)

**Key Pattern**: Traditional MVC with service layer
- **Controllers**: Handle HTTP requests/responses (`src/controllers/`)
- **Routes**: Define API endpoints (`src/routes/`)
- **Models**: Mongoose schemas for MongoDB (`src/models/`)
- **Services**: Business logic layer (`src/services/`)
- **Middleware**: Custom middleware including auth, upload, error handling (`src/middleware/`)
- **Config**: Database and application configuration (`src/config/`)

**Authentication**: JWT-based with admin-only access for protected endpoints.

**File Uploads**: Uses Multer + Cloudinary for image storage.

**Security Features**:
- Helmet.js for security headers
- Rate limiting (100 requests/15min for public, 200 for admin)
- CORS configuration for frontend/admin origins
- Input validation with express-validator

### Frontend Architecture (React 18 + Tailwind)

**Key Pattern**: Modern React with hooks and context
- **Component Structure**: Reusable components in `src/components/`
- **Page Components**: Route-level components in `src/pages/`
- **State Management**: React Query for server state + React Context
- **Styling**: Tailwind CSS with custom design system
- **Routing**: React Router v6 with nested routes
- **Performance**: Lazy loading, image optimization, code splitting

**Key Libraries**:
- **React Query**: Server state management and caching
- **Framer Motion**: Animations and micro-interactions
- **React Helmet**: SEO optimization
- **React Hot Toast**: User notifications

### Admin Dashboard Architecture (React + Advanced UI)

**Key Pattern**: Protected admin-only dashboard with comprehensive management features
- **Authentication Context**: JWT-based admin auth (`src/contexts/AuthContext`)
- **Protected Routes**: Route guards for admin access
- **Form Management**: React Hook Form + Yup validation
- **Data Tables**: React Table for complex data display
- **Charts**: Chart.js for analytics visualization
- **File Uploads**: React Dropzone for image uploads

**Admin Features**:
- Product management (CRUD operations)
- Advertisement management  
- Analytics dashboard with charts
- AI-powered image analysis
- Bulk product operations

### Key Integrations

**E-commerce Platform Integration**: 
- Multi-platform price fetching and comparison
- Product synchronization across platforms
- Real-time availability monitoring

**AI/ML Services**:
- Google Vision API for image analysis
- Product categorization and tagging
- Similar product recommendations

**Advertisement System**:
- Position-based ad placement
- Performance tracking and analytics
- Targeting based on user behavior

## Environment Configuration

### Backend Environment Variables

```bash
# Essential backend environment variables in backend/.env
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/trending-commerce-hub
JWT_SECRET=your-super-secret-key
JWT_EXPIRE=30d

# Image uploads (Cloudinary)
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret

# E-commerce APIs (optional for development)
AMAZON_API_KEY=your-amazon-key
FLIPKART_API_KEY=your-flipkart-key
MYNTRA_API_KEY=your-myntra-key

# AI/ML Services (optional)
GOOGLE_VISION_API_KEY=your-vision-key
OPENAI_API_KEY=your-openai-key

# Production URLs (for CORS)
FRONTEND_URL=https://your-frontend-url.com
ADMIN_URL=https://your-admin-url.com
```

### Development Setup Requirements

1. **Node.js**: v18 or higher (specified in package.json engines)
2. **MongoDB**: Local installation or MongoDB Atlas connection
3. **npm**: v8 or higher
4. **Environment**: Copy `backend/.env.example` to `backend/.env` and configure

### Database Schema Overview

**Products**: Core entity with trending metrics, multiple pricing from different sites, image galleries, and SEO metadata.

**E-commerce Sites**: Configuration for supported platforms with API credentials and sync statistics.

**Advertisements**: Banner ads with targeting rules, scheduling, and performance tracking.

**Admin Users**: JWT-based authentication with role permissions and security features.

## API Structure

The backend follows RESTful conventions with these main route groups:

- `/api/auth/*` - Authentication (login, register, profile)
- `/api/products/*` - Public product endpoints (search, browse, details)
- `/api/admin/*` - Protected admin operations (CRUD, analytics, image analysis)
- `/api/ads/*` - Advertisement endpoints (display and tracking)
- `/api/ecommerce/*` - Platform integration endpoints

**Response Format**: All APIs use consistent response structure with `success`, `data`, and optional `message` fields.

**Authentication**: Admin endpoints require JWT Bearer token in Authorization header.

## Testing Approach

- **Backend**: Jest with Supertest for API endpoint testing
- **Frontend/Admin**: React Testing Library with Jest for component testing
- **Integration**: API integration tests cover authentication flows and CRUD operations

## Common Development Workflows

### Adding a New Product Feature

1. **Backend**: Create/modify controller in `backend/src/controllers/`
2. **Backend**: Add route in `backend/src/routes/`
3. **Backend**: Update model schema if needed in `backend/src/models/`
4. **Frontend**: Create API service function in `frontend/src/services/`
5. **Frontend**: Implement UI components and pages
6. **Admin**: Add admin interface for management if needed

### Adding a New Admin Feature

1. **Backend**: Add admin route in `backend/src/routes/admin.js`
2. **Backend**: Implement controller logic with proper admin authentication
3. **Admin**: Create new page in `admin/src/pages/dashboard/`
4. **Admin**: Add route to `admin/src/App.js`
5. **Admin**: Update navigation if needed

### Database Changes

1. **Models**: Update Mongoose schemas in `backend/src/models/`
2. **Migration**: Consider data migration scripts for production
3. **API**: Update controllers to handle new fields
4. **Frontend**: Update API services and UI to support new data

## Deployment Notes

**Docker Support**: The project includes `docker-compose.yml` for containerized deployment.

**Build Process**: Each application has its own build process - frontend/admin create static builds, backend runs directly with Node.js.

**Environment**: Production requires different CORS origins and security configurations in backend.

**Database**: MongoDB connection should use production connection string with proper authentication and SSL.
