import mongoose from 'mongoose';

const studentsSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            trim: true,
        },
        password: {
            type: String,
            required: true,
        },
        address: {
            type: String,
            required: true,
        },
        phoneNumber: {
            type: Number,
            required: true,
        },
        profilePicture: {
            type: String,
            default: "https://www.icon0.com/free/static2/preview2/stock-photo-cute-cartoon-girl-in-glasses-avatar-people-icon-character-cartoo-33356.jpg",
        },
        isVerified: {
            type: Boolean,
            default: false,
        },
        courses: [
            {
                courseId: { type: mongoose.Schema.Types.ObjectId, ref: "Course" },
                progress: [
                    {
                        videoId: mongoose.Schema.Types.ObjectId,
                        watchedSeconds: [Number],
                    },
                ],
                isCompleted: { type: Boolean, default: false },
            },
        ]
    },
    { timestamps: true }
);

// Check if the model already exists before defining it
const Student = mongoose.models.Student || mongoose.model('Student', studentsSchema);

export default Student;
