import express from 'express';
import { getStudentRecommendations } from '../controllers/RecommendationController.js';

const router = express.Router();

// Route to get course recommendations based on studentId
router.get('/get/:studentId', getStudentRecommendations);

export default router;
