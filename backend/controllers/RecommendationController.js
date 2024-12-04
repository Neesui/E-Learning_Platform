import { fetchAndGetSimilarCourses } from '../utils/Recommendation.js';
import Student from '../models/Studentmodel.js';

export const getStudentRecommendations = async (req, res) => {
    try {
        const { studentId } = req.params;

        // Fetch student data and populate enrolled courses
        const student = await Student.findById(studentId).populate('courses.courseId').exec();
        if (!student) {
            return res.status(404).json({ message: 'Student not found.' });
        }

        // Extract unique domains from enrolled courses
        const enrolledCourses = new Set(student.courses.map(course => course.courseId?._id?.toString()));
        const enrolledDomains = student.courses
            .filter(course => course.courseId?.domain)
            .flatMap(course => course.courseId.domain.map(d => d.toLowerCase().trim()));

        if (!enrolledDomains.length) {
            return res.status(404).json({ message: 'No enrolled domains found for this student.' });
        }

        const uniqueDomains = [...new Set(enrolledDomains)];
        const seenCourses = new Set(); // Tracks already recommended courses

        // Fetch recommendations for all domains in parallel
        const domainRecommendations = await Promise.all(
            uniqueDomains.map(async (domain) => {
                try {
                    return await fetchAndGetSimilarCourses(domain, 10); // Limit domain-specific recommendations
                } catch (error) {
                    console.error(`Error fetching recommendations for domain ${domain}:`, error);
                    return []; // Return empty array if fetching fails for this domain
                }
            })
        );

        // Flatten and filter recommendations
        const recommendations = domainRecommendations.flat().filter(rec => {
            const isUnique = !enrolledCourses.has(rec.courseId.toString()) && !seenCourses.has(rec.courseId.toString());
            if (isUnique) {
                seenCourses.add(rec.courseId.toString());
                return true;
            }
            return false;
        });

        // Sort recommendations by similarity and limit to 15
        const sortedRecommendations = recommendations.sort((a, b) => b.similarity - a.similarity).slice(0, 15);

        // Send the response
        return res.status(200).json({
            message: 'Recommendations fetched successfully',
            recommendations: sortedRecommendations,
        });
    } catch (error) {
        console.error('Error fetching recommendations:', error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
};
