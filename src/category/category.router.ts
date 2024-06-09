import { Hono } from 'hono';
import { getAllCategories, getCategoryById, createCategory, updateCategory, deleteCategory, getCategoryByName } from './category.controller';

export const categoryRouter = new Hono();

// Get all categories      api/categories
categoryRouter.get('/categories', getAllCategories);
// Get a single category   api/categories/1
categoryRouter.get('/categories/:id', getCategoryById);
// Search categories by name  api/categories/search/name
categoryRouter.get('/categories/search/:name', getCategoryByName);
// Create a category       api/categories
categoryRouter.post('/categories', createCategory);
// Update a category       api/categories/1
categoryRouter.put('/categories/:id', updateCategory);
// Delete a category       api/categories/1
categoryRouter.delete('/categories/:id', deleteCategory);
