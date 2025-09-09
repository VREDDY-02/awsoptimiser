const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const auth = require('../middleware/auth');
const upload = require('../middleware/upload');

// @route   POST /api/admin/products
// @desc    Add new product
// @access  Private (Admin)
router.post('/products', auth.adminAuth, upload.single('image'), adminController.addProduct);

// @route   PUT /api/admin/products/:id
// @desc    Update product
// @access  Private (Admin)
router.put('/products/:id', auth.adminAuth, upload.single('image'), adminController.updateProduct);

// @route   DELETE /api/admin/products/:id
// @desc    Delete product
// @access  Private (Admin)
router.delete('/products/:id', auth.adminAuth, adminController.deleteProduct);

// @route   POST /api/admin/products/bulk
// @desc    Bulk add products
// @access  Private (Admin)
router.post('/products/bulk', auth.adminAuth, adminController.bulkAddProducts);

// @route   POST /api/admin/products/analyze-image
// @desc    Analyze uploaded image and suggest products
// @access  Private (Admin)
router.post('/products/analyze-image', auth.adminAuth, upload.single('image'), adminController.analyzeImage);

// @route   GET /api/admin/dashboard/stats
// @desc    Get dashboard statistics
// @access  Private (Admin)
router.get('/dashboard/stats', auth.adminAuth, adminController.getDashboardStats);

// @route   GET /api/admin/products
// @desc    Get all products for admin
// @access  Private (Admin)
router.get('/products', auth.adminAuth, adminController.getAllProductsAdmin);

module.exports = router;
