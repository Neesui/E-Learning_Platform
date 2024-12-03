import natural from 'natural';
import Course from '../models/CoursesModel.js';
import Student from '../models/Studentmodel.js';


const tfidf = new natural.TfIdf();

// Function to calculate cosine similarity between two vectors
function cosineSimilarity(vec1, vec2) {
    const dotProduct = vec1.reduce((sum, v, i) => sum + v * (vec2[i] || 0), 0);
    const magnitude1 = Math.sqrt(vec1.reduce((sum, v) => sum + v * v, 0));
    const magnitude2 = Math.sqrt(vec2.reduce((sum, v) => sum + v * v, 0));
    return magnitude1 && magnitude2 ? dotProduct / (magnitude1 * magnitude2) : 0;
}

export async function fetchAndGetSimilarCourses(enrolledDomain, numRecommendations = 3) {
    try {
        // Fetch all courses where the domain matches
        const similarCourses = await Course.find({
            domain: { $regex: new RegExp(enrolledDomain, 'i') }, // Case-insensitive match
        }).exec();

        if (!similarCourses.length) {
            console.log('No matching courses found for domain:', enrolledDomain);
            return [];
        }

        // Add TF-IDF logic to rank recommendations (if needed)
        const courseVectors = [];
        similarCourses.forEach(course => {
            if (course.domain && course.domain.length) {
                tfidf.addDocument(course.domain.join(' '));
                courseVectors.push({
                    courseId: course._id,
                    courseName: course.courseName,
                    domain: course.domain,
                    description: course.description,
                    imageUrl: course.imageUrl,

                });
            }
        });

        const enrolledString = enrolledDomain;
        tfidf.addDocument(enrolledString);

        const targetIndex = tfidf.documents.length - 1; // Last document added
        const targetVector = tfidf.listTerms(targetIndex).map(term => term.tfidf);

        const recommendations = [];
        courseVectors.forEach((course, i) => {
            const courseVector = tfidf.listTerms(i).map(term => term.tfidf);
            const similarity = cosineSimilarity(targetVector, courseVector);

            recommendations.push({
                courseId: course.courseId,
                courseName: course.courseName,
                description: course.description,
                imageUrl: course.imageUrl,
                domain: course.domain,
                similarity,
            });
        });

        // Sort recommendations by similarity
        recommendations.sort((a, b) => b.similarity - a.similarity);

        return recommendations.slice(0, numRecommendations);
    } catch (error) {
        console.error('Error fetching similar courses:', error);
        return [];
    }
}

