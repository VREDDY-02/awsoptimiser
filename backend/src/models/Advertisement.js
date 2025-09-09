const mongoose = require('mongoose');

const AdvertisementSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Advertisement title is required'],
    trim: true,
    maxlength: [100, 'Title cannot exceed 100 characters']
  },
  description: {
    type: String,
    maxlength: [500, 'Description cannot exceed 500 characters']
  },
  image: {
    url: {
      type: String,
      required: [true, 'Advertisement image is required']
    },
    altText: String,
    width: Number,
    height: Number
  },
  link: {
    url: {
      type: String,
      required: [true, 'Advertisement link is required']
    },
    target: {
      type: String,
      enum: ['_blank', '_self', '_parent', '_top'],
      default: '_blank'
    },
    rel: {
      type: String,
      default: 'noopener noreferrer'
    }
  },
  position: {
    type: String,
    required: [true, 'Advertisement position is required'],
    enum: [
      'header-top',
      'header-bottom',
      'sidebar-left',
      'sidebar-right',
      'content-top',
      'content-middle',
      'content-bottom',
      'footer-top',
      'footer-bottom',
      'popup',
      'banner'
    ]
  },
  dimensions: {
    width: {
      type: Number,
      required: [true, 'Width is required']
    },
    height: {
      type: Number,
      required: [true, 'Height is required']
    },
    responsive: {
      type: Boolean,
      default: true
    }
  },
  targeting: {
    categories: [{
      type: String,
      enum: ['t-shirts', 'shoes', 'jeans', 'dresses', 'accessories', 'bags', 'jewelry', 'watches', 'other', 'all']
    }],
    devices: [{
      type: String,
      enum: ['desktop', 'tablet', 'mobile']
    }],
    locations: [{
      type: String // Country codes or city names
    }],
    demographics: {
      ageGroups: [{
        type: String,
        enum: ['13-17', '18-24', '25-34', '35-44', '45-54', '55+']
      }],
      interests: [String]
    }
  },
  schedule: {
    startDate: {
      type: Date,
      required: [true, 'Start date is required']
    },
    endDate: {
      type: Date,
      required: [true, 'End date is required']
    },
    timezone: {
      type: String,
      default: 'Asia/Kolkata'
    },
    days: [{
      type: String,
      enum: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday']
    }],
    hours: {
      start: String, // Format: HH:MM
      end: String    // Format: HH:MM
    }
  },
  budget: {
    type: {
      type: String,
      enum: ['cpm', 'cpc', 'fixed'],
      default: 'fixed'
    },
    amount: {
      type: Number,
      min: 0
    },
    currency: {
      type: String,
      default: 'INR'
    },
    dailyLimit: Number,
    totalBudget: Number
  },
  analytics: {
    impressions: {
      type: Number,
      default: 0
    },
    clicks: {
      type: Number,
      default: 0
    },
    ctr: {
      type: Number,
      default: 0
    },
    spent: {
      type: Number,
      default: 0
    },
    conversions: {
      type: Number,
      default: 0
    },
    lastTracked: {
      type: Date,
      default: Date.now
    }
  },
  status: {
    type: String,
    enum: ['draft', 'active', 'paused', 'completed', 'cancelled'],
    default: 'draft'
  },
  priority: {
    type: Number,
    min: 1,
    max: 10,
    default: 5
  },
  advertiser: {
    name: {
      type: String,
      required: [true, 'Advertiser name is required']
    },
    email: String,
    website: String,
    contactPerson: String
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Admin',
    required: true
  },
  approvedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Admin'
  },
  approvedAt: Date
}, {
  timestamps: true
});

// Virtual for CTR calculation
AdvertisementSchema.virtual('clickThroughRate').get(function() {
  if (this.analytics.impressions > 0) {
    return (this.analytics.clicks / this.analytics.impressions) * 100;
  }
  return 0;
});

// Virtual to check if ad is currently active
AdvertisementSchema.virtual('isCurrentlyActive').get(function() {
  const now = new Date();
  return this.status === 'active' && 
         now >= this.schedule.startDate && 
         now <= this.schedule.endDate;
});

// Method to track impression
AdvertisementSchema.methods.trackImpression = function() {
  this.analytics.impressions += 1;
  this.analytics.ctr = this.clickThroughRate;
  this.analytics.lastTracked = new Date();
  return this.save();
};

// Method to track click
AdvertisementSchema.methods.trackClick = function() {
  this.analytics.clicks += 1;
  this.analytics.ctr = this.clickThroughRate;
  this.analytics.lastTracked = new Date();
  return this.save();
};

// Index for efficient queries
AdvertisementSchema.index({ position: 1, status: 1, 'schedule.startDate': 1, 'schedule.endDate': 1 });
AdvertisementSchema.index({ status: 1, priority: -1 });
AdvertisementSchema.index({ 'targeting.categories': 1, status: 1 });

module.exports = mongoose.model('Advertisement', AdvertisementSchema);
