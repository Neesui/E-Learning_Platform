import natural from 'natural';
import Course from '../models/CoursesModel.js';

const tfidf = new natural.TfIdf();
const tokenizer = new natural.WordTokenizer();

// Function to preprocess text (remove stop words and stem words)
function preprocessText(text) {
    const stopWords = new Set(natural.stopwords);
    const stemmer = natural.PorterStemmer;

    return tokenizer
        .tokenize(text.toLowerCase())
        .filter(word => !stopWords.has(word)) // Remove stop words
        .map(word => stemmer.stem(word)) // Apply stemming
        .join(' ');
}

// Function to calculate cosine similarity
function cosineSimilarity(vec1, vec2) {
    const dotProduct = vec1.reduce((sum, v, i) => sum + v * (vec2[i] || 0), 0); // Handle vector alignment
    const magnitude1 = Math.sqrt(vec1.reduce((sum, v) => sum + v * v, 0));
    const magnitude2 = Math.sqrt(vec2.reduce((sum, v) => sum + v * v, 0));
    return magnitude1 && magnitude2 ? dotProduct / (magnitude1 * magnitude2) : 0;
}

export async function fetchAndGetSimilarCourses(targetCourseId, numRecommendations = 3) {
    try {
        const courses = await Course.find().exec();

        if (!courses || courses.length === 0) {
            console.error('No courses found');
            return [];
        }

        // Preprocess and add descriptions to the TF-IDF model
        const courseVectors = [];
        courses.forEach(course => {
            const courseDescription = course.description?.toLowerCase().trim();
            if (courseDescription) {
                tfidf.addDocument(preprocessText(courseDescription));
                courseVectors.push({
                    courseId: course._id,
                    name: course.courseName,
                    description: course.description,
                    image: course.imageUrl,
                });
            }
        });

        // Find the index of the target course
        const targetIndex = courses.findIndex(course => course._id.toString() === targetCourseId.toString());
        if (targetIndex === -1) {
            console.error('Target course not found');
            return [];
        }

        // Get the TF-IDF vector for the target course description
        const targetVector = tfidf.listTerms(targetIndex).map(term => term.tfidf);

        const similarities = [];
        
        // Calculate cosine similarity for each course except the target course
        courseVectors.forEach((course, i) => {
            if (i !== targetIndex) {
                const courseVector = tfidf.listTerms(i).map(term => term.tfidf);
                const similarity = cosineSimilarity(targetVector, courseVector);

                // Only add to similarities if the similarity is above a threshold
                if (similarity > 0.2) {
                    similarities.push({
                        courseId: course.courseId,
                        name: course.name,
                        description: course.description,
                        image: course.image,
                        similarity,
                    });
                }
            }
        });

        // Sort courses by similarity in descending order
        similarities.sort((a, b) => b.similarity - a.similarity);

        // Return the top similar courses
        return similarities.slice(0, numRecommendations);
    } catch (err) {
        console.error('Error fetching similar courses:', err);
        return [];
    }
}

