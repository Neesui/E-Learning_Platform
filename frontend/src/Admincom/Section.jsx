import React, { useState, useEffect } from 'react';
import { FaUserAlt, FaBookOpen, FaCertificate } from 'react-icons/fa';
import axios from 'axios';
import { toast, Toaster } from 'react-hot-toast';

const Section = () => {
  const [students, setStudents] = useState([]);
  const [totalCourses, setTotalCourses] = useState(0);
  const [totalStudents, setTotalStudents] = useState(0);
  const [certificates, setCertificates] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch students and courses data
        const studentRes = await axios.get('http://localhost:4001/students/getStudents');
        const courseRes = await axios.get('http://localhost:4001/courses/getCourses');

        // Set students data and calculate total students
        setStudents(studentRes.data.students || []);
        setTotalStudents(studentRes.data.students.length || 0);

        // Calculate total courses
        setTotalCourses(courseRes.data.courses.length || 0);

        // Calculate certificates count based on students with certificates
        const certificatesCount = studentRes.data.students.filter(s => s.hasCertificate).length;
        setCertificates(certificatesCount);

        // Show success message
        toast.success('Data loaded successfully!');
      } catch (error) {
        console.error('Error fetching data:', error);
        toast.error('Failed to load data. Please try again.');
      } finally {
        setLoading(false); // Set loading to false after data fetch
      }
    };

    fetchData();
  }, []);

  return (
    <div className="p-6 bg-gray-100">
      <Toaster />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        {/* Total Students Card */}
        <div className="bg-white p-4 rounded-lg shadow-md flex items-center">
          <FaUserAlt className="text-4xl text-blue-500 ml-5" />
          <div className="ml-10">
            <h2 className="text-lg font-bold mb-2">Total Students</h2>
            <p className="text-3xl font-semibold">{totalStudents}</p>
          </div>
        </div>

        {/* Total Courses Card */}
        <div className="bg-white p-4 rounded-lg shadow-md flex items-center">
          <FaBookOpen className="text-4xl text-green-500 ml-5" />
          <div className="ml-10">
            <h2 className="text-lg font-bold mb-2">Total Courses</h2>
            <p className="text-3xl font-semibold">{totalCourses}</p>
          </div>
        </div>

        {/* Certificates Card */}
        <div className="bg-white p-4 rounded-lg shadow-md flex items-center">
          <FaCertificate className="text-4xl text-yellow-500 ml-5" />
          <div className="ml-10">
            <h2 className="text-lg font-bold mb-2">Certificates</h2>
            <p className="text-3xl font-semibold">{certificates}</p>
          </div>
        </div>
      </div>

      {/* Student Progress Section */}
      <div className="bg-white w-full md:w-2/4 p-4 rounded-lg shadow-md">
        <h2 className="text-lg font-bold mb-4">Students Progress</h2>
        {loading ? (
          <p>Loading data...</p>
        ) : (
          <div className="space-y-4">
            {students.map((student) => (
              <div key={student._id} className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <img
                    src={student.image || 'https://via.placeholder.com/150'}
                    alt={`${student.name}'s profile`}
                    className="w-10 h-10 rounded-full bg-gray-300 object-cover"
                  />
                  <div className="flex items-center space-x-2">
                    <FaUserAlt className="text-gray-500" />
                    <span className="font-semibold">{student.name}</span>
                  </div>
                </div>
                <div className="w-2/3">
                  <div className="relative h-4 ml-4 bg-gray-200 rounded-full">
                    <div
                      className="absolute top-0 left-0 h-4 rounded-full bg-blue-500"
                      style={{ width: `${student.progress || 0}%` }}
                    ></div>
                  </div>
                </div>
                <span className="font-semibold">{student.progress || 0}%</span>
              </div>
            ))}
          </div>
        )}
        <button className="mt-4 text-blue-600 hover:underline">View List</button>
      </div>
    </div>
  );
};

export default Section;
