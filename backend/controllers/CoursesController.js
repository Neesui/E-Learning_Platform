import Course from '../models/CoursesModel.js';

// Insert a new course
export const postCourse = async (req, res) => {
    try {
        const { courseName, description, imageUrl, categoryId } = req.body;

        // Check for an existing course with the same name (case-insensitive)
        const existingCourse = await Course.findOne({
            courseName: { $regex: new RegExp(`^${courseName}$`, 'i') } // Case-insensitive regex check
        });

        if (existingCourse) {
            return res.status(400).json({ error: `The course "${courseName}" already exists.` });
        }

        // Create a new course instance
        const course = new Course({
            courseName, // Store the original course name
            description,
            imageUrl,
            categoryId,
        });

        // Save the new course
        const savedCourse = await course.save();
        res.status(201).json(savedCourse);
    } catch (error) {
        console.error('Error while creating course:', error);
        res.status(500).json({ error: 'Server Error' });
    }
};




// Retrieve all courses with optional search and pagination
export const courseList = async (req, res) => {
    try {
        const keyword = req.query.keyword
            ? { courseName: { $regex: req.query.keyword, $options: "i" } }
            : {};

        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 50;
        const skip = (page - 1) * limit;

        const count = await Course.countDocuments({ ...keyword });
        const courses = await Course.find({ ...keyword })
            .skip(skip)
            .limit(limit)
            .populate('categoryId');

        if (!courses.length) {
            return res.status(404).json({ message: 'No courses found' });
        }

        res.status(200).json({
            totalCourses: count,
            courses,
            currentPage: page,
            totalPages: Math.ceil(count / limit),
        });
    } catch (error) {
        console.error('Error while retrieving courses:', error);
        res.status(500).json({ error: 'Server Error' });
    }
};

// View course details with videos
export const courseDetails = async (req, res) => {
    try {
        const course = await Course.findById(req.params.id).populate('categoryId');
        if (!course) {
            return res.status(404).json({ error: 'Course not found' });
        }
        res.status(200).json(course);
    } catch (error) {
        console.error('Error while retrieving course details:', error);
        res.status(500).json({ error: 'Server Error' });
    }
};

// Update course details
export const updateCourse = async (req, res) => {
    try {
        const { courseName, description, imageUrl, categoryId } = req.body;

        const updatedCourse = await Course.findByIdAndUpdate(
            req.params.id,
            { courseName, description, imageUrl, categoryId },
            { new: true, runValidators: true }
        );

        if (!updatedCourse) {
            return res.status(404).json({ error: 'Course not found' });
        }
        res.status(200).json(updatedCourse);
    } catch (error) {
        console.error('Error while updating course:', error);
        res.status(500).json({ error: 'Server Error' });
    }
};

// Delete a course
export const deleteCourse = async (req, res) => {
    try {
        const deletedCourse = await Course.findByIdAndDelete(req.params.id);
        if (!deletedCourse) {
            return res.status(404).json({ error: 'Course with that ID not found' });
        }
        res.status(200).json({ message: 'Course deleted successfully' });
    } catch (error) {
        console.error('Error while deleting course:', error);
        res.status(500).json({ error: 'Server Error' });
    }
};

// Add a video to a specific course
export const addVideoToCourse = async (req, res) => {
    try {
        const { id: courseId } = req.params;
        const { title, url, thumbnail } = req.body;

        const course = await Course.findById(courseId);
        if (!course) {
            return res.status(404).json({ error: 'Course not found' });
        }

        // Add video to the course's video array
        course.videos.push({ title, url, thumbnail });
        const updatedCourse = await course.save();

        res.status(201).json(updatedCourse);
    } catch (error) {
        console.error('Error while adding video to course:', error);
        res.status(500).json({ error: 'Server Error' });
    }
};

// Function to get a specific video by videoId
export const getVideoById = async (req, res) => {
    try {
        const { courseId, videoId } = req.params; // Get course ID and video ID from URL params

        // Find the course by ID and include the videos field
        const course = await Course.findById(courseId).select('videos');

        // If course is not found, return a 404 error
        if (!course) {
            return res.status(404).json({ error: 'Course not found' });
        }

        // Find the specific video by videoId within the videos
        const video = course.videos.find(video => video._id.toString() === videoId);

        // If video is not found, return a 404 error
        if (!video) {
            return res.status(404).json({ error: 'Video not found' });
        }

        // Return the video
        res.status(200).json(video);
    } catch (error) {
        console.error('Error while fetching video:', error);
        res.status(500).json({ error: 'Server Error' });
    }
};


// Delete a specific video from a course
export const deleteVideoFromCourse = async (req, res) => {
    try {
        const { courseId, videoId } = req.params;

        const course = await Course.findById(courseId);
        if (!course) {
            return res.status(404).json({ error: 'Course not found' });
        }

        // Remove the video by its _id
        course.videos = course.videos.filter(video => video._id.toString() !== videoId);
        const updatedCourse = await course.save();

        res.status(200).json(updatedCourse);
    } catch (error) {
        console.error('Error while deleting video from course:', error);
        res.status(500).json({ error: 'Server Error' });
    }
};

