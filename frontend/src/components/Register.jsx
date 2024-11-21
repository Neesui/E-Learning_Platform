import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import { toast, Toaster } from 'react-hot-toast';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

function Register() {
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const navigate = useNavigate();
  const [successMessage, setSuccessMessage] = useState('');
  const password = watch("password");

  const onSubmit = async (data) => {
    const stdInfo = {
      name: data.name,
      email: data.email,
      password: data.password,
      cpsw: data.cpsw,
      address: data.address,
      phoneNumber: data.phoneNumber
    };
  
    try {
      const res = await axios.post("http://localhost:4001/student/signup", stdInfo);
      console.log('Response from server:', res.data); // Debugging response
      toast.success('Sign up successful');

      // Check if user data exists in the response and redirect if successful
      if (res.data && res.data.user) {
        console.log('Sign up successful');
        localStorage.setItem("Nisha", JSON.stringify(res.data.user));
        navigate('/StudentDashboard'); // Redirect to StudentDashboard
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
        <div className='w-[30%] flex items-center mr-[29vh]'>
          <img src='https://themesvila.com/themes-wp/edusion/wp-content/uploads/2023/10/free-course-768x813.png' className='w-full h-auto' alt='Hero' />
        </div>
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

              <input 
                type='password' 
                placeholder='Confirm Password' 
                className='p-3 border rounded mt-2' 
                {...register("cpsw", { required: "Please confirm your password", validate: value => value === password || "Passwords do not match" })} 
              />
              {errors.cpsw && <p className='text-red-500'>{errors.cpsw.message}</p>}

              <input 
                type='text' 
                placeholder='Address' 
                className='p-3 border rounded mt-2' 
                {...register("address", { required: "Address is required" })} 
              />
              {errors.address && <p className='text-red-500'>{errors.address.message}</p>}
              
              <input 
                type='text' 
                placeholder='Phone Number' 
                className='p-3 border rounded mt-2' 
                {...register("phoneNumber", { required: "Phone Number is required", pattern: { value: /^[0-9]+$/, message: "Phone number must be numeric" } })} 
              />
              {errors.phoneNumber && <p className='text-red-500'>{errors.phoneNumber.message}</p>}
            </div>

            {/* Terms and conditions */}
            <div className='flex items-center mt-4'>
              <input 
                type='checkbox' 
                id='terms' 
                className='mr-2' 
                {...register("terms", { required: "You must agree to the terms" })} 
              />
              <label htmlFor='terms'>
                I agree to <a href='#' className='text-blue-500'>terms & conditions</a> and <a href='#' className='text-blue-500'>privacy policy</a>
              </label>
            </div>
            {errors.terms && <p className='text-red-500'>{errors.terms.message}</p>}

            <button type='submit' className='w-full bg-blue-500 text-white p-2 rounded mt-4'>SIGN UP</button>
            <div className='flex items-center justify-center mb-10'>
              <p className='font-semibold text-gray-600'>Already have an account? <Link to='/login' className='text-blue-500 font-semibold'>Login</Link></p>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default Register;
