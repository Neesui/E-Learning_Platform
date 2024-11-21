import mongoose from 'mongoose';

// Define the schema for storing answers to quiz questions
const answerSchema = new mongoose.Schema({
    student: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Student', // Reference to the Student model
        required: true,
    },
    quiz: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Quiz', // Reference to the Quiz model
        required: true,
    },
    answers: [
        {
            questionId: {
                type: mongoose.Schema.Types.ObjectId, // Reference to a question in the Quiz schema
                required: true,
            },
            selectedOption: {
                type: String, // Stores the option chosen by the student
                required: true,
            },
            isCorrect: {
                type: Boolean, // Indicates if the selected option is correct
                required: true,
            },
        },
    ],
}, { timestamps: true });

// Export the model
export default mongoose.model('Answer', answerSchema);
