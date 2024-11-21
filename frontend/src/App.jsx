import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from './Pages/HomePage';
import Aboutus from './components/Aboutus';
import Register from './components/Register';
import Login from './components/Login';
import Courses from './components/Courses';
import Layout from './Layout';
import StudentDashboard from './components/StudentDashboard';
import CourseDetailsPage from './Pages/CourseDetailsPage';
import FeedbackForm from './components/FeedbackForm';
import Adminlogin from './Admincom/Adminlogin';
import AddCategoryForm from './Admincom/AddCategoryForm';
import Admindashboard from './Admincom/Admindashboard';
import AdminLayout from './Adminlayout';
import AddCourseForm from './Admincom/AddCourseForm';
import ViewCourses from './Admincom/ViewCourses';
import UpdateCourse from './Admincom/UpdateCourse';
import ViewCategories from './Admincom/ViewCategory';
import AddVideoForm from './Admincom/AddVideoForm';
import VideoSection from './components/VideoSection';
import AdminRegister from './Admincom/adminRegister';
import Quiz from './components/Quiz';
import AddQuizForm from './Admincom/AddQuizForm';
import ViewStudentDetails from './Admincom/ViewStudentDetails';
import EditProfile from './components/EditProfile';
import UserLayout from './UserLayout';
import StudentInfo from './components/StudentInfo';

function App() {
   return (
      <Routes>
         {/* Public routes */}
         <Route path="/" element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path="Aboutus" element={<Aboutus />} />
            <Route path="Courses" element={<Courses />} />
            <Route path="Courses/search/:keyword" element={<Courses />} />
            <Route path="CourseDetailsPage/:courseId" element={<CourseDetailsPage />} />
            <Route path="VideoSection" element={<VideoSection />} /> 
            <Route path="VideoSection/Quiz/:courseId" element={<Quiz />} />  {/* courseId is part of the URL */}
            <Route path="register" element={<Register />} />
            <Route path="login" element={<Login />} />
         </Route>

         {/* User routes */}
         <Route path="/" element={<UserLayout />}>
            <Route path="StudentDashboard" element={<StudentDashboard />} />
            <Route path="/EditProfile/:studentId" element={<EditProfile />} />
            <Route path="/StudentInfo" element={<StudentInfo />} />

            <Route path="FeedbackForm" element={<FeedbackForm />} />
         </Route>

         {/* Admin routes */}
         <Route path="/" element={<AdminLayout />}>
            <Route path="AdminDashboard" element={<Admindashboard />} />
            <Route path="AddCategoryForm" element={<AddCategoryForm />} />
            <Route path="AddCourseForm" element={<AddCourseForm />} />
            <Route path="AddVideoForm" element={<AddVideoForm />} />
            <Route path="AddQuizForm" element={<AddQuizForm />} />
            <Route path="ViewStudentDetails" element={<ViewStudentDetails />} />
            <Route path="ViewCourses" element={<ViewCourses />} />
            <Route path="UpdateCourse/:courseId" element={<UpdateCourse />} />
            <Route path="ViewCategory" element={<ViewCategories />} />
         </Route>

         {/* Admin login routes */}
         <Route path="Adminlogin" element={<Adminlogin />} />
         <Route path="AdminRegister" element={<AdminRegister />} />
      </Routes>
   );
}

export default App;
