import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast, Toaster } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const StudentInfo = () => {
  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [studentDetails, setStudentDetails] = useState({});
  const navigate = useNavigate(); // Initialize useNavigate hook

  useEffect(() => {
    const fetchStudent = async () => {
      const storedStudentData = localStorage.getItem('Nisha');
      let studentId;

      try {
        const parsedData = JSON.parse(storedStudentData);
        studentId = parsedData._id || storedStudentData;
      } catch (error) {
        studentId = storedStudentData;
      }

      if (!studentId) {
        toast.error("No student logged in.");
        setLoading(false);
        return;
      }

      try {
        const res = await axios.get(`http://localhost:4001/student/studentDetails/${studentId}`);
        const fetchedStudent = res.data;

        if (fetchedStudent) {
          toast.success('Student data loaded successfully!');
          setStudent(fetchedStudent);
          setStudentDetails(fetchedStudent); // Initialize studentDetails state for editing
        } else {
          toast.error('Student not found.');
        }
      } catch (err) {
        console.error('Error fetching student:', err);
        toast.error('Failed to load student data. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchStudent();
  }, []);

  const handleEditClick = () => {
    // Redirect to EditProfile page
    navigate(`/EditProfile/${student._id}`);
  };

  return (
    <>
      <Toaster />
      <div className="mt-[16vh]">
        <div className="mt-[20vh] bg-white p-6 rounded-lg">
          <h2 className="text-2xl font-bold mb-4 text-gray-800">Student Details</h2>
          {loading ? (
            <p>Loading student details...</p>
          ) : student ? (
            <table className="w-full table-auto border-collapse border border-gray-200">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border border-gray-300 px-4 py-2 text-left">Name</th>
                  <th className="border border-gray-300 px-4 py-2 text-left">Email</th>
                  <th className="border border-gray-300 px-4 py-2 text-left">Address</th>
                  <th className="border border-gray-300 px-4 py-2 text-left">Phone Number</th>
                  {/* <th className="border border-gray-300 px-4 py-2 text-left">Courses Enrolled</th> */}
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-gray-300 px-4 py-2">{student.name}</td>
                  <td className="border border-gray-300 px-4 py-2">{student.email}</td>
                  <td className="border border-gray-300 px-4 py-2">{student.address}</td>
                  <td className="border border-gray-300 px-4 py-2">{student.phoneNumber}</td>
                  <td className="border border-gray-300 px-4 py-2">
                    {/* {student.courses && student.courses.length > 0 ? (
                      student.courses.map((course, idx) => (
                        <div key={idx}>
                          <p>Course Name: {course.courseId}</p>
                        </div>
                      ))
                    ) : (
                      <p>No courses enrolled</p>
                    )} */}
                  </td>
                </tr>
              </tbody>
            </table>
          ) : (
            <p>No student data available.</p>
          )}
          <div className="mt-4">
            <button
              onClick={handleEditClick}
              className="bg-yellow-500 text-white px-4 py-2 rounded"
            >
              Edit Info
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default StudentInfo;
