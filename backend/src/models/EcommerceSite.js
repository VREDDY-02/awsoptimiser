const mongoose = require('mongoose');

const EcommerceSiteSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Site name is required'],
    unique: true,
    trim: true
  },
  displayName: {
    type: String,
    required: [true, 'Display name is required'],
    trim: true
  },
  baseUrl: {
    type: String,
    required: [true, 'Base URL is required'],
    trim: true
  },
  logo: {
    url: String,
    altText: String
  },
  apiConfig: {
    hasApi: {
      type: Boolean,
      default: false
    },
    apiUrl: String,
    apiKey: String,
    rateLimitPerHour: {
      type: Number,
      default: 100
    }
  },
  scraping: {
    enabled: {
      type: Boolean,
      default: true
    },
    selectors: {
      price: String,
      availability: String,
      title: String,
      image: String
    },
    headers: {
      userAgent: String,
      referer: String
    }
  },
  features: {
    priceTracking: {
      type: Boolean,
      default: true
    },
    availabilityCheck: {
      type: Boolean,
      default: true
    },
    reviewSync: {
      type: Boolean,
      default: false
    }
  },
  affiliate: {
    enabled: {
      type: Boolean,
      default: false
    },
    affiliateId: String,
    commissionRate: {
      type: Number,
      min: 0,
      max: 100
    }
  },
  status: {
    type: String,
    enum: ['active', 'inactive', 'maintenance'],
    default: 'active'
  },
  lastSync: {
    type: Date
  },
  syncStats: {
    totalProducts: {
      type: Number,
      default: 0
    },
    successfulSyncs: {
      type: Number,
      default: 0
    },
    failedSyncs: {
      type: Number,
      default: 0
    },
    lastError: String
  }
}, {
  timestamps: true
});

// Index for efficient queries
EcommerceSiteSchema.index({ name: 1, status: 1 });

module.exports = mongoose.model('EcommerceSite', EcommerceSiteSchema);
