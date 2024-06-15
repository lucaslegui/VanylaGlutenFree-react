import express from 'express';
import {
    getCourses,
    createCourse,
    updateCourse,
    deleteCourse,
} from '../controllers/courseController.js';
import authMiddleware from '../middlewares/authMiddleware.js';
import roleMiddleware from '../middlewares/roleMiddleware.js';

const router = express.Router();

// Get all courses
router.get('/', getCourses);

// Create new course
router.post('/', authMiddleware, roleMiddleware(['admin']), createCourse);

// Update course
router.put('/:id', authMiddleware, roleMiddleware(['admin']), updateCourse);

// Delete course
router.delete('/:id', authMiddleware, roleMiddleware(['admin']), deleteCourse);

export default router;