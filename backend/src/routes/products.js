const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

// @route   GET /api/products
// @desc    Get all trending products
// @access  Public
router.get('/', productController.getAllProducts);

// @route   GET /api/products/trending
// @desc    Get trending products with filters
// @access  Public
router.get('/trending', productController.getTrendingProducts);

// @route   GET /api/products/category/:category
// @desc    Get products by category
// @access  Public
router.get('/category/:category', productController.getProductsByCategory);

// @route   GET /api/products/:id
// @desc    Get single product
// @access  Public
router.get('/:id', productController.getProductById);

// @route   GET /api/products/:id/prices
// @desc    Get price comparison for a product
// @access  Public
router.get('/:id/prices', productController.getProductPrices);

// @route   POST /api/products/search
// @desc    Search products
// @access  Public
router.post('/search', productController.searchProducts);

module.exports = router;
