import React, { useState, useEffect } from 'react';
import { useForm } from "react-hook-form";
import { toast, Toaster } from 'react-hot-toast';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

function Login() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();

  const onSubmit = async (data) => {
  const loginData = {
    email: data.email,
    password: data.password,
    isVerified: data.isVerified
  };

  try {
    const res = await axios.post("http://localhost:4001/student/login", loginData);

    // Check if the response is as expected
    if (res && res.data && res.data.message === 'Login successful') {
      toast.success('Login successful');
      
      // Ensure the 'Student' data exists before trying to store it
      if (res.data.Student) {
        // Store the student and token in localStorage
        localStorage.setItem("Nisha", JSON.stringify(res.data.Student)); // Store student data
        localStorage.setItem("studentToken", res.data.token); // Store the token

        navigate('/StudentDashboard');
      } else {
        toast.error("Error: User data not found in response");
      }
    } else {
      toast.error("Error: Login failed");
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

  useEffect(() => {
    // Optional: Check if the user is already logged in
    const user = JSON.parse(localStorage.getItem("Nisha"));
    if (user && user.isVerified === false) {
      toast.warning("Please verify your email to complete the login process");
    }
  }, []);

  return (
    <>
      <Toaster />
      <div className='bg-white w-[100%] pt-[22vh] flex pl-[20vh] items-center'>
        <div className='w-[39.8%] flex items-center mr-[20vh]'>
          <img src='https://themesvila.com/themes-wp/edusion/wp-content/uploads/2023/10/free-course-768x813.png' className='w-full h-auto' alt='Hero' />
        </div>
        <div className='w-[40%] p-6 shadow-lg rounded-lg'>
          <h1 className='text-4xl font-bold pl-[15vh] mb-4'>User Login</h1>

          {successMessage && (
            <div className='bg-green-100 text-green-700 p-3 rounded mb-4 font-bold flex justify-center'>
              {successMessage}
            </div>
          )}

          <form className='space-y-10' onSubmit={handleSubmit(onSubmit)}>
            <div className='flex flex-col'>
              <input 
                type='email' 
                placeholder='Email address' 
                className='p-4 border rounded mt-2' 
                {...register("email", { required: "Email is required" })} 
              />
              {errors.email && <p className='text-red-500'>{errors.email.message}</p>}

              <input 
                type='password' 
                placeholder='Password' 
                className='p-4 border rounded mt-3' 
                {...register("password", { required: "Password is required" })} 
              />
              {errors.password && <p className='text-red-500'>{errors.password.message}</p>}
            </div>

            <button type='submit' className='w-full bg-blue-500 text-white font-bold text-[25px] p-3 rounded mt-4'>
              Login
            </button>
            <div className='flex items-center justify-center mb-10'>
              <p className="mr-2">Don't have an account?</p>
              <Link to="/Register">
                <p className='font-bold'>Register</p>
              </Link>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default Login;
