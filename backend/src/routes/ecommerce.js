const express = require('express');
const router = express.Router();
const ecommerceController = require('../controllers/ecommerceController');

// @route   GET /api/ecommerce/sites
// @desc    Get all supported e-commerce sites
// @access  Public
router.get('/sites', ecommerceController.getAllSites);

// @route   GET /api/ecommerce/prices/:productId
// @desc    Get live prices from all sites for a product
// @access  Public
router.get('/prices/:productId', ecommerceController.getLivePrices);

// @route   POST /api/ecommerce/sync
// @desc    Sync product data from e-commerce sites
// @access  Private (Admin)
router.post('/sync', ecommerceController.syncProductData);

// @route   GET /api/ecommerce/:site/:productId
// @desc    Redirect to specific e-commerce site product page
// @access  Public
router.get('/:site/:productId', ecommerceController.redirectToSite);

module.exports = router;
