import React from "react";
import logo from "../../public/gigg.gif";
import shape from "../../public/lamp.png";
import shape2 from "../../public/book.png";
import data from "../../public/list.json";

function MainPage() {
  // Filter categories to include only "Courses"
  const categories = data.filter(item => item.category === "Courses");

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
              <h1 className="foont text-[#030637] text-[58px]">Find Your Perfect Courses</h1>
              <h1 className="foont text-[#030637] text-[58px] mt-[40px]">& Improve Your Skills</h1>
            </div>
            <p className="foont text-[#030637] text-3xl mt-[30px] ml-[10vh]">
              Learn 100% online with world-class universities and industry experts.
            </p>
            <div className="flex items-center mt-[5vh] ml-[10vh]">
              <button className="bg-yellow-500 border-yellow-700 text-black text-4xl font-bold rounded-[12px] w-[50vh] h-[12vh]">
                Explore Courses
              </button>
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

      {/* Top Courses Section */}
      <section className="py-12">
        <h2 className="text-[5vh] font-bold text-center mb-6">"Top course on Learning, check it out!"</h2>
        <div className="flex flex-wrap">
          {data.map((course, index) => (
            <div key={index} className="bg-[#c0dcf8] p-5">
              <div className="card w-[45vh] h-[50vh] shadow-lg shadow-black bg-white rounded-lg overflow-hidden">
                <figure className="w-full h-full overflow-hidden">
                  <img
                    src={course.imageUrl}
                    alt="Course"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-2 left-2 bg-white text-black text-[20px] px-2 py-1 rounded">Free</div>
                </figure>
                <div className="card-body p-4 bg-[#e3facb]">
                  <div className="badge bg-green-300 w-[20vh] h-[6vh] text-black font-serif font-bold flex items-center justify-center">
                    Intermediate
                  </div>
                  <h2 className="course-title text-[20px] font-bold">{course.title}</h2>
                  <p className="text-[20px]">{course.description}</p>
                  <div className="flex">
                    <p className="text-blue-500">admin</p>
                    <p className="text-blue-500 flex">Lectures</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Explore Course Categories Section */}
      <section className="py-12">
        <h2 className="text-[5vh] font-bold text-center mb-6">Explore Course Categories</h2>
        <div className="carousel rounded-box justify-around pl-3 flex overflow-x-auto">
          {categories.map((item, i) => (
            <div key={i} className="carousel-item w-[46vh] p-4 shadow-lg flex-none">
              <div className="flex flex-col items-center">
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  className="w-full h-48 object-cover mb-4"
                />
                <h3 className="font-bold">{item.title}</h3>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Feedback Section */}
      <section className="py-12">
        <h2 className="text-[5vh] font-bold text-center mb-6">What Our Students Say</h2>
        <div className="flex justify-around">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="testimonial-card w-[55vh] space-x-8 p-4 shadow-lg bg-pink-200">
              <div className="flex items-center">
                <img src="https://www.svgrepo.com/show/382097/female-avatar-girl-face-woman-user-9.svg" alt="Avatar" className="w-12 h-12 object-cover" />
                <div className="ml-4">
                  <h3 className="font-bold">Nisha Chaudhary</h3>
                  <p className="text-sm text-gray-500">Web developer</p>
                </div>
              </div>
              <p className="mt-4 text-sm">
                I was from a non-tech background but I was able to pick up all the concepts of React. I would highly recommend this front-end course to others.
              </p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}

export default MainPage;
