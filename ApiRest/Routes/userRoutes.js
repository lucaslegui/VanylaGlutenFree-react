import express from 'express';
import { getUsers, deleteUser } from '../controllers/userController.js';
import authMiddleware from '../middlewares/authMiddleware.js';
import roleMiddleware from '../middlewares/roleMiddleware.js';

const router = express.Router();

// Get todos los usuarios
router.get('/', authMiddleware, roleMiddleware(['admin']), getUsers);

// Delete usuario
router.delete('/:id', authMiddleware, roleMiddleware(['admin']), deleteUser);

export default router;