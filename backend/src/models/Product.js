const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Product name is required'],
    trim: true,
    maxlength: [200, 'Product name cannot exceed 200 characters']
  },
  description: {
    type: String,
    required: [true, 'Product description is required'],
    maxlength: [1000, 'Description cannot exceed 1000 characters']
  },
  category: {
    type: String,
    required: [true, 'Category is required'],
    enum: ['t-shirts', 'shoes', 'jeans', 'dresses', 'accessories', 'bags', 'jewelry', 'watches', 'other']
  },
  brand: {
    type: String,
    required: [true, 'Brand is required'],
    trim: true
  },
  images: [{
    url: {
      type: String,
      required: true
    },
    altText: String,
    isPrimary: {
      type: Boolean,
      default: false
    }
  }],
  prices: [{
    site: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'EcommerceSite',
      required: true
    },
    price: {
      type: Number,
      required: true
    },
    currency: {
      type: String,
      default: 'INR'
    },
    url: {
      type: String,
      required: true
    },
    lastUpdated: {
      type: Date,
      default: Date.now
    },
    availability: {
      type: String,
      enum: ['in-stock', 'out-of-stock', 'limited', 'pre-order'],
      default: 'in-stock'
    }
  }],
  tags: [{
    type: String,
    trim: true
  }],
  trending: {
    score: {
      type: Number,
      default: 0,
      min: 0,
      max: 100
    },
    views: {
      type: Number,
      default: 0
    },
    clicks: {
      type: Number,
      default: 0
    },
    lastTrendingUpdate: {
      type: Date,
      default: Date.now
    }
  },
  seo: {
    title: String,
    description: String,
    keywords: [String]
  },
  status: {
    type: String,
    enum: ['active', 'inactive', 'draft'],
    default: 'active'
  },
  featured: {
    type: Boolean,
    default: false
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Admin',
    required: true
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Virtual for minimum price
ProductSchema.virtual('minPrice').get(function() {
  if (this.prices && this.prices.length > 0) {
    return Math.min(...this.prices.map(p => p.price));
  }
  return null;
});

// Virtual for price range
ProductSchema.virtual('priceRange').get(function() {
  if (this.prices && this.prices.length > 0) {
    const prices = this.prices.map(p => p.price);
    const min = Math.min(...prices);
    const max = Math.max(...prices);
    return { min, max };
  }
  return null;
});

// Index for search functionality
ProductSchema.index({
  name: 'text',
  description: 'text',
  brand: 'text',
  tags: 'text'
});

// Index for trending products
ProductSchema.index({ 'trending.score': -1, createdAt: -1 });

// Index for category filtering
ProductSchema.index({ category: 1, status: 1 });

// Middleware to update trending score
ProductSchema.methods.updateTrendingScore = function() {
  const viewWeight = 0.3;
  const clickWeight = 0.7;
  const maxViews = 10000; // Normalize against this value
  const maxClicks = 1000;
  
  const normalizedViews = Math.min(this.trending.views / maxViews, 1) * 100;
  const normalizedClicks = Math.min(this.trending.clicks / maxClicks, 1) * 100;
  
  this.trending.score = (normalizedViews * viewWeight + normalizedClicks * clickWeight);
  this.trending.lastTrendingUpdate = new Date();
};

module.exports = mongoose.model('Product', ProductSchema);
