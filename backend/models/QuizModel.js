import mongoose from 'mongoose';

// Define the schema for individual questions
const QuestionSchema = new mongoose.Schema({
    questionText: { 
        type: String, 
        required: true 
    },
    options: [
        {
            type: String, 
            required: true 
        }
    ],
    correctAnswer: { 
        type: String, 
        required: true 
    },
}, { timestamps: true }); // _id: false to prevent each question from having its own unique _id

// Define the quiz schema
const quizSchema = new mongoose.Schema({
    courseId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course', // Assuming you have a Course model
        required: true,
    },
    questions: [QuestionSchema], // An array of questions
}, { timestamps: true }); // Will auto-generate createdAt and updatedAt fields

// Export the model
export default mongoose.model('Quiz', quizSchema);
