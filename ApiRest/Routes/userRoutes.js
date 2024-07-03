import express from 'express';
import { getUsers, deleteUser, updateUser, getUser } from '../controllers/userController.js';
import authMiddleware from '../middlewares/authMiddleware.js';
import roleMiddleware from '../middlewares/roleMiddleware.js';

const router = express.Router();

// Get todos los usuarios
router.get('/', authMiddleware, roleMiddleware(['admin']), getUsers);

// Get usuario por id
router.get('/:id', authMiddleware, roleMiddleware(['admin']), getUser);

// Update usuario
router.put('/:id', authMiddleware, roleMiddleware(['admin']), updateUser);

// Delete usuario
router.delete('/:id', authMiddleware, roleMiddleware(['admin']), deleteUser);

export default router;