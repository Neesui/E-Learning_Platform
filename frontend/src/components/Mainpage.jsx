import logo from "../../public/gigg.gif";
import React from 'react';
import { Link } from 'react-router-dom';
import shape from "../../public/lamp.png";
import shape2 from "../../public/book.png";

const MainPage = () => {
  return (
    <>
      {/* Header Section */}
      <div className="w-full flex">
        <div className="w-[60%] mt-[15vh]">
          <img
            src={shape}
            className="w-[170px] h-[170px] ml-[450px] animation-zoro"
            alt="Lamp"
          />
          <div className="mt-[-1vh]">
            <div className="ml-[10vh]">
              <h1 className="foont text-[#030637] font-bold text-[58px]">
                Find Your Perfect Courses
              </h1>
              <h1 className="foont text-[#030637] font-bold text-[58px] mt-[10px]">
                & Improve Your Skills
              </h1>
            </div>
            <p className="foont text-[#030637] text-3xl mt-[30px] ml-[10vh]">
              Learn 100% online with world-class universities and industry experts.
            </p>
            <div className="flex items-center mt-[5vh] ml-[10vh]">
              <Link to="/Courses">
                <button className="bg-yellow-500 border-yellow-700 text-black text-4xl font-bold rounded-[12px] w-[50vh] h-[12vh]">
                  Explore Courses
                </button>
              </Link>
              <img
                src={shape2}
                className="w-[150px] h-[100px] ml-[90px] animation-zoro"
                alt="Book"
              />
            </div>
          </div>
        </div>
        <div className="order-1 w-full mt-[20vh] mr-[3vh] mb-[1vh] md:w-1/2">
          <img
            src={logo}
            className="w-full h-full pb-[10vh]"
            alt="Logo"
          />
        </div>
      </div>
    </>
  );
};

export default MainPage;

