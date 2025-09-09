const express = require('express');
const router = express.Router();
const adController = require('../controllers/adController');
const auth = require('../middleware/auth');
const upload = require('../middleware/upload');

// @route   GET /api/ads
// @desc    Get active advertisements
// @access  Public
router.get('/', adController.getActiveAds);

// @route   GET /api/ads/position/:position
// @desc    Get ads for specific position (header, sidebar, footer, etc.)
// @access  Public
router.get('/position/:position', adController.getAdsByPosition);

// @route   POST /api/ads
// @desc    Create new advertisement
// @access  Private (Admin)
router.post('/', auth.adminAuth, upload.single('banner'), adController.createAd);

// @route   PUT /api/ads/:id
// @desc    Update advertisement
// @access  Private (Admin)
router.put('/:id', auth.adminAuth, upload.single('banner'), adController.updateAd);

// @route   DELETE /api/ads/:id
// @desc    Delete advertisement
// @access  Private (Admin)
router.delete('/:id', auth.adminAuth, adController.deleteAd);

// @route   PUT /api/ads/:id/toggle
// @desc    Toggle advertisement active status
// @access  Private (Admin)
router.put('/:id/toggle', auth.adminAuth, adController.toggleAdStatus);

// @route   POST /api/ads/:id/click
// @desc    Track ad click
// @access  Public
router.post('/:id/click', adController.trackClick);

// @route   GET /api/ads/:id/stats
// @desc    Get advertisement statistics
// @access  Private (Admin)
router.get('/:id/stats', auth.adminAuth, adController.getAdStats);

module.exports = router;
