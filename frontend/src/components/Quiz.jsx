import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { toast, Toaster } from 'react-hot-toast';
import axios from 'axios';

const Quiz = () => {
  const { courseId } = useParams(); // Get courseId from URL params
  const [quiz, setQuiz] = useState(null);
  const [loading, setLoading] = useState(true);
  const [videoCompleted, setVideoCompleted] = useState(true); // Set to true for testing
  const [selectedOption, setSelectedOption] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [error, setError] = useState(null);
  const [answers, setAnswers] = useState([]); // Store answers selected by the user
 

  // Fetch quiz data
  const fetchQuiz = async () => {
    try {
      console.log("Course ID (from URL):", courseId); // Debugging line
      const res = await axios.get(`http://localhost:4001/quiz/get/${courseId}`);
      console.log(res)
      if (res.data.quiz) {
        setQuiz(res.data.quiz); // Ensure the server response matches this structure
        console.log("Fetched Quiz Data:", res.data.quiz); // Debugging line
      } else {
        throw new Error('Quiz data is missing');
      }
    } catch (error) {
      setError('Failed to load quiz data. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  // Fetch quiz when the component is mounted
  useEffect(() => {
    if (videoCompleted && courseId) {
      fetchQuiz(); // Fetch quiz only if the video is completed
    }
  }, [videoCompleted, courseId]);

  // Handle option selection
  const handleOptionClick = (option) => {
    setSelectedOption(option);
    setAnswers((prevAnswers) => {
      const updatedAnswers = [...prevAnswers];
      updatedAnswers[currentQuestionIndex] = {
        questionId: quiz.questions[currentQuestionIndex]._id, // Ensure question ID is correct
        selectedOption: option,
      };
      console.log("Answer selected:", updatedAnswers[currentQuestionIndex]); // Log the selected answer
      return updatedAnswers;
    });
  };
  

  const handleNextQuestion = () => {
    setSelectedOption(null);
    setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
  };

  const handleSubmitQuiz = async () => {
    try {
      const studentData = localStorage.getItem("Nisha");
      if (!studentData) {
        toast.error('Student ID is missing.');
        return;
      }
  
      const studentId = JSON.parse(studentData)._id;
      console.log("Student ID:", studentId);
  
      if (!quiz || !quiz.quizId) {
        toast.error('Quiz ID is missing.');
        console.log("Quiz object received:", quiz);
        return;
      }
  
      const quizId = quiz.quizId;
      console.log("Quiz ID:", quizId);
  
      if (answers.length !== quiz.questions.length) {
        toast.error('Please answer all questions before submitting.');
        return;
      }
  
      const answersToSubmit = answers.map((answer) => ({
        questionId: answer.questionId,
        selectedOption: answer.selectedOption,
      }));
  
      const res = await axios.post(`http://localhost:4001/ans/submit/${studentId}`, {
        quizId,
        answers: answersToSubmit,
      });
  
      console.log('Server Response:', res);
  
      if (res.status === 200 || res.status === 201) {  // Accept both 200 and 201 as valid success responses
        toast.success('Quiz submitted successfully!');
      } else {
        console.error('Unexpected response status:', res.status);
        throw new Error('Unexpected server response');
      }
    } catch (error) {
      console.error('Quiz submission error:', error);
      toast.error('Failed to submit the quiz. Please try again.');
    }
  };
  
  
  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
  if (!quiz) return <p>No quiz available.</p>;
  if (!quiz.questions || !quiz.questions[currentQuestionIndex]) return <p>No questions available.</p>;

  const currentQuestion = quiz.questions[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === quiz.questions.length - 1;

  return (
    <>
      <Toaster />
      <div className="flex justify-center items-center mt-[10vh] h-screen bg-gray-100">
        <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4">Quiz</h2>
          <p className="text-lg mb-4">{currentQuestion.questionText}</p>
          <div className="space-y-4">
            {currentQuestion.options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleOptionClick(option)}
                className={`w-full p-4 text-left border rounded-lg 
                  ${selectedOption === option
                    ? 'bg-blue-100 border-blue-600'
                    : 'bg-white border-gray-300'
                  } focus:outline-none`}
              >
                {option}
              </button>
            ))}
          </div>
          {!isLastQuestion ? (
            <button
              className="w-full mt-6 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700"
              onClick={handleNextQuestion}
              disabled={selectedOption === null}
            >
              Next
            </button>
          ) : (
            <div className="mt-6 text-center">
              <button
                className="py-2 px-4 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700"
                onClick={handleSubmitQuiz}
              >
                Submit Quiz
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Quiz;
