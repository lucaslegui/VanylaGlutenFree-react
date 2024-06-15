import express from 'express';
import {
    getProducts,
    createProduct,
    updateProduct,
    deleteProduct,
} from '../controllers/productController.js';
import authMiddleware from '../middlewares/authMiddleware.js';
import roleMiddleware from '../middlewares/roleMiddleware.js';

const router = express.Router();

// Get all products
router.get('/', getProducts);

// Create new product
router.post('/', authMiddleware, roleMiddleware(['admin']), createProduct);

// Update product
router.put('/:id', authMiddleware, roleMiddleware(['admin']), updateProduct);

// Delete product
router.delete('/:id', authMiddleware, roleMiddleware(['admin']), deleteProduct);

export default router;