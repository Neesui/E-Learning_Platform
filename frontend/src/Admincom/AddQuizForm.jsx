import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast, Toaster } from 'react-hot-toast';

const AddQuizForm = () => {
  const [courseId, setCourseId] = useState('');
  const [courses, setCourses] = useState([]);
  const [questions, setQuestions] = useState([{ questionText: '', options: ['', '', '', ''], correctAnswer: '' }]);

  // Fetch courses on component mount
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await axios.get('http://localhost:4001/courses/getCourses');
        setCourses(res.data.courses || []);
        toast.success('Courses loaded successfully!');
      } catch (err) {
        console.error('Error fetching courses:', err);
        toast.error('Failed to load courses');
      }
    };
    fetchCourses();
  }, []);

  // Add new question
  const addQuestion = () => {
    setQuestions([...questions, { questionText: '', options: ['', '', '', ''], correctAnswer: '' }]);
  };

  // Remove question
  const removeQuestion = (index) => {
    setQuestions(questions.filter((_, i) => i !== index));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (!courseId) {
      toast.error('Please select a course');
      return;
    }
    if (questions.some(q => !q.questionText || q.options.some(opt => !opt) || !q.correctAnswer)) {
      toast.error('Please fill out all question fields');
      return;
    }

    try {
      const res = await axios.post('http://localhost:4001/quiz/create', { courseId, questions });
      setCourseId('');
      setQuestions([{ questionText: '', options: ['', '', '', ''], correctAnswer: '' }]);
      toast.success(res.data.message || 'Quiz added successfully');
    } catch (err) {
      console.error('Error adding quiz:', err);
      toast.error('Failed to add quiz');
    }
  };

  return (
    <>
      <Toaster />
      <div className="ml-[20vh] w-[100vh] h-auto mt-5 bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">Add New Quiz</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-600 mb-1">Course:</label>
            <select
              value={courseId}
              onChange={(e) => setCourseId(e.target.value)}
              className="w-full border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select a course</option>
              {courses.map((course) => (
                <option key={course._id} value={course._id}>
                  {course.courseName}
                </option>
              ))}
            </select>
          </div>

          {questions.map((question, qIndex) => (
            <div key={qIndex} className="space-y-2">
              <div>
                <label className="block text-gray-600 mb-1">Question {qIndex + 1}:</label>
                <input
                  type="text"
                  value={question.questionText}
                  onChange={(e) =>
                    setQuestions(questions.map((q, i) => (i === qIndex ? { ...q, questionText: e.target.value } : q)))
                  }
                  className="w-full border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter question text"
                />
              </div>
              <div className="space-y-1">
                {question.options.map((option, optIndex) => (
                  <input
                    key={optIndex}
                    type="text"
                    value={option}
                    onChange={(e) =>
                      setQuestions(
                        questions.map((q, i) =>
                          i === qIndex
                            ? {
                                ...q,
                                options: q.options.map((opt, o) => (o === optIndex ? e.target.value : opt)),
                              }
                            : q
                        )
                      )
                    }
                    className="w-1/2 border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder={`Option ${optIndex + 1}`}
                  />
                ))}
              </div>
              <div>
                <label className="block text-gray-600 mb-1">Correct Answer:</label>
                <input
                  type="text"
                  value={question.correctAnswer}
                  onChange={(e) =>
                    setQuestions(questions.map((q, i) => (i === qIndex ? { ...q, correctAnswer: e.target.value } : q)))
                  }
                  className="w-full border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter correct answer"
                />
              </div>
              <button
                type="button"
                onClick={() => removeQuestion(qIndex)}
                className="mt-2 text-red-500 hover:underline"
              >
                Remove Question
              </button>
            </div>
          ))}

          <button
            type="button"
            onClick={addQuestion}
            className="w-full bg-gray-200 text-blue-500 py-2 rounded-lg hover:bg-gray-300 focus:outline-none"
          >
            Add Another Question
          </button>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Add Quiz
          </button>
        </form>
      </div>
    </>
  );
};

export default AddQuizForm;
