import React from 'react';

function Register() {
  return (
    <>
      <div className='bg-white w-[100%] pt-[22vh] flex pl-[20vh] items-center ' >
        <div className='w-[30%] flex items-center mr-[29vh]'>
          <img src='https://tidytheme.com/tidytheme/aducat/images/hero-men.png' className='w-[60vh] h-auto' alt='Hero' />
        </div>
        <div className='w-[35%] p-5 shadow-lg rounded-lg'>
          <h1 className='text-3xl font-bold pl-[10vh] mb-4'>New User Signup!</h1>
          <form className='space-y-4'>
            <div className='flex flex-col'>
              <input type='text' placeholder='Full Name' className='p-3 border rounded' />
              <input type='email' placeholder='Email address' className='p-3 border rounded mt-2' />
              <input type='password' placeholder='Password' className='p-3 border rounded mt-2' />
              <input type='password' placeholder='Confirm Password' className='p-3 border rounded mt-2' />
              <input type='text' placeholder='Address' className='p-3 border rounded mt-2' />
              <input type='text' placeholder='Phone Number' className='p-3 border rounded mt-2' />
            </div>
            <div className='flex items-center mt-4'>
              <input type='checkbox' id='terms' className='mr-2' />
              <label htmlFor='terms'>I agree to <a href='#' className='text-blue-500'>term & condition</a> and <a href='#' className='text-blue-500'>privacy policy</a></label>
            </div>
            <button type='submit' className='w-full bg-blue-500 text-white p-2 rounded mt-4'>SIGN UP</button>
          </form>
        </div>
      </div>
    </>
  );
}

export default Register;
