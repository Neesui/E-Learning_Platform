// src/components/CoursesTable.js
import React from 'react';

const courses = [
  { id: 1, title: 'React for Beginners', instructor: 'John Doe', duration: '4 Weeks', progress: '75%' },
  { id: 2, title: 'Advanced JavaScript', instructor: 'Jane Smith', duration: '6 Weeks', progress: '50%' },
  { id: 3, title: 'UI/UX Design Basics', instructor: 'Sara Connor', duration: '3 Weeks', progress: '100%' },
  { id: 4, title: 'Python Programming', instructor: 'Michael Brown', duration: '8 Weeks', progress: '80%' },
  { id: 5, title: 'Machine Learning', instructor: 'Emily White', duration: '10 Weeks', progress: '60%' },
];

const CoursesTable = () => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-lg font-bold mb-4">All Courses</h2>
      
      {/* Summary Section */}
      <div className="mb-4">
        <p className="text-sm text-gray-600">
          Total Courses: <span className="font-semibold">{courses.length}</span>
        </p>
      </div>
      
      {/* Table Section */}
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">Course ID</th>
            <th className="py-2 px-4 border-b">Course Title</th>
            <th className="py-2 px-4 border-b">Instructor</th>
            <th className="py-2 px-4 border-b">Duration</th>
            <th className="py-2 px-4 border-b">Progress</th>
          </tr>
        </thead>
        <tbody>
          {courses.map((course) => (
            <tr key={course.id}>
              <td className="py-2 px-4 border-b text-center">{course.id}</td>
              <td className="py-2 px-4 border-b">{course.title}</td>
              <td className="py-2 px-4 border-b">{course.instructor}</td>
              <td className="py-2 px-4 border-b text-center">{course.duration}</td>
              <td className="py-2 px-4 border-b text-center">{course.progress}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CoursesTable;
