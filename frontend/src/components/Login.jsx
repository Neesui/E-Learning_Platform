import React from 'react'

function Login() {
  return (
    <>
        <div className='bg-white w-[100%] pt-[22vh] flex pl-[20vh] items-center ' >
        <div className='w-[39.8%] flex items-center mr-[20vh]'>
          <img src='https://themesvila.com/themes-wp/edusion/wp-content/uploads/2023/10/free-course-768x813.png' className='w-full h-auto' alt='Hero' />
        </div>
        <div className='w-[40%] p-6 shadow-lg rounded-lg'> 
          <h1 className='text-4xl font-bold pl-[15vh] mb-4'>User Login</h1>
          <form className='space-y-10'>
            <div className='flex flex-col'>
              <input type='email' placeholder='Email address' className='p-4 border rounded mt-2' />
              <input type='password' placeholder='Password' className='p-4 border rounded mt-3' />
            </div>
            <div className='flex items-center mt-5'>
              <label><a href='#' className='text-blue-500'>Forget Password</a></label>
            </div>
            <button type='submit' className='w-full bg-blue-500 text-white font-bold text-[25px] p-3 rounded mt-4'>Login</button>
          </form>
        </div>
      </div>
    </>
  )
}

export default Login
