import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ViewStudentDetails from './ViewStudentDetails';

function AdminDashboard() {
  const navigate = useNavigate();

  // Check if admin is logged in (by token existence in localStorage)
  useEffect(() => {
    if (!localStorage.getItem('adminToken')) {
      navigate('/Adminlogin'); // Redirect to login if not logged in
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminInfo');
    navigate('/Adminlogin'); // Redirect to login after logout
  };

  return (
    <>
      <div className='w-full'>
        <ViewStudentDetails />
      </div>
    </>
  );
}

export default AdminDashboard;
