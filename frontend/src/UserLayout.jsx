import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import StudentProfile from './components/StudentProfile';

const UserLayout = () => {
  return (
    <>
      <Navbar />
      <div className="flex">
        <StudentProfile />
          <Outlet/>
      </div>
      <Footer />
    </>
  );
};

export default UserLayout;
