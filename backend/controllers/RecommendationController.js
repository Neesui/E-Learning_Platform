import { fetchAndGetSimilarCourses } from '../utils/Recommendation.js';
import Student from '../models/Studentmodel.js';

export const getStudentRecommendations = async (req, res) => {
    try {
        const { studentId } = req.params;

        const student = await Student.findById(studentId).populate('courses.courseId').exec();
        if (!student) {
            return res.status(404).json({ message: 'Student not found.' });
        }

        // Get domains of courses the student is already enrolled in
        const enrolledCourses = new Set(student.courses.map(course => course.courseId._id.toString()));
        const enrolledDomains = student.courses
            .filter(course => course.courseId?.domain)
            .flatMap(course => course.courseId.domain.map(d => d.toLowerCase().trim()));

        if (!enrolledDomains.length) {
            return res.status(404).json({ message: 'No enrolled domains found for this student.' });
        }

        const recommendations = [];
        const seenCourses = new Set(); // Tracks already added recommendations

        for (let domain of [...new Set(enrolledDomains)]) {
            const domainRecommendations = await fetchAndGetSimilarCourses(domain);
            domainRecommendations.forEach(rec => {
                if (!enrolledCourses.has(rec.courseId.toString()) && !seenCourses.has(rec.courseId.toString())) {
                    recommendations.push(rec);
                    seenCourses.add(rec.courseId.toString()); // Mark this course as seen
                }
            });
        }

        // Send the response with the recommendations
        return res.status(200).json({
            message: 'Recommendations fetched successfully',
            recommendations: recommendations.slice(0, 15) // Limit to 15 recommendations
        });

    } catch (error) {
        console.error('Error fetching recommendations:', error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
};
