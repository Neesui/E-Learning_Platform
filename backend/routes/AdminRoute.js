import express from 'express';
import { addAdmin, login } from '../controllers/AdminController.js';
import { logout } from '../controllers/AdminController.js';

const router = express.Router();

// Route to add a new admin
router.post('/add', addAdmin);
router.post('/login', login);
router.post('/logout', logout);


export default router;
