import express from 'express';
import {
    getRecipes,
    createRecipe,
    updateRecipe,
    deleteRecipe,
} from '../controllers/recipeController.js';
import authMiddleware from '../middlewares/authMiddleware.js';
import roleMiddleware from '../middlewares/roleMiddleware.js';

const router = express.Router();

// Get all recipes
router.get('/', getRecipes);

// Create new recipe
router.post('/', authMiddleware, roleMiddleware(['admin']), createRecipe);

// Update recipe
router.put('/:id', authMiddleware, roleMiddleware(['admin']), updateRecipe);

// Delete recipe
router.delete('/:id', authMiddleware, roleMiddleware(['admin']), deleteRecipe);

export default router;