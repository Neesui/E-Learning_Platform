import React, { useEffect, useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

function OurCourses() {
  const { keyword = "" } = useParams();
  const [categories, setCategories] = useState([]);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Fetch categories from the database
  const fetchCategories = async () => {
    try {
      const response = await axios.get('http://localhost:4001/categories/getcategories');
      setCategories(response.data);
    } catch (error) {
      console.error('Error fetching categories:', error);
      setError('Failed to load categories.');
    }
  };

  // Fetch courses from the database
  const fetchCourses = async () => {
    try {
      const response = await axios.get('http://localhost:4001/courses/getCourses', {
        params: { keyword }
      });
      setCourses(response.data.courses || []);
    } catch (error) {
      console.error('Error fetching courses:', error);
      setError('Failed to load courses.');
    }
  };

  // Check if student is logged in
  const isStudentLoggedIn = () => {
    return !!localStorage.getItem('Nisha'); // Check for login token/key in local storage
  };

  // Handle enroll click
  const handleEnrollClick = (courseId) => {
    if (isStudentLoggedIn()) {
      navigate(`/CourseDetailsPage/${courseId}`);
    } else {
      navigate('/login'); // Redirect to login if not logged in
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      await fetchCategories();
      await fetchCourses();
      setLoading(false);
    };
    fetchData();
  }, [keyword]);

  if (loading) return <p className="text-center">Loading...</p>;
  if (error) return <p className="text-red-500 text-center">{error}</p>;

  // Extract unique levels from categories
  const levels = [...new Set(categories.map(category => category.level))];

  return (
    <>
    <div className="mt-8 ml-11 mr-11 mb-11">
    <h2 className="text-[5vh] font-bold text-center mb-6">Explore Our Courses </h2>
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-4">
       {courses.slice(0, 9).map((course) => (
          <div key={course._id} className="bg-white rounded shadow-md p-4 flex flex-col">
            <img
              src={course.imageUrl || '/path/to/default-image.jpg'} // Ensure the image URL is valid, or use a default image
              alt={course.name || "Course"}
              className="w-full h-48 object-cover rounded-md" // Fixed height and object-fit for consistent image sizes
            />
            <div className="mt-2 flex-grow">
              <p className="font-bold">{course.name || "Untitled Course"}</p>
              <p className="text-gray-500">{course.description || "No description available."}</p>
            </div>
            {/* <button
              className="mt-4 bg-yellow-500 hover:bg-purple-600 font-bold text-white py-2 px-4 rounded-lg w-full"
              onClick={() => handleEnrollClick(course._id)} // Pass course ID to the handleEnrollClick function
            >
              Enroll Now
            </button> */}
          </div>
        ))}
      </div>
    </div>
   </>
  );
}

export default OurCourses;
