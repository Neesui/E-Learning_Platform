import React, { useEffect, useState } from 'react';
import Navbar from "./Navbar";
import { useNavigate, Link } from 'react-router-dom';

function StudentProfile() {
  const [studentName, setStudentName] = useState('');
  const [studentEmail, setStudentEmail] = useState('');
  const [profilePicture, setProfilePicture] = useState('');
  const [studentId, setStudentId] = useState(''); // Add studentId state
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem('studentToken')) {
      navigate('/Login');
      return;
    }

    const storedData = localStorage.getItem("Nisha");
    if (storedData) {
      try {
        const std = JSON.parse(storedData);
        setStudentName(std.name || '');
        setStudentEmail(std.email || '');
        setProfilePicture(std.profilePicture || '');
        setStudentId(std.studentId || ''); // Set studentId from parsed data
      } catch (error) {
        console.error("Error parsing JSON from localStorage", error);
        localStorage.removeItem("Nisha");
        navigate('/Login');
      }
    } else {
      navigate('/Login');
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("studentToken");
    localStorage.removeItem("Nisha");
    navigate('/Login');
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePicture(reader.result);
        const storedData = localStorage.getItem("Nisha");
        if (storedData) {
          const std = JSON.parse(storedData);
          std.profilePicture = reader.result;
          localStorage.setItem("Nisha", JSON.stringify(std));
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <>
      <div className='bg-[#E7F4FF]  mt-[16vh] p-8'>
        <div className='w-[50vh]'>
          <div className='w-[50vh] bg-white p-4 rounded-lg shadow-md mr-4'>
            <div className='flex justify-center mb-3 mt-6'>
              <img
                src={profilePicture || 'https://www.icon0.com/free/static2/preview2/stock-photo-cute-cartoon-girl-in-glasses-avatar-people-icon-character-cartoo-33356.jpg'}
                alt='Student'
                className='w-32 h-32 object-cover rounded-full shadow-lg ring-2 ring-black-800'
              />
            </div>
            <div className='ml-4'>
              <h2 className='text-[4vh] flex justify-center mb-1 font-bold'>{studentName || 'Student Name'}</h2>
              <p className='text-gray-600 text-[3vh] font-bold flex justify-center mb-5'>{studentEmail || 'student@example.com'}</p>
            </div>

            <div className='flex flex-col'>
            <Link to='/StudentInfo' className='text-blue-500 hover:underline mb-4'>Personal Info</Link>
              <button onClick={handleLogout} className='text-blue-500 hover:underline mb-4'>Logout</button>
            </div>
          </div>

          <div className='w-3/4'>
            <div className='flex w-full bg-white space-x-4'>
              {/* Additional dashboard content can go here */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default StudentProfile;
