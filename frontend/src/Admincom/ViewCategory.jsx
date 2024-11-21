import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast, Toaster } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const ViewCategories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Fetch categories on component mount
  useEffect(() => {
    const fetchCategories = async () => {
        try {
          const res = await axios.get('http://localhost:4001/categories/getcategories'); // Corrected endpoint to fetch all courses
          const category = res.data
          const cat1 = category || [ ]
          
          // Show success toast with meaningful message
          toast.success('Category loaded successfully!');
          
          // Set the courses data
          // setCourses(Array.isArray(res.data) ? res.data.courses : []);
          setCategories(cat1)
          setLoading(false);
        } catch (err) {
          console.error('Error fetching Category:', err);
          
          // Show error toast with more specific message
          toast.error('Failed to load Category. Please try again later.');
          setLoading(false);
        }
      };
  
      fetchCategories();
    }, []);

  // Delete category handler
  const handleDelete = async (categoryId) => {
    try {
      await axios.delete(`http://localhost:4001/categories/${categoryId}`);
      setCategories(categories.filter(category => category._id !== categoryId));
      toast.success('Category deleted successfully!');
    } catch (err) {
      console.error('Error deleting category:', err);
      toast.error('Failed to delete category. Please try again.');
    }
  };

  // Update category handler
  const handleUpdate = (categoryId) => {
    navigate(`/UpdateCategory/${categoryId}`);
    toast.info('Redirecting to update page.');
  };

  return (
    <>
      <Toaster />
      <div className="ml-8 mt-5 bg-white p-6 rounded-lg shadow-md w-full max-w-screen-lg mx-auto">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">View Categories</h2>
        {loading ? (
          <p>Loading categories...</p>
        ) : (
          <table className="w-full table-auto border-collapse border border-gray-200">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-gray-300 px-4 py-2 text-left">S.N.</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Image</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Category Name</th>
                <th className="border border-gray-300 px-4 py-2 text-left">level</th>
              </tr>
            </thead>
            <tbody>
              {categories.length > 0 ? (
                categories.map((category, index) => (
                  <tr key={category._id}>
                    <td className="border border-gray-300 px-4 py-2">{index + 1}</td>
                    <td className="border border-gray-300 px-4 py-2">
                      <img
                        src={category.imageUrl}
                        alt={category.courseName}
                        className="w-20 h-20 object-cover rounded-md"
                      />
                      </td>
                    <td className="border border-gray-300 px-4 py-2">{category.categoryName}</td>
                    <td className="border border-gray-300 px-4 py-2">{category.level}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="border border-gray-300 px-4 py-2 text-center">
                    No categories available.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>
    </>
  );
};

export default ViewCategories;
