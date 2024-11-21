import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast, Toaster } from 'react-hot-toast';
import { useParams, useNavigate } from 'react-router-dom';

const UpdateCategory = () => {
  const { categoryId } = useParams(); // Get the categoryId from URL params
  const navigate = useNavigate(); // To navigate to another page after the update

  const [categoryName, setCategoryName] = useState('');
  const [categoryDescription, setCategoryDescription] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [error, setError] = useState('');

  // Fetch category on component mount
  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const res = await axios.get(`http://localhost:4001/categories/categoryDetails/${categoryId}`);
        const category = res.data;
        setCategoryName(category.categoryName);
        setCategoryDescription(category.categoryDescription);
        setImageUrl(category.imageUrl);
      } catch (err) {
        console.error('Error fetching category data:', err);
        toast.error('Failed to load category details');
      }
    };

    fetchCategory();
  }, [categoryId]);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!categoryName || !categoryDescription || !imageUrl) {
      toast.error('All fields are required');
      return;
    }

    const formData = {
      categoryName,
      categoryDescription,
      imageUrl,
    };

    try {
      const res = await axios.put(`http://localhost:4001/categories/update/${categoryId}`, formData);
      toast.success(res.data.message || 'Category updated successfully');
      navigate('/categories'); // Navigate to categories list page after success
    } catch (err) {
      console.error('Error updating category:', err);
      toast.error('Failed to update category');
    }
  };

  const uploadFileHandler = async (e) => {
    const formData = new FormData();
    formData.append('image', e.target.files[0]);

    try {
      const res = await axios.post('http://localhost:4001/uploads/', formData);
      toast.success(res.data.message || 'Image uploaded successfully');
      setImageUrl(res.data.image);
    } catch (err) {
      toast.error(err.response?.data?.message || 'Image upload failed');
    }
  };

  return (
    <>
      <Toaster />
      <div className="ml-[20vh] w-[100vh] h-[80vh] mt-5 bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">Update Category</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-600 mb-1">Category Name:</label>
            <input
              type="text"
              value={categoryName}
              onChange={(e) => setCategoryName(e.target.value)}
              className="w-full border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter category name"
            />
          </div>
          <div>
            <label className="block text-gray-600 mb-1">Description:</label>
            <textarea
              value={categoryDescription}
              onChange={(e) => setCategoryDescription(e.target.value)}
              className="w-full border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter description"
            />
          </div>
          <div>
            <label className="block text-gray-600 mb-1">Image:</label>
            <input
              type="file"
              onChange={uploadFileHandler}
              className="w-full text-gray-600 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Update Category
          </button>
        </form>
        {error && <p className="mt-4 text-red-500">{error}</p>}
      </div>
    </>
  );
};

export default UpdateCategory;
