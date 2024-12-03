import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast, Toaster } from 'react-hot-toast';

const AddVideoForm = () => {
  const [videoTitle, setVideoTitle] = useState('');
  const [videoUrl, setVideoUrl] = useState('');
  const [coursesId, setCourseId] = useState('');
  const [courses, setCourses] = useState([]);
  const [imageUrl, setImageUrl] = useState('');  // Store image URL for thumbnail preview
  const [error, setError] = useState('');

  // Fetch courses on component mount
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await axios.get('http://localhost:4001/courses/getCourses');
        const { courses } = res.data || { courses: [] };
        setCourses(courses);
        // toast.success('Courses loaded successfully!');
      } catch (err) {
        console.error('Error fetching courses:', err);
        toast.error('Failed to load courses');
      }
    };
    fetchCourses();
  }, []);

  // Handle file upload and set the video URL
  const uploadFileHandler = async (e) => {
    const formData = new FormData();
    formData.append('video', e.target.files[0]);

    try {
      const res = await axios.post('http://localhost:4001/videos', formData);
      setVideoUrl(res.data.videoPath);
      toast.success(res.data.message || 'Video uploaded successfully');
    } catch (err) {
      console.error('Video upload error:', err);
      toast.error(err.response?.data?.message || 'Video upload failed');
    }
  };

  // Handle thumbnail image upload
  const uploadThumbnailHandler = async (e) => {
    const formData = new FormData();
    formData.append('image', e.target.files[0]);

    try {
      const res = await axios.post('http://localhost:4001/uploads/', formData);
      console.log(res);
      toast.success(res.data.message || 'Image uploaded successfully');
      setImageUrl(res.data.image);  // Save image URL to state for preview
    } catch (err) {
      toast.error(err.response?.data?.message || 'Image upload failed');
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (!videoTitle || !videoUrl || !coursesId) {
      toast.error('All fields are required');
      return;
    }

    try {
      const res = await axios.post(`http://localhost:4001/courses/add/${coursesId}/videos`, {
        title: videoTitle,
        url: videoUrl,
        thumbnail:imageUrl,
      });

      // Reset form fields after successful submission
      setVideoTitle('');
      setVideoUrl('');
      setCourseId('');
      setImageUrl('');
      toast.success(res.data.message || 'Video added successfully');
    } catch (err) {
      console.error('Error adding video:', err);
      toast.error('Failed to add video');
    }
  };

  return (
    <>
      <Toaster />
      <div className="ml-[20vh] w-[100vh] h-[100vh] mt-5 bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">Add New Video</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-600 mb-1">Video Title:</label>
            <input
              type="text"
              value={videoTitle}
              onChange={(e) => setVideoTitle(e.target.value)}
              className="w-full border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter video title"
            />
          </div>
          <div>
            <label className="block text-gray-600 mb-1">Video File:</label>
            <input
              type="file"
              onChange={uploadFileHandler}
              className="w-full text-gray-600 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-gray-600 mb-1">Thumbnail Image:</label>
            <input
              type="file"
              onChange={uploadThumbnailHandler}
              className="w-full text-gray-600 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {imageUrl && <img src={imageUrl} alt="Thumbnail Preview" className="mt-4 w-24 h-24 object-cover" />}
          </div>
          <div>
            <label className="block text-gray-600 mb-1">Course:</label>
            <select
              value={coursesId}
              onChange={(e) => setCourseId(e.target.value)}
              className="w-full border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select a course</option>
              {courses.map((course) => (
                <option key={course._id} value={course._id}>
                  {course.courseName}
                </option>
              ))}
            </select>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Add Video
          </button>
        </form>
        {error && <p className="mt-4 text-red-500">{error}</p>}
      </div>
    </>
  );
};

export default AddVideoForm;
