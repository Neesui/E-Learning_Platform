import mongoose from 'mongoose';
import Answer from '../models/AnswerModel.js';
import Quiz from '../models/QuizModel.js';

export const submitQuizAnswers = async (req, res) => {
    try {
        const { studentId } = req.params; // Ensure studentId is passed as a route parameter
        const { quizId, answers } = req.body;

        // Validation checks
        if (!studentId || !quizId || !answers || !Array.isArray(answers)) {
            return res.status(400).json({ error: "Student ID, Quiz ID, and answers array are required." });
        }

        // Fetch the quiz
        const quiz = await Quiz.findById(quizId);
        if (!quiz) {
            return res.status(404).json({ error: "Quiz not found." });
        }

        if (!quiz.questions || !Array.isArray(quiz.questions)) {
            return res.status(400).json({ error: "Quiz has no valid questions." });
        }

        // Initialize score and feedback
        let score = 0;
        const feedback = answers.map((submittedAnswer) => {
            const question = quiz.questions.find(
                (q) => q._id.toString() === submittedAnswer.questionId
            );

            if (!question) {
                return {
                    questionId: submittedAnswer.questionId,
                    correct: false,
                    message: "Invalid question ID.",
                };
            }

            const isCorrect = question.correctAnswer === submittedAnswer.selectedOption;
            if (isCorrect) score++;

            return {
                questionId: submittedAnswer.questionId,
                selectedOption: submittedAnswer.selectedOption,
                correctAnswer: question.correctAnswer,
                correct: isCorrect,
            };
        });

        // Save the answers with feedback to the database
        const savedAnswers = await Answer.create({
            student: studentId, // Assign the student ID
            quiz: quizId,
            answers: feedback.map(({ questionId, selectedOption, correct }) => ({
                questionId,
                selectedOption,
                isCorrect: correct,
            })),
        });

        return res.status(201).json({
            message: "Quiz submitted successfully.",
            score,
            feedback,
            savedAnswers,
        });
    } catch (error) {
        console.error("Error submitting quiz:", error.message, error.stack);
        res.status(500).json({ error: "Internal Server Error." });
    }
};


// Fetch all submitted answers for a student
export const getSubmittedAnswers = async (req, res) => {
    try {
        const { studentId } = req.params;

        const submittedAnswers = await Answer.find({ student: studentId }).populate('quiz');

        if (!submittedAnswers.length) {
            return res.status(404).json({ 
                success: false, 
                message: 'No quiz answers found for this student.' 
            });
        }

        return res.status(200).json({ 
            success: true, 
            data: submittedAnswers 
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ 
            success: false, 
            message: 'Server error. Please try again later.' 
        });
    }
};
