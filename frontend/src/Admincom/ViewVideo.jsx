import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast, Toaster } from 'react-hot-toast';
import { useNavigate, useParams } from 'react-router-dom';

const ViewCourses = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const { courseId } = useParams(); // Get the courseId from the URL params (for dynamic routing)
  const navigate = useNavigate();

  // Fetch courses and their associated videos on component mount
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        // If courseId is available, fetch the specific course
        if (courseId) {
          const res = await axios.get(`http://localhost:4001/courses/courseDetails/${courseId}`);
          const coursesWithVideos = res.data.courses || [];
          console.log('Fetched Course:', coursesWithVideos);
          toast.success('Course loaded successfully!');
          setCourses(coursesWithVideos);
        } else {
          // If courseId is not present, fetch all courses
          const res = await axios.get('http://localhost:4001/courses/courseDetails/');
          const coursesWithVideos = res.data.courses || [];
          console.log('Fetched Courses:', coursesWithVideos);
          toast.success('Courses loaded successfully!');
          setCourses(coursesWithVideos);
        }
        setLoading(false);
      } catch (err) {
        console.error('Error fetching courses:', err);
        toast.error('Failed to load courses. Please try again later.');
        setLoading(false);
      }
    };

    fetchCourses();
  }, [courseId]); // Only re-run when courseId changes

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
                <th className="border border-gray-300 px-4 py-2 text-left">Course Title</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Thumbnail</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Category</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Videos</th>
              </tr>
            </thead>
            <tbody>
              {courses.length > 0 ? (
                courses.map((course, index) => (
                  <tr key={course._id}>
                    <td className="border border-gray-300 px-4 py-2">{index + 1}</td>
                    <td className="border border-gray-300 px-4 py-2">{course.courseName}</td>
                    <td className="border border-gray-300 px-4 py-2">
                      <img
                        src={course.imageUrl}
                        alt={course.courseName}
                        className="w-20 h-20 object-cover rounded-md"
                      />
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {course.categoryId ? course.categoryId.categoryName : 'No category'}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {/* Render video details for each course */}
                      {course.videos && course.videos.length > 0 ? (
                        <ul>
                          {course.videos.map((video, idx) => (
                            <li key={video._id} className="flex items-center space-x-2">
                              <img
                                src={video.thumbnail}
                                alt={video.title}
                                className="w-10 h-10 object-cover rounded-md"
                              />
                              <span>{video.title}</span>
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <span>No videos available</span>
                      )}
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
