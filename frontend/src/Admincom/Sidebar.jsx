// src/components/Sidebar.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  FaTachometerAlt,
  FaUser,
  FaBook,
  FaChartLine,
  FaPlus,
  FaEye,
  FaVideo,
  FaQuestionCircle // Import the new icon for Quiz
} from 'react-icons/fa';

const Sidebar = () => {
  // State for toggling visibility of various sections
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [isCoursesOpen, setIsCoursesOpen] = useState(false);
  const [isQuizOpen, setIsQuizOpen] = useState(false);
  const [isVideosOpen, setIsVideosOpen] = useState(false);
  const [isCertificateOpen, setIsCertificateOpen] = useState(false);
  const [isProgressOpen, setIsProgressOpen] = useState(false);
  const [isStudentDetailsOpen, setIsStudentDetailsOpen] = useState(false);

  // Toggle functions for each section
  const toggleCategory = () => setIsCategoryOpen(!isCategoryOpen);
  const toggleCourses = () => setIsCoursesOpen(!isCoursesOpen);
  const toggleVideos = () => setIsVideosOpen(!isVideosOpen);
  const toggleQuiz = () => setIsQuizOpen(!isQuizOpen);
  const toggleProgress = () => setIsProgressOpen(!isProgressOpen);
  const toggleStudentDetails = () => setIsStudentDetailsOpen(!isStudentDetailsOpen);

  return (
    <div className="w-64 h-full-screen bg-gray-800 text-white">
      {/* Admin Sidebar */}
      <div className="p-5 text-lg ml-4 font-bold">EduAdmin</div>
      <ul className="ml-4">
        <li className="p-4 hover:bg-gray-700 flex items-center">
          <FaTachometerAlt className="mr-3" />
          <a href="AdminDashboard">Dashboard</a>
        </li>

        {/* Student Details Section */}
        <li className="p-4 hover:bg-gray-700">
          <button onClick={toggleStudentDetails} className="w-full text-left flex items-center">
            <FaUser className="mr-3" />
            Students
          </button>
          {isStudentDetailsOpen && (
            <ul className="pl-4 mt-2 bg-gray-700">
              <li className="p-4 hover:bg-gray-600 flex items-center">
                <FaEye className="mr-3" />
                <Link to="/ViewStudentDetails">View Student Details</Link>
              </li>
            </ul>
          )}
        </li>

        {/* Category Section */}
        <li className="p-4 hover:bg-gray-700">
          <button onClick={toggleCategory} className="w-full text-left flex items-center">
            <FaBook className="mr-3" />
            Categories
          </button>
          {isCategoryOpen && (
            <ul className="pl-4 mt-2 bg-gray-700">
              <li className="p-4 hover:bg-gray-600 flex items-center">
                <FaPlus className="mr-3" />
                <Link to="/AddCategoryForm">Add categories</Link>
              </li>
              <li className="p-4 hover:bg-gray-600 flex items-center">
                <FaEye className="mr-3" />
                <Link to="/ViewCategory">View categories</Link>
              </li>
            </ul>
          )}
        </li>

        {/* Courses Section */}
        <li className="p-4 hover:bg-gray-700">
          <button onClick={toggleCourses} className="w-full text-left flex items-center">
            <FaBook className="mr-3" />
            Courses
          </button>
          {isCoursesOpen && (
            <ul className="pl-4 mt-2 bg-gray-700">
              <li className="p-4 hover:bg-gray-600 flex items-center">
                <FaPlus className="mr-3" />
                <Link to="/AddCourseForm">Add Courses</Link>
              </li>
              <li className="p-4 hover:bg-gray-600 flex items-center">
                <FaEye className="mr-3" />
                <Link to="/ViewCourses">View Courses</Link>
              </li>
            </ul>
          )}
        </li>

        {/* Video Section */}
        <li className="p-4 hover:bg-gray-700">
          <button onClick={toggleVideos} className="w-full text-left flex items-center">
            <FaVideo className="mr-3" />
            Videos
          </button>
          {isVideosOpen && (
            <ul className="pl-4 mt-2 bg-gray-700">
              <li className="p-4 hover:bg-gray-600 flex items-center">
                <FaPlus className="mr-3" />
                <Link to="/AddVideoForm">Add Videos</Link>
              </li>
            </ul>
          )}
        </li>

        {/* Quiz Section */}
        <li className="p-4 hover:bg-gray-700">
          <button onClick={toggleQuiz} className="w-full text-left flex items-center">
            <FaQuestionCircle className="mr-3" /> {/* Updated icon to FaQuestionCircle */}
            Quiz
          </button>
          {isQuizOpen && (
            <ul className="pl-4 mt-2 bg-gray-700">
              <li className="p-4 hover:bg-gray-600 flex items-center">
                <FaPlus className="mr-3" />
                <Link to="/AddQuizForm">Add Quiz</Link>
              </li>
            </ul>
          )}
        </li>
      </ul>
    </div>
    // End of Admin Sidebar
  );
};

export default Sidebar;
