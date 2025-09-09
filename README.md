# Trending Commerce Hub 🛍️

A modern e-commerce aggregator platform that showcases trending fashion items from multiple e-commerce platforms, allowing users to compare prices and discover the best deals across different websites.

## 🌟 Features

### Customer Features
- **Trending Products Showcase**: Discover the latest trending fashion items
- **Multi-Platform Price Comparison**: Compare prices across Amazon, Flipkart, Myntra, and more
- **Category-based Browsing**: Browse by t-shirts, shoes, jeans, dresses, and accessories
- **Advanced Search**: Find exactly what you're looking for
- **Responsive Design**: Modern, Gen-Z friendly design that works on all devices
- **Price Tracking**: Get notified of price drops and deals

### Admin Features
- **Product Management**: Add, edit, and manage trending products
- **Image Analysis**: AI-powered product recommendation from uploaded images
- **Advertisement Management**: Create and manage banner ads with targeting
- **Analytics Dashboard**: Track views, clicks, and trending scores
- **Multi-platform Integration**: Connect with various e-commerce APIs
- **Automated Sync**: Keep prices and availability updated across platforms

## 🏗️ Architecture

```
trending-commerce-hub/
├── backend/           # Express.js API server
├── frontend/          # React customer-facing website
├── admin/            # React admin dashboard
├── shared/           # Shared utilities and constants
└── docs/             # Documentation
```

## 🚀 Quick Start

### Prerequisites
- Node.js (v18 or higher)
- MongoDB (local or Atlas)
- npm or yarn

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/your-username/trending-commerce-hub.git
cd trending-commerce-hub
```

2. **Install dependencies**
```bash
npm install
```

3. **Set up environment variables**
```bash
# Backend
cd backend
cp .env.example .env
# Edit .env with your configuration

# Frontend
cd ../frontend
# Create .env.local if needed

# Admin
cd ../admin
# Create .env.local if needed
```

4. **Start the development servers**
```bash
# From root directory
npm run dev
```

This will start:
- Backend API: http://localhost:5000
- Frontend: http://localhost:3000
- Admin Dashboard: http://localhost:3001

## 🛠️ Development

### Backend (Express.js + MongoDB)

#### Project Structure
```
backend/
├── src/
│   ├── config/       # Database and app configuration
│   ├── controllers/  # Request handlers
│   ├── middleware/   # Custom middleware
│   ├── models/       # MongoDB schemas
│   ├── routes/       # API routes
│   ├── services/     # Business logic
│   └── utils/        # Helper functions
└── tests/           # Test files
```

#### Key Technologies
- Express.js - Web framework
- MongoDB + Mongoose - Database
- JWT - Authentication
- Cloudinary - Image storage
- Bcrypt - Password hashing
- Helmet - Security
- Rate limiting - API protection

#### API Endpoints

##### Authentication
- `POST /api/auth/login` - Admin login
- `POST /api/auth/register` - Admin registration
- `GET /api/auth/me` - Get current user

##### Products
- `GET /api/products` - Get all products
- `GET /api/products/trending` - Get trending products
- `GET /api/products/:id` - Get single product
- `POST /api/products/search` - Search products

##### Admin
- `POST /api/admin/products` - Add product
- `PUT /api/admin/products/:id` - Update product
- `DELETE /api/admin/products/:id` - Delete product
- `POST /api/admin/products/analyze-image` - AI image analysis

##### Advertisements
- `GET /api/ads` - Get active ads
- `POST /api/ads` - Create ad (Admin)
- `PUT /api/ads/:id` - Update ad (Admin)
- `DELETE /api/ads/:id` - Delete ad (Admin)

### Frontend (React + Tailwind CSS)

#### Project Structure
```
frontend/
├── src/
│   ├── components/   # Reusable components
│   ├── pages/        # Page components
│   ├── hooks/        # Custom React hooks
│   ├── services/     # API services
│   ├── contexts/     # React contexts
│   ├── utils/        # Helper functions
│   └── assets/       # Static assets
└── public/          # Public files
```

#### Key Technologies
- React 18 - UI framework
- React Router - Client-side routing
- Tailwind CSS - Styling
- React Query - Data fetching
- Framer Motion - Animations
- React Helmet - SEO

### Admin Dashboard (React + Advanced UI)

#### Project Structure
```
admin/
├── src/
│   ├── components/   # Dashboard components
│   ├── pages/        # Dashboard pages
│   ├── hooks/        # Custom hooks
│   ├── services/     # API services
│   ├── contexts/     # Auth and app contexts
│   └── utils/        # Utilities
└── public/          # Public files
```

#### Key Technologies
- React 18 - UI framework
- Chart.js - Analytics charts
- React Hook Form - Form management
- React Dropzone - File uploads
- React Table - Data tables
- Yup - Form validation

## 🗄️ Database Schema

### Products
- Basic product information
- Multiple price entries from different sites
- Trending metrics (views, clicks, score)
- SEO metadata
- Image galleries

### E-commerce Sites
- Site configuration
- API credentials
- Scraping settings
- Sync statistics

### Advertisements
- Ad content and targeting
- Schedule and budget settings
- Performance analytics
- Position management

### Admin Users
- User authentication
- Role-based permissions
- Security features (2FA, rate limiting)
- Activity tracking

## 🔧 Configuration

### Environment Variables

#### Backend (.env)
```env
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/trending-commerce-hub
JWT_SECRET=your-super-secret-key
JWT_EXPIRE=30d

# Cloudinary (Image uploads)
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret

# E-commerce APIs
AMAZON_API_KEY=your-amazon-key
FLIPKART_API_KEY=your-flipkart-key
MYNTRA_API_KEY=your-myntra-key

# AI/ML Services
GOOGLE_VISION_API_KEY=your-vision-key
OPENAI_API_KEY=your-openai-key
```

## 🚢 Deployment

### Production Setup

1. **Build the applications**
```bash
npm run build
```

2. **Set production environment variables**
```bash
NODE_ENV=production
# Update all other environment variables for production
```

3. **Deploy using your preferred method**
- Docker containers
- Cloud platforms (AWS, Google Cloud, Azure)
- Traditional VPS hosting

### Docker Deployment
```bash
# Build and run with Docker
docker-compose up --build -d
```

## 📊 Features Deep Dive

### AI-Powered Product Recommendations
The system includes an AI-powered image analysis feature that:
- Analyzes uploaded product images using Google Vision API
- Suggests similar products from the database
- Recommends appropriate e-commerce platform links
- Automatically generates product tags and categories

### Price Comparison Engine
- Real-time price fetching from multiple platforms
- Historical price tracking
- Price drop notifications
- Availability monitoring across sites

### Analytics Dashboard
- Product performance metrics
- User engagement tracking
- Revenue analytics (affiliate commissions)
- Trending algorithm insights

### Advertisement System
- Strategic ad placement across the platform
- Targeting based on user preferences and behavior
- Performance tracking and optimization
- Revenue management for ad campaigns

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

For support and questions:
- Create an issue on GitHub
- Contact the development team
- Check the documentation in the `/docs` folder

## 🗺️ Roadmap

- [ ] Mobile app development (React Native)
- [ ] Advanced AI recommendations
- [ ] Social features (wish lists, sharing)
- [ ] Blockchain integration for authenticity
- [ ] Advanced analytics and reporting
- [ ] Multi-language support
- [ ] Cryptocurrency payment integration

---

Made with ❤️ by the Trending Commerce Hub Team
