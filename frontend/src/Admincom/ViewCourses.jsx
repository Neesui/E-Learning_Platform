import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast, Toaster } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const ViewCourses = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();  // Initialize navigate from useNavigate hook

  // Fetch courses on component mount
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await axios.get('http://localhost:4001/courses/getCourses'); // Corrected endpoint to fetch all courses
        const {courses} = res.data
        const courses2 = courses || [ ]
        // Log the response data to check if it's correct
        console.log('Fetched Courses:', res.data.courses);
        
        // Show success toast with meaningful message
        toast.success('Courses loaded successfully!');
        
        // Set the courses data
        // setCourses(Array.isArray(res.data) ? res.data.courses : []);
        setCourses(courses2)
        setLoading(false);
      } catch (err) {
        console.error('Error fetching courses:', err);
        
        // Show error toast with more specific message
        toast.error('Failed to load courses. Please try again later.');
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  // Delete course handler
  const handleDelete = async (courseId) => {
    try {
      await axios.delete(`http://localhost:4001/courses/${courseId}`); // Adjust the URL for the delete request
      setCourses(courses.filter(course => course._id !== courseId)); // Update the courses state to remove the deleted course
      toast.success('Course deleted successfully!');
    } catch (err) {
      console.error('Error deleting course:', err);
      toast.error('Failed to delete course. Please try again.');
    }
  };

  // Update course handler (you can implement this based on your requirement)
  const handleUpdate = (courseId) => {
    // Redirect to the update page or show an update modal (You can implement this as per your app flow)
    console.log('Updating course with ID:', courseId);
    // For example, navigate to an update page:
    navigate(`/UpdateCourse/${courseId}`);
    // toast.info('Update functionality not implemented.');
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
