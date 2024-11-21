import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import StudentInfo from './StudentInfo';

function StudentDashboard() {
  const navigate = useNavigate();

  // Check if student is logged in (by token existence in localStorage)
  useEffect(() => {
    if (!localStorage.getItem('studentToken')) {
      navigate('/Login'); // Redirect to login if not logged in
    }
  }, [navigate]);

  return (
    <div className="w-full">
      <StudentInfo />
    </div>
  );
}

export default StudentDashboard;
