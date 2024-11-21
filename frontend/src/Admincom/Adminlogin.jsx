import React, { useState, useEffect } from 'react';
import { FaEnvelope, FaLock } from 'react-icons/fa';
import { toast, Toaster } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Adminlogin() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Redirect if the admin is already logged in
  useEffect(() => {
    if (localStorage.getItem('adminToken')) {
      navigate('/AdminDashboard');
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const loginData = {
      email: email,
      password: password,
    };

    try {
      const res = await axios.post("http://localhost:4001/admin/login", loginData);
      if (res.data.message === 'Login successful') {
        toast.success('Login successful');
        localStorage.setItem("adminToken", res.data.token); // Store the token

        // Save admin info in localStorage
        const adminInfo = {
          name: res.data.admin.fullName, // Adjusted for full name in admin response
          email: res.data.admin.email,
        };
        localStorage.setItem("adminInfo", JSON.stringify(adminInfo)); // Store admin info

        navigate('/AdminDashboard'); // Redirect to dashboard after successful login
      }
    } catch (err) {
      console.error(err);
      if (err.response) {
        toast.error("Error: " + err.response.data.message);
      } else {
        toast.error("Error: Unable to connect to the server");
      }
    }
  };

  return (
    <div className="bg-white w-full h-screen pt-20 flex justify-center items-center">
      <Toaster /> {/* Add the Toaster component to display toast notifications */}
      <div className="w-[100%] sm:w-[80%] md:w-[50%] lg:w-[33%] p-6 rounded-lg shadow-[0_4px_15px_rgba(0,0,0,0.3)]">
        <h1 className="text-4xl font-bold text-center mb-4">Admin Login</h1>
        <form className="space-y-8" onSubmit={handleSubmit}>
          <div className="flex flex-col">
            <div className="flex items-center border rounded mt-2 p-2">
              <FaEnvelope className="text-gray-500 mr-3" />
              <input
                type="email"
                placeholder="Email address"
                className="flex-1 p-2 outline-none"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="flex items-center border rounded mt-3 p-2">
              <FaLock className="text-gray-500 mr-3" />
              <input
                type="password"
                placeholder="Password"
                className="flex-1 p-2 outline-none"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white font-bold text-xl p-3 rounded mt-4"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default Adminlogin;
