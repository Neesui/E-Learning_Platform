import React from 'react';
import logo from '../../public/logoooo.png';
import { Link } from 'react-router-dom';

function Navbar() {
    const navItems = (
        <>
          <li><Link to="/" className='text-white text-[3vh]'>Home</Link></li>
          <li><Link to="/aboutus" className='text-white text-[3vh]'>About us</Link></li>
          <li><Link to="/courses" className='text-white text-[3vh]'>Courses</Link></li>
          <li><Link to="/blogs" className='text-white text-[3vh]'>Blogs</Link></li>
        </>
      );

    return (
        <div className="h-[90px] shadow-xl  pb-[16vh] fixed top-0 left-0 right-0 z-40 bg-[#00224D]">
            <div className="navbar">
                <div className="navbar-start">
                    <div className="dropdown">
                        <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="bg-white">
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M4 6h16M4 12h8m-8 6h16" />
                            </svg>
                        </div>
                        <ul
                            tabIndex={0}
                            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-1 shadow">
                            {navItems}
                        </ul>
                    </div>
                    <figure className='w-[130px] h-[85px] ml-[5vh] mr-[5vh]'>
                        <img src={logo} className='w-[130px] h-[95px]' alt="logo"/>
                    </figure>
                    <div className="hidden md:block ml-6 mt-3">
                        <label className="input input-bordered flex items-center m-0 bg-white mr-[20vh]">
                            <input type="text" className="grow placeholder-gray-500" placeholder="Search" />
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="black" className="h-4 w-4 opacity-200">
                                <path fillRule="evenodd" d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z" clipRule="evenodd" />
                            </svg>
                        </label>
                    </div>
                </div>
                <div className='navbar-end'>
                    <div className="navbar-center hidden lg:flex mr-16">
                        <ul className="menu menu-horizontal px-1 space-x-3 mt-4 font-bold">{navItems}</ul>
                    </div>
                    <div className="flex items-center space-x-6 pr-[10vh] mt-4">
                        <button className="btn hover:bg-[#74E291] hover:border-[#74E291]">Register</button>
                        <button className="btn hover:bg-red-500 hover:border-red-500 hover:text-white">Login</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Navbar;
