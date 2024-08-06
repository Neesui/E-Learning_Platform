import React from 'react'
import logo from '../../public/logoooo.png'
import { MdEmail } from "react-icons/md";


function Footer() {
  return (
    <>
    <div>
      <footer className="footer bg-[#022C43] text-white p-10">
        <aside>
          <div>
          <img src={logo}  className='w-[130px] h-full '/>
          </div>
          <div className='text-[20px] mb-10'>
            <p><MdEmail className='inline-block mr-3 '/><b>elearning123@gmail.com</b></p>
          </div>
          
        </aside>
        <nav>
          <h6 className="footer-title text-bold">About</h6>
          <a className="link link-hover">About us</a>
          <a className="link link-hover">Contact</a>
          <a className="link link-hover">Blogs</a>
        </nav>
        <nav>
          <h6 className="footer-title">Link</h6>
          <a className="link link-hover">Enroll Courses</a>
          <a className="link link-hover">Our Placement Partners</a>
          <a className="link link-hover">News and Blogs</a>
        </nav>
      </footer>
    </div>
    </>
  )
}

export default Footer
