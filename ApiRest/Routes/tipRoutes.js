import express from 'express';
import {
    getTips,
    createTip,
    updateTip,
    deleteTip,
} from '../controllers/tipController.js';
import authMiddleware from '../middlewares/authMiddleware.js';
import roleMiddleware from '../middlewares/roleMiddleware.js';

const router = express.Router();

// Get all tips
router.get('/', getTips);

// Create new tip
router.post('/', authMiddleware, roleMiddleware(['admin']), createTip);

// Update tip
router.put('/:id', authMiddleware, roleMiddleware(['admin']), updateTip);

// Delete tip
router.delete('/:id', authMiddleware, roleMiddleware(['admin']), deleteTip);

export default router;
