import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast, Toaster } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const ViewCourses = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Fetch courses on component mount
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await axios.get('http://localhost:4001/courses/getCourses');
        const { courses } = res.data;
        setCourses(courses || []);
        setLoading(false);
        // toast.success('Courses loaded successfully!');
      } catch (err) {
        console.error('Error fetching courses:', err);
        toast.error('Failed to load courses. Please try again later.');
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  // Delete course handler
  const handleDelete = async (courseId) => {
    try {
      const res = await axios.delete(`http://localhost:4001/courses/delete/${courseId}`);
      if (res.status === 200) {
        setCourses(courses.filter(course => course._id !== courseId));  // Remove deleted course from UI
        toast.success('Course deleted successfully!');
      }
    } catch (err) {
      console.error('Error deleting course:', err.response ? err.response.data : err.message);
      toast.error('Failed to delete course. Please try again.');
    }
  };

  // Update course handler (implement as per your app's flow)
  const handleUpdate = (courseId) => {
    navigate(`/UpdateCourse/${courseId}`);
  };

  return (
    <>
      <Toaster />
      <div className="ml-8 mt-5 bg-white p-6 rounded-lg shadow-md w-full max-w-screen-lg mx-auto">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">View Courses</h2>
        {loading ? (
          <p>Loading courses...</p>
        ) : (
          <table className="w-full table-auto border-collapse border border-gray-200">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-gray-300 px-4 py-2 text-left">S.N.</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Image</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Course Name</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Description</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Category</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Action</th>
              </tr>
            </thead>
            <tbody>
              {courses.length > 0 ? (
                courses.map((course, index) => (
                  <tr key={course._id}>
                    <td className="border border-gray-300 px-4 py-2">{index + 1}</td>
                    <td className="border border-gray-300 px-4 py-2">
                      <img
                        src={course.imageUrl}
                        alt={course.courseName}
                        className="w-20 h-20 object-cover rounded-md"
                      />
                    </td>
                    <td className="border border-gray-300 px-4 py-2">{course.courseName}</td>
                    <td className="border border-gray-300 px-4 py-2">{course.description}</td>
                    <td className="border border-gray-300 px-4 py-2">
                      {course.categoryId ? course.categoryId.categoryName : 'No category'}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      <button
                        className="text-blue-500 hover:text-blue-700 mr-2"
                        onClick={() => handleUpdate(course._id)}
                      >
                        Update
                      </button>
                      <button
                        className="text-red-500 hover:text-red-700"
                        onClick={() => handleDelete(course._id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="border border-gray-300 px-4 py-2 text-center">
                    No courses available.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>
    </>
  );
};

export default ViewCourses;
