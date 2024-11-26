import React, { useEffect, useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

function Courses() {
  const { keyword = "" } = useParams();
  const [categories, setCategories] = useState([]);
  const [courses, setCourses] = useState([]);
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedLevels, setSelectedLevels] = useState([]);
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
      const allCourses = response.data.courses || [];
      setCourses(allCourses);
      setFilteredCourses(allCourses); // Initially display all courses
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

  // Filter courses based on selected categories and levels
  const applyFilters = () => {
    let filtered = courses;

    if (selectedCategories.length > 0) {
      filtered = filtered.filter((course) =>
        selectedCategories.includes(course.categoryId)
      );
    }

    if (selectedLevels.length > 0) {
      filtered = filtered.filter((course) =>
        selectedLevels.includes(course.level)
      );
    }

    setFilteredCourses(filtered);
  };

  // Handle category checkbox change
  const handleCategoryChange = (categoryId) => {
    setSelectedCategories((prev) =>
      prev.includes(categoryId)
        ? prev.filter((id) => id !== categoryId) // Remove if already selected
        : [...prev, categoryId]
    );
  };

  useEffect(() => {
    const fetchData = async () => {
      await fetchCategories();
      await fetchCourses();
      setLoading(false);
    };
    fetchData();
  }, [keyword]);

  // Re-apply filters when selected categories or levels change
  useEffect(() => {
    applyFilters();
  }, [selectedCategories, selectedLevels]);

  if (loading) return <p className="text-center">Loading...</p>;
  if (error) return <p className="text-red-500 text-center">{error}</p>;

  // Extract unique levels from courses
  const levels = [...new Set(courses.map((course) => course.level))];

  return (
    <div className="bg-[#E7F4FF] mt-[16vh] p-8">
      <div className="flex space-x-4">
        {/* Filter by category and level */}
        <div className="w-1/4 bg-white p-4 rounded-lg shadow-md">
          <h2 className="text-xl font-bold mb-4">Filter by Category</h2>
          <ul className="space-y-2">
            {categories.map((category) => (
              <li key={category._id}>
                <input
                  type="checkbox"
                  id={category._id}
                  className="mr-2"
                  onChange={() => handleCategoryChange(category._id)}
                />
                <label htmlFor={category._id}>{category.categoryName}</label>
              </li>
            ))}
          </ul>
        </div>

        {/* Courses List */}
        <div className="w-3/4">
          <h2 className="text-2xl font-bold mb-4">Courses Available for You</h2>
          {filteredCourses.length > 0 ? (
            filteredCourses.map((course) => (
              <div
                key={course._id}
                className="bg-white mb-4 p-4 rounded-lg shadow-md"
              >
                <div className="flex">
                  <img
                    src={course.imageUrl} // Ensure 'imageUrl' matches backend property
                    alt="Course"
                    className="w-1/3 h-40 object-cover rounded-md"
                  />
                  <div className="ml-4 w-2/3">
                    <h3 className="text-xl font-bold">{course.courseName}</h3>
                    <p className="text-gray-500">{course.description}</p>
                    <button
                      className="mt-4 bg-yellow-500 hover:bg-purple-600 font-bold text-white py-2 px-4 rounded-lg"
                      onClick={() => handleEnrollClick(course._id)}
                    >
                      Enroll Now
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p>No courses available matching the filters.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Courses;
