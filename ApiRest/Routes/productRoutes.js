import express from 'express';
import {
    getProducts,
    createProduct,
    updateProduct,
    deleteProduct,
    getProductById
} from '../controllers/productController.js';
import authMiddleware from '../middlewares/authMiddleware.js';
import roleMiddleware from '../middlewares/roleMiddleware.js';
import upload from '../lib/storage.js';

const router = express.Router();

// Get all products
router.get('/', getProducts);

// get product by id
router.get('/:id', getProductById);

// Create new product
router.post('/', authMiddleware, upload.single('image'), createProduct);

// Update product
router.put('/:id', authMiddleware, upload.single('image'), updateProduct);

// Delete product
router.delete('/:id', authMiddleware, roleMiddleware(['admin']), deleteProduct);

export default router;