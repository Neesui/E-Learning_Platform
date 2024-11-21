import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast, Toaster } from 'react-hot-toast';

const ViewStudentDetails = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch student details on component mount
  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const res = await axios.get('http://localhost:4001/student/studentlist'); // Adjust endpoint to fetch all students
        const fetchedStudents = res.data;

        // Log data to check if it's correct
        console.log('Fetched Students:', fetchedStudents);

        // Show success toast
        toast.success('Students loaded successfully!');

        // Set the student data
        setStudents(fetchedStudents || []);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching students:', err);

        // Show error toast
        toast.error('Failed to load students. Please try again later.');
        setLoading(false);
      }
    };

    fetchStudents();
  }, []);

  return (
    <>
      <Toaster />
      <div className="ml-8 mt-5 bg-white p-6 rounded-lg shadow-md w-full max-w-screen-lg mx-auto">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">View Student Details</h2>
        {loading ? (
          <p>Loading student details...</p>
        ) : (
          <table className="w-full table-auto border-collapse border border-gray-200">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-gray-300 px-4 py-2 text-left">S.N.</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Name</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Email</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Address</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Phone Number</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Courses Enrolled</th>
              </tr>
            </thead>
            <tbody>
              {students.length > 0 ? (
                students.map((student, index) => (
                  <tr key={student._id}>
                    <td className="border border-gray-300 px-4 py-2">{index + 1}</td>
                    <td className="border border-gray-300 px-4 py-2">{student.name}</td>
                    <td className="border border-gray-300 px-4 py-2">{student.email}</td>
                    <td className="border border-gray-300 px-4 py-2">{student.address}</td>
                    <td className="border border-gray-300 px-4 py-2">{student.phoneNumber}</td>
                    <td className="border border-gray-300 px-4 py-2">
                      {student.courses && student.courses.length > 0 ? (
                        student.courses.map((course, idx) => (
                          <div key={idx}>
                            <p>Course Name: {student.course}</p>
                            <p>Progress: {course.isCompleted ? "Completed" : "In Progress"}</p>
                          </div>
                        ))
                      ) : (
                        <p>No courses enrolled</p>
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="border border-gray-300 px-4 py-2 text-center">
                    No students available.
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

export default ViewStudentDetails;
