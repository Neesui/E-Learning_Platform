import mongoose from 'mongoose';
import Quiz from '../models/QuizModel.js';
import Course from '../models/CoursesModel.js';

// 1. Admin creates a quiz for a specific course
export const createQuiz = async (req, res) => {
    try {
        const { courseId, questions } = req.body;

        // Validate input
        if (!mongoose.Types.ObjectId.isValid(courseId)) {
            return res.status(400).json({ error: 'Invalid courseId format' });
        }

        if (!Array.isArray(questions) || questions.length === 0) {
            return res.status(400).json({ error: 'Questions array is required and cannot be empty' });
        }
        for (const question of questions) {
            if (!question.questionText || !Array.isArray(question.options) || !question.correctAnswer) {
                return res.status(400).json({
                    error: 'Each question must have questionText, options, and correctAnswer',
                });
            }
        }

        // Check if the course exists
        const course = await Course.findById(courseId);
        if (!course) return res.status(404).json({ message: 'Course not found' });

        // Create a new quiz
        const newQuiz = new Quiz({ courseId, questions });
        await newQuiz.save();

        res.status(201).json({ message: 'Quiz created successfully', quiz: newQuiz });
    } catch (error) {
        console.error('Error creating quiz:', error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// 2. Fetch quiz for a specific course
export const getQuiz = async (req, res) => {
    try {
        const { courseId } = req.params;

        if (!mongoose.Types.ObjectId.isValid(courseId)) {
            return res.status(400).json({ error: 'Invalid courseId format' });
        }

        const quiz = await Quiz.findOne({ courseId });
        if (!quiz) return res.status(404).json({ message: 'Quiz not found for this course' });

        res.status(200).json({
            message: 'Quiz fetched successfully',
            quiz: {
                quizId: quiz._id,
                courseId: quiz.courseId,
                questions: quiz.questions,
            },
        });
    } catch (error) {
        console.error('Error fetching quiz:', error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
