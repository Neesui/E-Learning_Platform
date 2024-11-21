import React, { useEffect, useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

function Courses() {
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
    <div className='bg-[#E7F4FF] mt-[16vh] p-8'>
      <div className='flex space-x-4'>
        {/* Filter by category and level */}
        <div className='w-1/4 bg-white p-4 rounded-lg shadow-md'>
          <h2 className='text-xl font-bold mb-4'>Filter by category</h2>
          <ul className='space-y-2'>
            {categories.map((category) => (
              <li key={category._id}>
                <input type='checkbox' id={category._id} className='mr-2' />
                <label htmlFor={category._id}>{category.categoryName}</label>
              </li>
            ))}
          </ul>

          <h2 className='text-xl font-bold mt-6 mb-4'>Level</h2>
          {levels.map((level) => (
            <div key={level} className='mb-4'>
              <input type='checkbox' id={level} className='mr-2' />
              <label htmlFor={level}>{level}</label>
            </div>
          ))}
        </div>

        {/* Courses List */}
        <div className='w-3/4'>
          <h2 className='text-2xl font-bold mb-4'>Courses Available for you</h2>
          {courses.length > 0 ? (
            courses.map((course) => (
              <div key={course._id} className='bg-white mb-4 p-4 rounded-lg shadow-md'>
                <div className='flex'>
                  <img
                    src={course.imageUrl} // Ensure 'imageUrl' matches backend property
                    alt='Course'
                    className='w-1/3 h-40 object-cover rounded-md'
                  />
                  <div className='ml-4 w-2/3'>
                    <h3 className='text-xl font-bold'>{course.courseName}</h3>
                    <p className='text-gray-500'>{course.description}</p>
                    <button
                      className='mt-4 bg-yellow-500 hover:bg-purple-600 font-bold text-white py-2 px-4 rounded-lg'
                      onClick={() => handleEnrollClick(course._id)}
                    >
                      Enroll Now
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p>No courses available at the moment.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Courses;
