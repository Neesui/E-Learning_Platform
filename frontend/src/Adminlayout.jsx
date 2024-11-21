import React from 'react';
import Adminnavbar from './Admincom/Adminnavbar'
import Sidebar from './Admincom/Sidebar';
import { Outlet } from 'react-router-dom';

const AdminLayout = () => {
  return (
    <>
    <Adminnavbar />
      <div className="flex">
        <Sidebar />
          <Outlet/>
      </div>
    </>
  );
};

export default AdminLayout;
