import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const CourseDetails = () => {
  const { courseId } = useParams(); // Get courseId from URL parameters
  const navigate = useNavigate(); // Initialize navigate hook
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch course details based on courseId
  const fetchCourseDetails = async () => {
    try {
      const response = await axios.get(`http://localhost:4001/courses/courseDetails/${courseId}`);
      setCourse(response.data);
    } catch (error) {
      console.error('Error fetching course details:', error);
      setError('Failed to load course details.');
    } finally {
      setLoading(false); // Ensure loading is set to false after fetching
    }
  };

  useEffect(() => {
    fetchCourseDetails(); // Fetch the course details on component mount
  }, [courseId]);

  // Handle "Start Now" button click
  const handleStartNow = () => {
    navigate(`/VideoSection?courseId=${courseId}`);
  };

  if (loading) return <p className="text-center">Loading...</p>;
  if (error) return <p className="text-red-500 text-center">{error}</p>;

  return (
    <div className="bg-blue-50 mt-[12vh]">
      <div className="p-8">
        <div className="bg-white shadow-md rounded p-6">
          <div className="flex">
            <div className="flex-1 pl-5">
              <h1 className="text-4xl font-bold">{course.courseName}</h1>
              <p className="mt-5 text-[22px]"><strong> Course Description:</strong> {course.description}</p>
              
              <button
                onClick={handleStartNow} // Navigate to VideoSection on button click
                className="mt-4 bg-red-500 text-white font-bold text-[22px] py-2 px-6 rounded hover:bg-red-600"
              >
                Start Now
              </button>
            </div>
            <div className="flex-shrink-0 w-1/3 ml-8">
              <img
                src={course.imageUrl}
                alt="Course thumbnail"
                className="rounded-lg shadow-md w-[50vh]"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetails;
