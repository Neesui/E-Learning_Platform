import express from 'express';
import { 
    postCourse, 
    courseList, 
    courseDetails, 
    updateCourse, 
    deleteCourse, 
    addVideoToCourse, 
    getVideoById, 
    deleteVideoFromCourse 
} from '../controllers/CoursesController.js';

const router = express.Router();

// Create a new course
router.post('/post', postCourse);

// Get all courses with optional search and pagination
router.get('/getCourses', courseList);

// Get course details by ID
router.get('/courseDetails/:id', courseDetails);

// Update a course
router.put('/courses/:id', updateCourse);

// Delete a course
router.delete('/courses/:id', deleteCourse);

// Add a video to a specific course
router.post('/add/:id/videos', addVideoToCourse);

// Get a specific video by videoId
router.get('/get/:courseId/videos/:videoId', getVideoById);

// Delete a specific video from a course
router.delete('/courses/:courseId/videos/:videoId', deleteVideoFromCourse);
router.get('/courses/getCourses', async (req, res) => {
    try {
      const { page = 1, limit = 5 } = req.query; // Pagination query params
      const skip = (page - 1) * limit;
  
      const totalCourses = await Course.countDocuments(); // Total courses count
      const courses = await Course.find().skip(skip).limit(parseInt(limit));
  
      res.json({
        courses,
        totalCourses,
        currentPage: parseInt(page),
        totalPages: Math.ceil(totalCourses / limit),
      });
    } catch (error) {
      console.error('Error fetching courses with pagination:', error);
      res.status(500).json({ error: 'Server Error' });
    }
  });


export default router;
