import { fetchAndGetSimilarCourses } from '../utils/Recommendation.js';
import Student from '../models/StudentModel.js';

export const getStudentRecommendations = async (req, res) => {
    try {
        const { studentId } = req.params;

        // Fetch the student and populate courses
        const student = await Student.findById(studentId).populate('courses.courseId').exec();
        if (!student) {
            return res.status(404).json({ message: 'Student not found.' });
        }

        console.log("Student enrolled courses:", student.courses); // Debugging log

        // Extract enrolled course IDs
        const enrolledCourses = student.courses
            .filter(course => course.courseId) // Ensure courseId exists
            .map(course => course.courseId._id.toString());

        if (!enrolledCourses.length) {
            return res.status(404).json({ message: 'No enrolled courses found for this student.' });
        }

        const recommendationsMap = new Map(); // Map to ensure no duplicates

        // Loop over each course the student is enrolled in
        for (let courseId of enrolledCourses) {
            console.log(`Fetching recommendations for course: ${courseId}`); // Debugging log

            // Fetch similar courses based on course description similarity
            const courseRecommendations = await fetchAndGetSimilarCourses(courseId, 5);

            // If there are recommendations, add them
            if (courseRecommendations.length > 0) {
                courseRecommendations.forEach(rec => {
                    // Ensure unique courseId by checking against Map
                    if (!enrolledCourses.includes(rec.courseId.toString()) && !recommendationsMap.has(rec.courseId.toString())) {
                        recommendationsMap.set(rec.courseId.toString(), rec); // Ensure unique courseId
                    }
                });
            } else {
                console.log(`No recommendations found for course: ${courseId}`); // Debugging log
            }
        }

        // Convert Map values to an array for response
        const uniqueRecommendations = Array.from(recommendationsMap.values());

        if (uniqueRecommendations.length === 0) {
            return res.status(200).json({ message: 'No recommendations available for this student.' });
        }

        // Update the student's recommendations field
        student.recommendations = uniqueRecommendations.map(r => ({
            courseId: r.courseId,
            name: r.name,
            description: r.description,
            image: r.image,
            similarity: r.similarity,
        }));

        // Save the student with updated recommendations
        await student.save();

        // Respond with the recommendations
        return res.status(200).json({
            message: 'Recommendations fetched successfully.',
            recommendations: uniqueRecommendations,
        });
    } catch (err) {
        console.error('Error in getStudentRecommendations:', err);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
};
