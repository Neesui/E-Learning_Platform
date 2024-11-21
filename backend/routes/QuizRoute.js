import express from 'express';
import { createQuiz, getQuiz } from '../controllers/QuizController.js';

const router = express.Router();

// Route for creating a quiz (admin only)
router.post('/create', createQuiz);
router.get('/get/:courseId', getQuiz);
// Route for submitting quiz answers (student)
// router.post('/submit', submitQuiz);

// Route for fetching a student's certificate (admin only)
// router.get('/certificate/student/:studentId/course/:courseId', getStudentCertificate);

export default router;
