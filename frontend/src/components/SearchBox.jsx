import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';

const SearchBox = () => {
    const navigate = useNavigate()
    const { keyword: urlKeyword } = useParams();
    const [keyword, setKeyword] = useState(urlKeyword || "");
    const submitHandler = (e) => {
        e.preventDefault();
        if (keyword.trim()) {
          navigate(`/Courses/search/${keyword}`);
          setKeyword(""); 
        } else {
          navigate("/Courses");
        }
      };

  return (
    <>
      {/* search box */}
      <form onSubmit={submitHandler} className="mt-3 flex-grow">
            <label className="input input-bordered flex items-center m-0 bg-white w-full max-w-[22rem]">
                <input type="text" className="w-full placeholder-gray-500 p-2" placeholder="Search" value={keyword} onChange={(e) => setKeyword(e.target.value)}/>
                <button type='submit'>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="black" className="h-4 w-4 opacity-200">
                    <path fillRule="evenodd" d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z" clipRule="evenodd" />
                    </svg>
                </button>
            </label>
        </form>
    </>
  )
}

export default SearchBox
