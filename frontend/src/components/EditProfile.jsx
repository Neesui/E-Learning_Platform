import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast, Toaster } from 'react-hot-toast';
import { useParams, useNavigate } from 'react-router-dom';

const EditProfile = () => {
  const { studentId } = useParams();  // Get studentId from URL params
  const navigate = useNavigate();  // To navigate after updating the student
  
  // Define state variables for student info
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [error, setError] = useState('');

  // Fetch student data on component mount if studentId exists
  useEffect(() => {
    if (!studentId) {
      setError("Student ID is not available.");
      return;
    }

    const fetchStudent = async () => {
      try {
        const res = await axios.get(`http://localhost:4001/student/studentDetails/${studentId}`);
        console.log(res)
        const student = res.data;
        setName(student.name);
        setEmail(student.email);
        setAddress(student.address);
        setPhoneNumber(student.phoneNumber);
      } catch (err) {
        console.error('Error fetching student data:', err);
        toast.error('Failed to load student details');
        setError('Failed fetching student data');
      }
    };

    fetchStudent();
  }, [studentId]);

  // Handle form submission for profile update
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !email || !address || !phoneNumber) {
      toast.error('All fields are required');
      return;
    }

    const formData = { name, email, address, phoneNumber };

    try {
      const res = await axios.put(`http://localhost:4001/student/update/${studentId}`, formData);
      console.log(res)

      toast.success(res.data.message || 'Student updated successfully');
      navigate('/StudentDashboard'); // Redirect to student list or another page
    } catch (err) {
      console.error('Error updating student:', err);
      toast.error('Failed to update student');
    }
  };

  return (
    <>
      <Toaster />
      <div className="ml-[5vh] mt-[20vh] w-[80vh] h-[80vh] bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">Update Student</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-600 mb-1">Name:</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter name"
            />
          </div>
          <div>
            <label className="block text-gray-600 mb-1">Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter email"
            />
          </div>
          <div>
            <label className="block text-gray-600 mb-1">Address:</label>
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="w-full border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter address"
            />
          </div>
          <div>
            <label className="block text-gray-600 mb-1">Phone Number:</label>
            <input
              type="number"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              className="w-full border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter phone number"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Update Student
          </button>
        </form>
        {error && <p className="mt-4 text-red-500">{error}</p>}
      </div>
    </>
  );
};

export default EditProfile;
