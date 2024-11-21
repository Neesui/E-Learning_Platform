import React, { useState } from 'react';

const Frontend_Development = () => {
  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState('');
  const [totalReviews, setTotalReviews] = useState(0);
  const [sumOfRatings, setSumOfRatings] = useState(0);

  const handleRating = (value) => {
    setRating(value);
  };

  const handleSubmit = () => {
    if (rating > 0) {
      setTotalReviews(prev => prev + 1);
      setSumOfRatings(prev => prev + rating);
      alert(`Rating: ${rating} stars\nFeedback: ${feedback}`);
    } else {
      alert("Please provide a rating before submitting your feedback.");
    }
  };

  const averageRating = totalReviews > 0 ? (sumOfRatings / totalReviews).toFixed(1) : 0;

  return (
    <div className="bg-blue-50 mt-[12vh]">
      <div className="p-8">
        <div className="bg-white shadow-md rounded p-6">
          <div className="flex">
            <div className="flex-1">
              <h1 className="text-3xl font-bold">Web Development using MERN Stack</h1>
              <div className="flex items-center space-x-2 mt-2">
                <span className="text-yellow-500">★★★★★</span>
                <span>{averageRating} ({totalReviews} Reviews)</span>
              </div>
              <p className="mt-4 text-lg">
                <strong>Categories:</strong> Web Design
              </p>
              <p><strong>Lectures No:</strong> 3</p>
              <p><strong>Certificate:</strong> Free certificate after completing the course</p>
              <p><strong>Add to Wishlist</strong></p>
              <p className="text-red-600 mt-4">
                To Register in Course you have to watch at least 30 minutes of any lesson
              </p>
              <button className="mt-4 bg-red-500 text-white py-2 px-6 rounded hover:bg-red-600">
                Start Now
              </button>
            </div>
            <div className="flex-shrink-0 w-1/3">
              <img
                src="https://via.placeholder.com/150"
                alt="Course thumbnail"
                className="rounded-lg shadow-md"
              />
            </div>
          </div>
        </div>

        <div className="mt-8">
          <h2 className="text-2xl font-bold">Lesson 6</h2>
          <div className="grid grid-cols-3 gap-4 mt-4">
            {/* {Array(3).fill(0).map((_, i) => ( */}
              <div  className="bg-white rounded shadow-md p-4">
                <img
                  src="https://via.placeholder.com/150"
                  alt="Lesson Thumbnail"
                  className="w-full rounded-md"
                />
                <div className="mt-2">
                  <p className="font-bold">Learn The MERN Stack Series Introduction</p>
                  <span className="text-gray-500">1:20:30</span>
                </div>
              </div>
            {/* ))} */}
          </div>
        </div>

        <div className="mt-8">
          <h2 className="text-2xl font-bold">Related Videos</h2>
          <div className="grid grid-cols-3 gap-4 mt-4">
            {/* {Array(3).fill(0).map((_, i) => ( */}
              <div  className="bg-white rounded shadow-md p-4">
                <img
                  src="https://via.placeholder.com/150"
                  alt="Related Video"
                  className="w-full rounded-md"
                />
                <div className="mt-2">
                  <p className="font-bold">Learn The MERN Stack Series Introduction</p>
                  <span className="text-gray-500">1:20:30</span>
                </div>
              </div>
            {/* ))} */}
          </div>
        </div>

        {/* Feedback Section */}
        <div className="mt-12 pl-[10vh]">
          <h1 className="text-[5vh] font-bold">We Appreciate Your Feedback</h1>
          <p className="text-[3vh] mt-3 font-bold">How Much Stars ?</p>
          <div className="rating mt-2">
            <input type="radio" name="rating-4" className="mask mask-star-2 bg-yellow-500" />
            <input type="radio" name="rating-4" className="mask mask-star-2 bg-yellow-500" defaultChecked />
            <input type="radio" name="rating-4" className="mask mask-star-2 bg-yellow-500" />
            <input type="radio" name="rating-4" className="mask mask-star-2 bg-yellow-500" />
            <input type="radio" name="rating-4" className="mask mask-star-2 bg-yellow-500" />
          </div>
        </div>
          <div className="mt-8 w-[60vh] pl-[10vh]">
            <input type="text" placeholder="Write your review here" className="border p-2 w-[50vh]  placeholder:text-[18px]  font-bold rounded"/>
            <button className="bg-green-700 text-white p-2 mt-2 w-[25vh] font-bold text-[3vh] rounded">Review Now</button>
          </div>

      </div>
    </div>
  );
};

export default Frontend_Development;
