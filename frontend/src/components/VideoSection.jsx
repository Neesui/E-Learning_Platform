import React, { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { LinearProgress } from '@mui/material';
import RecommendationCourses from './RecommendationCourses';

function VideoSection() {
    const storedUser = JSON.parse(localStorage.getItem("Nisha"));
    const { _id: studentId } = storedUser || {};
    const location = useLocation();
    const navigate = useNavigate(); // useNavigate hook for navigation
    const [courseId, setCourseId] = useState(null);
    const [videos, setVideos] = useState([]);
    const [currentVideo, setCurrentVideo] = useState('');
    const [watchedSeconds, setWatchedSeconds] = useState([]);
    const [progress, setProgress] = useState(0);
    const [isComplete, setIsComplete] = useState(false); // Track if the current video is complete

    const videoRef = useRef(null);

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const id = params.get('courseId');
        setCourseId(id);
    }, [location]);

    useEffect(() => {
        if (courseId) {
            const fetchVideos = async () => {
                try {
                    const res = await axios.get(`http://localhost:4001/courses/courseDetails/${courseId}`);
                    setVideos(res.data.videos || []);
                    setCurrentVideo(res.data.videos[0]?.url || '');
                    setWatchedSeconds(Array(res.data.videos.length).fill(0));
                } catch (error) {
                    console.error("Error fetching videos:", error);
                }
            };
            fetchVideos();
        }
    }, [courseId]);

    const updateWatchedSeconds = () => {
        const watched = Math.floor(videoRef.current?.currentTime || 0);
        const currentIndex = videos.findIndex(video => video.url === currentVideo);
        setWatchedSeconds(prevWatchedSeconds => {
            const updated = [...prevWatchedSeconds];
            updated[currentIndex] = Math.max(updated[currentIndex], watched);
            setProgress((watched / (videoRef.current?.duration || 1)) * 100);
            return updated;
        });
    };

    const handleProgressUpdate = async () => {
        try {
            if (!studentId || !courseId) {
                console.error("Student ID or Course ID is missing");
                return;
            }
    
            const videoId = videos.find(video => video.url === currentVideo)?._id;
            if (!videoId) {
                console.error("Video ID is missing");
                return;
            }
    
            const currentIndex = videos.findIndex(video => video.url === currentVideo);
            const token = localStorage.getItem('studentToken');
            if (!token) {
                console.error("Authorization token is missing");
                return;
            }
    
            // Determine if the current video is completed
            const isCompleted = progress === 100;
    
            await axios.post(
                'http://localhost:4001/student/update-progress',
                {
                    studentId,
                    courseId,
                    videoId,
                    watchedSeconds: watchedSeconds[currentIndex],
                    isCompleted, // Pass the calculated value
                },
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );
    
            console.log("Progress updated successfully");
        } catch (error) {
            console.error("Error updating progress:", error);
        }
    };
    

    

    const handleVideoEnd = async () => {
        await handleProgressUpdate();
        setProgress(100);
        const currentIndex = videos.findIndex(video => video.url === currentVideo);
        if (currentIndex === videos.length - 1) {
            setIsComplete(true);  // Mark the course as complete when the last video ends
        } else {
            setCurrentVideo(videos[currentIndex + 1]?.url || '');
            setProgress(0);
        }
    };

    // Navigate to the Quiz page with the courseId
    const handleGoToQuiz = () => {
        if (!courseId) {
            console.error("Course ID is missing");
            return;
        }
        navigate(`Quiz/${courseId}`);
    };
    

    return (
        <>
            <div className=''>
                <div className='w-[192vh] h-[150vh] mt-[16vh]'>
                    <div className="bg-white p-4 ml-[15vh] w-[150vh] mb-12">
                        <video
                            ref={videoRef}
                            src={currentVideo ? `http://localhost:4001/${currentVideo}` : ''}
                            className="w-full h-auto rounded-md"
                            controls
                            onTimeUpdate={updateWatchedSeconds}
                            onPause={handleProgressUpdate}
                            onEnded={handleVideoEnd}
                        />
                        <LinearProgress variant="determinate" value={progress} className="mt-4" />
                        <h2 className="text-2xl font-bold mt-2">
                            {videos.find(video => video.url === currentVideo)?.title || 'Select a Lesson'}
                        </h2>
                    </div>
                    <div className='ml-[15vh]'>
                        <h2 className="text-xl font-bold mb-10">Lessons List</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                            {videos.map(video => (
                                <div
                                    key={video._id}
                                    className="bg-white shadow rounded p-2 cursor-pointer hover:shadow-lg"
                                    onClick={() => setCurrentVideo(video.url)}
                                >
                                    <img
                                        src={video.thumbnail}
                                        alt={video.title}
                                        className="w-full h-32 object-cover mb-2"
                                    />
                                    <h3 className="text-sm font-semibold">{video.title}</h3>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
            {isComplete && (
                <div className='ml-[18vh]'>
                    <button
                        className='mt-4 bg-yellow-500 hover:bg-purple-600 font-bold text-white py-2 px-4 rounded-lg'
                        onClick={handleGoToQuiz}  // Navigate to the Quiz page
                    >
                        Go to Quiz
                    </button>
                </div>
            )}
            <RecommendationCourses />
        </>
    );
}

export default VideoSection;
