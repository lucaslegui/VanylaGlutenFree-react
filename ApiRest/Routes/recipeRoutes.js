import express from 'express';
import {
    getRecipes,
    getRecipeById,
    createRecipe,
    updateRecipe,
    deleteRecipe,
} from '../controllers/recipeController.js';
import authMiddleware from '../middlewares/authMiddleware.js';
import roleMiddleware from '../middlewares/roleMiddleware.js';
import upload from '../lib/storage.js';

const router = express.Router();

// Get all recipes
router.get('/', getRecipes);

// Get recipe by id
router.get('/:id', getRecipeById);

// Create new recipe
router.post('/', authMiddleware, roleMiddleware(['admin']), upload.single('image'), createRecipe);

// Update recipe
router.put('/:id', authMiddleware, roleMiddleware(['admin']), upload.single('image'), updateRecipe);

// Delete recipe
router.delete('/:id', authMiddleware, roleMiddleware(['admin']), deleteRecipe);

export default router;