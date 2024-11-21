// AddCategoryForm.js
import React, { useState } from 'react';
import axios from 'axios';
import { toast, Toaster } from 'react-hot-toast';

const AddCategoryForm = () => {
  const [categoryName, setCategoryName] = useState('');
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [level, setLevel] = useState('');
  const [error, setError] = useState('');

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!categoryName || !description || !imageUrl || !level) {
      setError('All fields are required');
      return;
    }

    const formData = {
      categoryName,
      description,
      imageUrl,
      level,
    };

    try {
      const res = await axios.post('http://localhost:4001/categories/postcategories', formData);

      // Reset form fields upon successful submission
      setCategoryName('');
      setDescription('');
      setImageUrl('');
      setLevel('');
      setError('');
      toast.success(res.data.message || 'Category added successfully');
    } catch (err) {
      console.error('Error adding category:', err);
      toast.error('Failed to add category');
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
      <div className=" ml-[20vh] w-[100vh] h-[80vh] mt-5 bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">Add New Category</h2>
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
              value={description}
              onChange={(e) => setDescription(e.target.value)}
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
          <div>
            <label className="block text-gray-600 mb-1">Level:</label>
            <input
              type="text"
              value={level}
              onChange={(e) => setLevel(e.target.value)}
              className="w-full border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter level"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Add Category
          </button>
        </form>
        {error && <p className="mt-4 text-red-500">{error}</p>}
      </div>
    </>
  );
};

export default AddCategoryForm;
