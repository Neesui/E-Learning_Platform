import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const VideoCard = ({ thumbnail, videoUrl, title, onClick }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-4 cursor-pointer" onClick={onClick}>
      <div className="relative">
        <video
          controls={false}
          src={`http://localhost:4001/${videoUrl}`}
          poster={thumbnail}// Use thumbnail as poster image
          className="w-full h-auto rounded-md"
        >
          Your browser does not support the video tag.
        </video>
      </div>
      <div className="mt-2">
        <p className="font-bold text-center text-gray-700">{title}</p>
      </div>
    </div>
  );
};

const Lessions = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const res = await axios.get(`http://localhost:4001/courses/courseDetails/${courseId}`);
        console.log(res);
        setVideos(res.data.videos);  // Assuming videoSchema includes thumbnail data
      } catch (error) {
        console.error("Error fetching videos:", error);
      }
    };

    fetchVideos();
  }, [courseId]);

  const handleVideoClick = (videoId) => {
    navigate(`/VideoSection?courseId=${courseId}`);
  };

  return (
    <div className="mt-8 ml-11">
      <h2 className="text-2xl font-bold">Course Videos</h2>
      <div className="mt-8 p-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          {videos.map((video) => (
            <VideoCard
              key={video._id}
              videoUrl={video.url}
              thumbnail={video.thumbnail}  // Assuming each video has a thumbnail property
              title={video.title}
              onClick={() => handleVideoClick(video._id)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Lessions;
