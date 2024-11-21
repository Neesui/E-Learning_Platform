import React from 'react';
import learn from "../../public/learn.png";

function Aboutus() {
  return (
    <>
      <div className="mt-[15vh] flex-col bg-blue-200">
        <div className='mt-[15vh] flex'>
            <img src="https://www.interviewbit.com/blog/wp-content/uploads/2022/01/Web-Development-Books-800x391.png" alt="" />
            <a href="" className='text-[30px] mt-[25vh] ml-[30vh] underline'>About us</a>
        </div>

        {/* E-learning Section */}
        <div className="w-full flex justify-center">
          <div className="w-1/2 mt-10 mr-[8vh]">
            <h3 className="text-[35px] font-bold text-blue-800">E-learning</h3>
            <p className="text-[20px] text-gray-800">
              E-learning is The Biggest Educational and Training Platform in the world.
              "E-learning stands as the largest and most comprehensive educational and 
              training platform globally, providing a vast array of resources and opportunities 
              for learners from all walks of life."
            </p>
            <p className="text-[20px] text-gray-800 font-bold">
              Training is free and will remain free
            </p>
            <p className="text-[20px] text-gray-800">
              More than 120 million students learn annually within the platform without any fees.
            </p>
          </div>
          <div className="w-1/3">
            <img src={learn} alt="E-learning" className='w-300 h-300 ml-[5vh]' />
          </div>
        </div>

          {/* Right Side - FAQ Section */}
          <div className="w-1/2 p-4 bg-blue-100 ml-2">
            <h3 className="text-[25px] font-bold mb-5">Frequently Asked Questions</h3>

            {/* First Question */}
            <div className="collapse collapse-plus bg-base-200">
              <input type="radio" name="faq-accordion" defaultChecked />
              <div className="collapse-title text-xl font-medium">Can I pause a lesson and resume it at any time?</div>
              <div className="collapse-content">
                <p className="text-[20px] text-gray-800">Yes, you can pause and resume the lesson anytime you want.</p>
              </div>
            </div>

            {/* Third Question */}
            <div className="collapse collapse-plus bg-base-200 mt-4">
              <input type="radio" name="faq-accordion" />
              <div className="collapse-title text-xl font-medium">If I'm from a non-IT background, am I eligible to enroll in the course?</div>
              <div className="collapse-content">
                <p className="text-[20px] text-gray-800">Yes, our courses are designed for everyone, including those from non-IT backgrounds.</p>
              </div>
            </div>
          </div>
        </div>

    </>
  )
}

export default Aboutus;
