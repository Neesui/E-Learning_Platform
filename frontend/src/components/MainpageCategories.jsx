import React, { useEffect, useState } from 'react';
import axios from 'axios';

const MainpageCategories = () => {
  const [categories, setCategories] = useState([]); // State to hold categories
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state

  useEffect(() => {
    // Function to fetch categories data from the backend
    const fetchCategories = async () => {
      try {
        const response = await axios.get('http://localhost:4001/categories/getcategories'); // Update with your actual API endpoint
        setCategories(response.data); // Store fetched data in state
      } catch (error) {
        console.error('Error fetching categories:', error);
        setError('Failed to load categories.'); // Set error message
      } finally {
        setLoading(false); // Set loading to false
      }
    };

    fetchCategories(); // Call the fetch function
  }, []); // Run on component mount

  if (loading) return <p className="text-center">Loading...</p>; // Loading message
  if (error) return <p className="text-red-500 text-center">{error}</p>; // Error message

  return (
    <>
      {/* Explore Course Categories Section */}
      <section className="py-12">
        <h2 className="text-[5vh] font-bold text-center mb-6">Explore Course Categories</h2>
        <div className="carousel rounded-box pl-3 flex overflow-x-auto ml-[8vh]">
          {categories.map((category) => (
            <div key={category._id} className="carousel-item w-[46vh] p-4 shadow-lg">
              <div className="flex flex-col">
                <img
                  src={`${category.imageUrl}`} // Prepend the base URL to the image path
                  alt={category.categoryName} // Use the categoryName for alt text
                  className="w-full h-48 object-cover mb-4"
                />
                <h3 className="font-bold">{category.categoryName}</h3> {/* Display category name */}
                <p>{category.description}</p> {/* Display category description */}
                <h4 className='font-bold'>{category.level}</h4> {/* Display category level */}
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
};

export default MainpageCategories;
