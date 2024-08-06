import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from "./Home/Home";
import Register from "./components/Register";
import Login from "./components/Login";
import Detail from "./components/Detail";
import CourseDetails from './components/CourseDetails';
import Aboutus from './components/Aboutus';
import Courses from './Home/Courses';

function App() {
  return (
    <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/aboutus' element={<Aboutus />} />
        <Route path='/courses' element={<Courses />} />
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />
        <Route path='/detail' element={<Detail />} />
        <Route path='/course-details' element={<CourseDetails />} />
    </Routes>
  );
}

export default App;
