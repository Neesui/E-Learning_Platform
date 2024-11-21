import express from 'express';
import { getStudentRecommendations } from '../controllers/RecommendationController.js'; // Import the controller

const router = express.Router();

// Route to get similar course recommendations based on courseId
router.get('/get/:studentId', getStudentRecommendations);

export default router;
