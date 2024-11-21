import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const RecommendationCourses = () => {
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [studentId, setStudentId] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const studentDataFromStorage = localStorage.getItem('Nisha');
    if (studentDataFromStorage) {
      const student = JSON.parse(studentDataFromStorage);
      if (student && student._id) {
        setStudentId(student._id);
        console.log('Student ID retrieved from localStorage:', student._id);
      } else {
        console.error('Student ID is missing from the stored data');
      }
    } else {
      console.error('Student data not found in localStorage');
    }
  }, []);

  useEffect(() => {
    if (!studentId) return;

    const fetchRecommendations = async () => {
      try {
        const res = await axios.get(`http://localhost:4001/recommendations/get/${studentId}`);
        console.log('Fetched Recommendations:', res.data);
        setRecommendations(res.data.recommendations || []);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching recommendations:', err);
        setError('Failed to load recommendations.');
        setLoading(false);
      }
    };

    fetchRecommendations();
  }, [studentId]);

  const handleEnrollClick = (courseId) => {
    console.log("courseid: ", courseId);
    if (courseId) {
      navigate(`/CourseDetailsPage/${courseId}`);
    } else {
      console.error("Invalid course ID");
    }
  };

  if (loading) {
    return <p></p>;
  }

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  if (!recommendations.length) {
    return <p>No recommendations available.</p>;
  }

  return (
    <div className="mt-8 ml-11 mr-11 mb-11">
      <h2 className="text-2xl font-bold">Related Courses</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-4">
        {recommendations.map((course, index) => (
          <div key={course._id || index} className="bg-white rounded shadow-md p-4 flex flex-col">
            <img
              src={course.image || '/path/to/default-image.jpg'}
              alt={course.name || "Course"}
              className="w-full h-48 object-cover rounded-md"
            />
            <div className="mt-2 flex-grow">
              <p className="font-bold">{course.name || "Untitled Course"}</p>
              <p className="text-gray-500">{course.description || "No description available."}</p>
            </div>
            <button
              className="mt-4 bg-yellow-500 hover:bg-purple-600 font-bold text-white py-2 px-4 rounded-lg w-full"
              onClick={() => handleEnrollClick(course.courseId)}
            >
              Enroll Now
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecommendationCourses;
