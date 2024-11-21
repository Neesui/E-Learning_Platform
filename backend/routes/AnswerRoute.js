import express from 'express';
import { submitQuizAnswers, getSubmittedAnswers } from '../controllers/AnswerController.js';

const router = express.Router();

router.post('/submit/:studentId', submitQuizAnswers);
router.get('/quiz/answers/:studentId', getSubmittedAnswers);

export default router;
