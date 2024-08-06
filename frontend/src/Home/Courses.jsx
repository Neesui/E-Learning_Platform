import React from 'react';

function Courses() {
  return (
    <div className='bg-[#E7F4FF] min-h-screen p-8'>
      {/* Topic categories */}
      <div className='max-w-7xl mx-auto'>
        <div className='flex space-x-4'>
          <div className='w-1/4 bg-white p-4 rounded-lg shadow-md'>
            <h2 className='text-xl font-bold mb-4'>Filter by category</h2>
            <ul className='space-y-2'>
              <li>
                <input type='checkbox' id='web-dev' className='mr-2'/>
                <label htmlFor='web-dev'>Web Development</label>
              </li>
              <li>
                <input type='checkbox' id='mobile-dev' className='mr-2'/>
                <label htmlFor='mobile-dev'>Mobile Application Development</label>
              </li>
              <li>
                <input type='checkbox' id='python' className='mr-2'/>
                <label htmlFor='python'>Python Django</label>
              </li>
              <li>
                <input type='checkbox' id='ui-ux' className='mr-2'/>
                <label htmlFor='ui-ux'>UI/UX Design</label>
              </li>
              <li>
                <input type='checkbox' id='data-science' className='mr-2'/>
                <label htmlFor='data-science'>Data Science and Machine Learning</label>
              </li>
              <li>
                <input type='checkbox' id='frontend-dev' className='mr-2'/>
                <label htmlFor='frontend-dev'>Frontend Development</label>
              </li>
              <li>
                <input type='checkbox' id='backend-dev' className='mr-2'/>
                <label htmlFor='backend-dev'>Backend Development</label>
              </li>
            </ul>
            {/* topic upload by admin */}
            <h2 className='text-xl font-bold mt-6 mb-4'>Filter by</h2>
            <div>
              <p className='font-semibold mb-2'>INSTRUCTOR</p>
              <div className='mb-4'>
                <input type='checkbox' id='admin' className='mr-2'/>
                <label htmlFor='admin'>Admin</label>
              </div>
              {/* coursses level */}
              <p className='text-xl font-bold mt-6 mb-4'>Level</p>
              <div className='mb-4'>
                <input type='checkbox' id='intermediate' className='mr-2'/>
                <label htmlFor='intermediate'>Intermediate</label>
              </div>
              <div className='mb-4'>
                <input type='checkbox' id='intermediate' className='mr-2'/>
                <label htmlFor='intermediate'>Advance</label>
              </div>
             
            </div>
          </div>
          {/* list of courses */}
          <div className='w-3/4'>
            <h2 className='text-2xl font-bold mb-4'>Courses Available for you</h2>
            {[...Array(4)].map((_, index) => (
              <div key={index} className='bg-white mb-4 p-4 rounded-lg shadow-md'>
                <div className='flex'>
                  <img
                    src='https://media.dev.to/cdn-cgi/image/width=1600,height=900,fit=cover,gravity=auto,format=auto/https%3A%2F%2Fdev-to-uploads.s3.amazonaws.com%2Fuploads%2Farticles%2Fwhh1lpihw7h587pb2iuc.png'
                    alt='Course'
                    className='w-1/3 h-40 object-cover rounded-md'
                  />
                  <div className='ml-4 w-2/3'>
                    <h3 className='text-xl font-bold'>Frontend Development</h3>
                    <p className='text-gray-600'>2 Months REACT Diploma Course</p>
                    <p className='text-gray-500'>Now to bridge the gap between industry and IT students, ...</p>
                    <div className='mt-2 flex space-x-2'>
                      <span className='text-blue-500'>Lectures</span>
                      <span className='text-gray-500'>●</span>
                      <span className='text-blue-500'>Intermediate</span>
                    </div>
                    <button className='mt-4 bg-yellow-500 hover:bg-purple-600 font-bold text-white py-2 px-4 rounded-lg'>
                      Enroll Now
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Courses;
