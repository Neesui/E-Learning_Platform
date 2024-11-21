import mongoose from 'mongoose';

// Define the schema for categories
const categorySchema = new mongoose.Schema({

    categoryName: {
        type: String,
        required: true,
        unique:true,
        trim: true // Removes extra spaces from beginning and end
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    imageUrl: {
        type: String,
        required: true,
        trim: true
    },
    level:{
        type: String,
        enum:['Intermediate', 'Advanced'],
        required: true
    }
}, { timestamps: true }); // Automatically manages 'createdAt' and 'updatedAt'

// Export the model
export default mongoose.model('Category', categorySchema);
