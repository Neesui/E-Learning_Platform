import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import { toast, Toaster } from 'react-hot-toast';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import { Link } from 'react-router-dom';

function AdminRegister() {
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const navigate = useNavigate();
  const [successMessage, setSuccessMessage] = useState('');
  const password = watch("password");

  const onSubmit = async (data) => {
    setSuccessMessage(''); // Clear previous success message if any
    const adminInfo = {
      fullName: data.name,  // Assuming `data.name` is the full name
      username: data.username,
      email: data.email,
      password: data.password,
    };
  
    try {
      const res = await axios.post("http://localhost:4001/admin/add", adminInfo);
      console.log('Response from server:', res.data);
      toast.success('Sign up successful');
  
      if (res.data && res.data.admin) {
        console.log('Sign up successful');
        localStorage.setItem("Admin", JSON.stringify(res.data.admin));
        navigate('/StudentDashboard');
      }
    } catch (err) {
      if (err.response) {
        console.log('Error response from server:', err.response.data);
        toast.error("Error: " + err.response.data.message);
      } else {
        console.log('Error', err.message);
      }
    }
  };

  return (
    <>
      <Toaster />
      <div className='bg-white w-[100%] pt-[18vh] flex pl-[20vh] items-center'>
        <div className='w-[35%] p-5 shadow-lg rounded-lg'>
          <h1 className='text-3xl font-bold pl-[10vh] mb-4'>New User Signup!</h1>

          {successMessage && (
            <div className='bg-green-100 text-green-700 p-3 rounded mb-4 font-bold flex justify-center'>
              {successMessage}
            </div>
          )}

          <form className='space-y-4' onSubmit={handleSubmit(onSubmit)}>
            {/* Input fields for registration */}
            <div className='flex flex-col'>
              <input 
                type='text' 
                placeholder='Full Name' 
                className='p-3 border rounded' 
                {...register("name", { required: "Name is required" })} 
              />
              {errors.name && <p className='text-red-500'>{errors.name.message}</p>}

              <input 
                type='text' 
                placeholder='Username' 
                className='p-3 border rounded mt-2' 
                {...register("username", { required: "Username is required" })} 
              />
              {errors.username && <p className='text-red-500'>{errors.username.message}</p>}

              <input 
                type='email' 
                placeholder='Email address' 
                className='p-3 border rounded mt-2' 
                {...register("email", { required: "Email is required" })} 
              />
              {errors.email && <p className='text-red-500'>{errors.email.message}</p>}

              <input 
                type='password' 
                placeholder='Password' 
                className='p-3 border rounded mt-2' 
                {...register("password", { required: "Password is required" })} 
              />
              {errors.password && <p className='text-red-500'>{errors.password.message}</p>}
            </div>

            <button type='submit' className='w-full bg-blue-500 text-white p-2 rounded mt-4'>SIGN UP</button>
            <div className='flex items-center justify-center mb-10'>
              {/* <p className='font-semibold text-gray-600'>Already have an account? <Link to='/Adminlogin' className='text-blue-500 font-semibold'>Login</Link></p> */}
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default AdminRegister;
