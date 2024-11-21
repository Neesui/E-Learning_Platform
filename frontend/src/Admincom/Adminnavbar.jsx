import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import ViewStudentDetails from './ViewStudentDetails';

const Adminnavbar = () => {
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
        <div className="flex justify-between items-center p-4 bg-white shadow">
      <div className="text-[4vh] ml-11 text-black font-bold">Dashboard</div>

      <div className="flex items-center">
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded-full cursor-pointer"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>
    </div>
      </>
    );
  }
  
  export default Adminnavbar;
  