import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast, Toaster } from 'react-hot-toast';
import { useParams, useNavigate } from 'react-router-dom';

const UpdateVideo = () => {
  const { videoId } = useParams(); // Get the videoId from URL params
  const navigate = useNavigate(); // To navigate to another page after the update

  const [videoTitle, setVideoTitle] = useState('');
  const [description, setDescription] = useState('');
  const [duration, setDuration] = useState('');
  const [videoUrl, setVideoUrl] = useState('');
  const [thumbnailUrl, setThumbnailUrl] = useState('');
  const [error, setError] = useState('');

  // Fetch video details on component mount
  useEffect(() => {
    const fetchVideo = async () => {
      try {
        const res = await axios.get(`http://localhost:4001/videos/videoDetails/${videoId}`);
        const video = res.data;
        setVideoTitle(video.videoTitle);
        setDescription(video.description);
        setDuration(video.duration);
        setVideoUrl(video.videoUrl);
        setThumbnailUrl(video.thumbnailUrl);
      } catch (err) {
        console.error('Error fetching video data:', err);
        toast.error('Failed to load video details');
      }
    };

    fetchVideo();
  }, [videoId]);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!videoTitle || !description || !duration || !videoUrl || !thumbnailUrl) {
      toast.error('All fields are required');
      return;
    }

    const formData = {
      videoTitle,
      description,
      duration,
      videoUrl,
      thumbnailUrl,
    };

    try {
      const res = await axios.put(`http://localhost:4001/videos/update/${videoId}`, formData);
      toast.success(res.data.message || 'Video updated successfully');
      navigate(`/videos/${videoId}`); // Navigate to the updated video page
    } catch (err) {
      console.error('Error updating video:', err);
      toast.error('Failed to update video');
    }
  };

  const uploadFileHandler = async (e) => {
    const formData = new FormData();
    formData.append('thumbnail', e.target.files[0]);

    try {
      const res = await axios.post('http://localhost:4001/uploads/', formData);
      toast.success(res.data.message || 'Thumbnail uploaded successfully');
      setThumbnailUrl(res.data.image);
    } catch (err) {
      toast.error(err.response?.data?.message || 'Thumbnail upload failed');
    }
  };

  const uploadVideoHandler = async (e) => {
    const formData = new FormData();
    formData.append('video', e.target.files[0]);

    try {
      const res = await axios.post('http://localhost:4001/uploads/video', formData);
      toast.success(res.data.message || 'Video uploaded successfully');
      setVideoUrl(res.data.video);
    } catch (err) {
      toast.error(err.response?.data?.message || 'Video upload failed');
    }
  };

  return (
    <>
      <Toaster />
      <div className="ml-[20vh] w-[100vh] h-[80vh] mt-5 bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">Update Video</h2>
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
            <label className="block text-gray-600 mb-1">Description:</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter description"
            />
          </div>
          <div>
            <label className="block text-gray-600 mb-1">Duration:</label>
            <input
              type="text"
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              className="w-full border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter duration"
            />
          </div>
          <div>
            <label className="block text-gray-600 mb-1">Video File:</label>
            <input
              type="file"
              onChange={uploadVideoHandler}
              className="w-full text-gray-600 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-gray-600 mb-1">Thumbnail:</label>
            <input
              type="file"
              onChange={uploadFileHandler}
              className="w-full text-gray-600 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Update Video
          </button>
        </form>
        {error && <p className="mt-4 text-red-500">{error}</p>}
      </div>
    </>
  );
};

export default UpdateVideo;
