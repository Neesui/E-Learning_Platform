import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast, Toaster } from 'react-hot-toast';

const AddCoursesForm = () => {
  const [courseName, setCourseName] = useState('');
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [categories, setCategories] = useState([]); // State to hold category options
  const [error, setError] = useState('');

  // Fetch categories on component mount
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axios.get('http://localhost:4001/categories/getcategories'); // Adjust the endpoint as needed
        setCategories(res.data);
      } catch (err) {
        console.error('Error fetching categories:', err);
        toast.error('Failed to load categories');
      }
    };
    fetchCategories();
  }, []);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!courseName || !description || !imageUrl || !categoryId) {
      toast.error('All fields are required');
      return;
    }

    const formData = {
      courseName,
      description,
      imageUrl,
      categoryId, // Add categoryId to form data
    };

    try {
      const res = await axios.post('http://localhost:4001/courses/post', formData);
      setCourseName('');
      setDescription('');
      setImageUrl('');
      setCategoryId('');
      setError('');
      toast.success(res.data.message || 'Course added successfully');
    } catch (err) {
      console.error('Error adding course:', err);
      toast.error('Failed to add course');
    }
  };

  const uploadFileHandler = async (e) => {
    const formData = new FormData();
    formData.append('image', e.target.files[0]);

    try {
      const res = await axios.post('http://localhost:4001/uploads/', formData);
      console.log(res)
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
        <h2 className="text-2xl font-bold mb-4 text-gray-800">Add New Course</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-600 mb-1">Course Name:</label>
            <input
              type="text"
              value={courseName}
              onChange={(e) => setCourseName(e.target.value)}
              className="w-full border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter course name"
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
            <label className="block text-gray-600 mb-1">Category:</label>
            <select
              value={categoryId}
              onChange={(e) => setCategoryId(e.target.value)}
              className="w-full border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select a category</option>
              {categories.map((category) => (
                <option key={category._id} value={category._id}>
                  {category.categoryName}
                </option>
              ))}
            </select>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Add Course
          </button>
        </form>
        {error && <p className="mt-4 text-red-500">{error}</p>}
      </div>
    </>
  );
};

export default AddCoursesForm;
