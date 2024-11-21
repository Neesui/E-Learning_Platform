import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import logo from '../../public/logoooo.png';
import SearchBox from './SearchBox';

function Navbar() {
    const [isStudent, setIsStudent] = useState(false);
    const [student, setStudent] = useState(null);
    const location = useLocation(); // Hook to get current route

    useEffect(() => {
        // Function to check authentication status
        const checkAuthentication = () => {
            const storedStudent = localStorage.getItem('Nisha');
            if (storedStudent) {
                try {
                    const parsedStudent = JSON.parse(storedStudent);
                    setStudent(parsedStudent);
                    setIsStudent(true);
                } catch (error) {
                    console.error("Error parsing student data:", error);
                    localStorage.removeItem('Nisha'); // Clear the corrupted data
                    setIsStudent(false); // Update state to reflect no student logged in
                }
            } else {
                setIsStudent(false); // Update state if no student data is present
            }
        };

        // Check authentication status on location change
        checkAuthentication();
    }, [location]); // Dependency array includes location to handle navigation changes

    const handleLogout = () => {
        localStorage.removeItem("Nisha");
        setIsStudent(false); // Update state on logout
    };

    const navItems = (
        <>
            <li><Link to="/" className='text-white text-[4vh] '>Home</Link></li>
            <li><Link to="/aboutus" className='text-white text-[4vh]'>About us</Link></li>
            <li><Link to="/courses" className='text-white text-[4vh]'>Courses</Link></li> 
        </>
    );

    return (
        <div className="h-[90px] shadow-xl pb-[16vh] fixed top-0 left-0 right-0 z-40 bg-[#00224D]">
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
                            className="menu menu-sm  dropdown-content ">
                            {navItems}
                        </ul> 
                    </div>
                    <figure className='w-[130px] h-[85px] ml-[5vh] mr-[5vh]'>
                        <img src={logo} className='w-[130px] h-[95px]' alt="logo"/>
                    </figure>
                <SearchBox />
                </div>
                <div className='navbar-end'>
                    <div className="navbar-center  mr-16">
                        <ul className="menu menu-horizontal px-1 space-x-9 text-white mt-4 font-bold">{navItems}</ul>
                    </div>
                    <div className="flex items-center space-x-6 pr-[10vh] mt-2">
                        {isStudent ? (
                            <Link to="/StudentDashboard">
                                <img 
                                    src={student?.profilePicture || 'https://www.icon0.com/free/static2/preview2/stock-photo-cute-cartoon-girl-in-glasses-avatar-people-icon-character-cartoo-33356.jpg'} 
                                    alt="Profile"
                                    className="w-14 h-14 rounded-full border-2 border-white  object-cover shadow-lg"
                                />
                            </Link>
                        ) : (
                            <Link to="/Login">
                                <button className="btn text-[3vh] font-bold hover:bg-red-500 hover:border-red-500 hover:text-white">Login</button>
                            </Link>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Navbar;
