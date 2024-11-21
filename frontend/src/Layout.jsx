import React from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';  // Correct relative path
import { Outlet } from 'react-router-dom';

const Layout = () => {
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
};

export default Layout;
