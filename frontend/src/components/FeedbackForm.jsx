import React, { useState } from 'react';
import axios from 'axios';

const FeedbackForm = ({ courseId, videoId }) => {
    const [feedback, setFeedback] = useState('');
    const [rating, setRating] = useState(1); // Default rating
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleRatingChange = (event) => {
        setRating(Number(event.target.value)); // Update rating based on user selection
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const studentId = JSON.parse(localStorage.getItem('Nisha')).id; // Get student ID from local storage
            const response = await axios.post('/api/feedback', {
                studentId,
                courseId,
                videoId,
                feedback,
                rating,
            });
            setSuccessMessage(response.data.message);
            setFeedback('');
            setRating(1); // Reset rating after submission
        } catch (error) {
            setErrorMessage('Failed to submit feedback.');
        }
    };

    return (
        <>
            <div className='pl-6 mb-6'>
                <div className='mt-4 w-[60vh] bg-white rounded-lg shadow-md p-6'>
                    <div className="pl-4">
                        <h1 className="text-[3vh] font-bold">We Appreciate Your Feedback</h1>
                        <div className="flex items-center mt-4 space-x-4">
                            <img
                                className="w-16 h-16 rounded-full"
                                src="https://via.placeholder.com/150"
                                alt="Avatar"
                            />
                            <h1 className="font-bold text-xl">Yg_NeeshU</h1>
                        </div>
                        <p className="text-[2.5vh] mt-3 font-semibold">How Many Stars?</p>
                        <div className="rating mt-3">
                            {[1, 2, 3, 4, 5].map((star) => (
                                <label key={star}>
                                    <input
                                        type="radio"
                                        name="rating"
                                        value={star}
                                        className="mask mask-star-2 bg-gray-200"
                                        checked={rating === star}
                                        onChange={handleRatingChange}
                                    />
                                </label>
                            ))}
                        </div>
                    </div>
                    <div className="mt-4 pl-4">
                        <textarea
                            value={feedback}
                            onChange={(e) => setFeedback(e.target.value)}
                            className="w-[90%] p-3 border border-gray-300 rounded-lg placeholder:text-[2vh]"
                            rows="4"
                            placeholder="Write your feedback..."
                        ></textarea>
                        <button
                            className="bg-green-700 text-white p-3 mt-4 w-[25vh] font-bold text-[2.5vh] rounded hover:bg-green-600"
                            onClick={handleSubmit}
                        >
                            Submit Review
                        </button>
                    </div>
                    {successMessage && <p className="text-green-600 pl-4 mt-3">{successMessage}</p>}
                    {errorMessage && <p className="text-red-600 pl-4 mt-3">{errorMessage}</p>}
                </div>
            </div>
        </>
    );
};

export default FeedbackForm;
