import { Router } from 'express';
import { postCategory, categoryList, categoryDetails, updateCategory, deleteCategory } from '../controllers/CategoryController.js';

const router = Router();

// Define routes
router.post('/postcategories', postCategory);
router.get('/getcategories', categoryList);
router.get('/categories/:id', categoryDetails);
router.put('/categories/:id', updateCategory);
router.delete('/categories/:id', deleteCategory);

export default router;
