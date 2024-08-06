import React from 'react';
import { BiSolidCategory } from "react-icons/bi";
import { FaYoutube } from "react-icons/fa";
import { PiCertificateFill } from "react-icons/pi";
import { FaHeart } from "react-icons/fa";
import { FaRegStar } from "react-icons/fa";

function CourseDetails() {
  return (
    <>
      <div className="p-6 bg-[#E0FBE2]">
        <div className="flex mt-5">
          {/* Course Details */}
          <div className="mt-24 font-bold w-3.5/5 pl-12 space-y-2 text-[25px]">
            <h1 className="text-[5vh]">Web Development using MERN</h1>
            <p>Course Review <FaRegStar className='inline-block ml-2 text-yellow-400'/></p>
            <p><BiSolidCategory className='inline-block mr-2 text-green-800'/>Categories: Web Design</p>
            <p><FaYoutube className='inline-block mr-2 text-red-600'/>Lectures No: 6</p>
            <p><PiCertificateFill className='inline-block mr-2 text-purple-900'/>For Free Certificate After Complete The Course</p>
            <p><FaHeart className='inline-block mr-2 text-pink-400'/>Add to Wishlist</p>
            <p className='text-[25px] pb-3'>To Register in Course you have to watch at least 30 Seconds of any lesson</p>
            <button className='w-[40vh] h-[10vh] text-[5vh] rounded-xl bg-red-500 text-white'>Start Now</button>
          </div>
          {/* Course Image */}
          <div className="ml-5">
            <img src="https://media.licdn.com/dms/image/D4D12AQGXjzbAJKAgOw/article-cover_image-shrink_720_1280/0/1680499811064?e=2147483647&v=beta&t=O6p5lltuhPf9wQA0L2PBjfO7JBcmXoPT1JlrSRHN-YE" alt="Course" className='w-80 h-75 mt-24'/>
          </div>
        </div>
        {/* Topic Overview */}
        <div className="mt-12 ml-8">
          <center className="text-[5vh] font-bold ">Topic Overview</center>
          <h2 className="text-[5vh] font-bold mt-4">About This Course</h2>
          <div className='w-5/5 mt-4 font-bold text-[3vh]'>
            <p>Now to bridge the gap between industry and IT students, Learning is launching a 6 months Full Stack Development with MERN Course.</p>
            <p className="mt-2">Full Stack Development with MERN Course by E-Learning covers basic to advanced Mongo DB, Express JS, React, Node JS, security best practices and more.</p>
            <p className="mt-2 italic">Introduction to Full Stack Development with MERN: Get started by understanding the fundamentals of full stack development and the key components of the MERN stack. Explore how these technologies work together to create robust and scalable web applications.</p>
          </div>
        </div>
        {/* Lessons and Related Videos */}
        <div className="mt-12 ml-[12vh]">
          <h1 className="text-[4vh] font-bold">Lesson :6</h1>
          <div className="flex flex-wrap space-x-12">
            {[...Array(4)].map((_, index) => (
              <div key={index} className="w-1/5 mt-4">
                <img src="https://media.licdn.com/dms/image/D4D12AQGXjzbAJKAgOw/article-cover_image-shrink_720_1280/0/1680499811064?e=2147483647&v=beta&t=O6p5lltuhPf9wQA0L2PBjfO7JBcmXoPT1JlrSRHN-YE" alt="Lesson" className="w-full h-40"/>
                <p className="text-center mt-2">Learn The MERN Stack 1 Series Introduction</p>
                {/* <p className="text-center text-gray-500">01:20:30</p> */}
              </div>
            ))}
          </div>
          <h1 className="text-[4vh] font-bold mt-12">Related Video</h1>
          <div className="flex flex-wrap space-x-12">
            {[...Array(4)].map((_, index) => (
              <div key={index} className="w-1/5 mt-4">
                <img src="https://media.licdn.com/dms/image/D4D12AQGXjzbAJKAgOw/article-cover_image-shrink_720_1280/0/1680499811064?e=2147483647&v=beta&t=O6p5lltuhPf9wQA0L2PBjfO7JBcmXoPT1JlrSRHN-YE" alt="Related Video" className="w-full h-40"/>
                <p className="text-center mt-2">Learn The MERN Stack 1 Series Introduction</p>
                {/* <p className="text-center text-gray-500">01:20:30</p> */}
              </div>
            ))}
          </div>
        </div>
        {/* Feedback Section */}
        <div className="mt-12 pl-[10vh]">
          <h1 className="text-[5vh] font-bold">We Appreciate Your Feedback</h1>
          <p className="text-[3vh] mt-3 font-bold">How Much Stars ?</p>
          <div className="rating mt-2">
            <input type="radio" name="rating-4" className="mask mask-star-2 bg-yellow-500" />
            <input type="radio" name="rating-4" className="mask mask-star-2 bg-yellow-500" defaultChecked />
            <input type="radio" name="rating-4" className="mask mask-star-2 bg-yellow-500" />
            <input type="radio" name="rating-4" className="mask mask-star-2 bg-yellow-500" />
            <input type="radio" name="rating-4" className="mask mask-star-2 bg-yellow-500" />
          </div>
        </div>
          <div className="mt-8 w-[60vh] pl-[10vh]">
            <input type="text" placeholder="Write your review here" className="border p-2 w-[50vh]  placeholder:text-[18px]  font-bold rounded"/>
            <button className="bg-green-700 text-white p-2 mt-2 w-[25vh] font-bold text-[3vh] rounded">Review Now</button>
          </div>
      </div>
    </>
  );
}

export default CourseDetails;
