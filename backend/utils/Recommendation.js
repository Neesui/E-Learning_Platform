import natural from 'natural';
import Course from '../models/CoursesModel.js';

const tfidf = new natural.TfIdf();
const tokenizer = new natural.WordTokenizer();

// Define domains and associated keywords
const domainKeywords = {
    frontend: ['frontend', 'html', 'css', 'javascript', 'react', 'angular', 'vue'],
    uiux: ['ui', 'ux', 'design', 'Graphic'],
    // mobilepro: ['mobile', 'Android', 'java', 'mobile development'],
    backend: ['backend', 'server', 'database', 'api', 'node', 'express', 'django', 'flask', 'sql', 'mongodb','java'],
    devops: ['devops', 'docker', 'kubernetes', 'ci', 'cd', 'cloud', 'aws', 'azure', 'google cloud', 'infrastructure'],
    dataScience: ['data', 'machine learning', 'ai', 'artificial intelligence', 'python', 'pandas', 'numpy', 'statistics'],
    mobile: ['mobile', 'android', 'kotlin', 'react native', 'flutter', 'app'],
};

// Preprocess text (remove stop words and stem words)
function preprocessText(text) {
    const stopWords = new Set(natural.stopwords);
    const stemmer = natural.PorterStemmer;

    return tokenizer
        .tokenize(text.toLowerCase())
        .filter(word => !stopWords.has(word)) // Remove stop words
        .map(word => stemmer.stem(word)) // Apply stemming
        .join(' ');
}

// Classify a course description into domains
function classifyDomain(description) {
    const words = preprocessText(description).split(' ');
    const domainScores = {};

    Object.entries(domainKeywords).forEach(([domain, keywords]) => {
        const score = keywords.reduce((count, keyword) => {
            const stemmedKeyword = natural.PorterStemmer.stem(keyword.toLowerCase());
            return count + (words.includes(stemmedKeyword) ? 1 : 0);
        }, 0);

        if (score > 0) domainScores[domain] = score;
    });

    // Return the domain with the highest score (or null if none match)
    return Object.keys(domainScores).sort((a, b) => domainScores[b] - domainScores[a])[0] || null;
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
        const domainMap = {};

        courses.forEach(course => {
            const courseDescription = course.description?.toLowerCase().trim();
            if (courseDescription) {
                tfidf.addDocument(preprocessText(courseDescription));
                const domain = classifyDomain(courseDescription);
                domainMap[course._id] = domain;

                courseVectors.push({
                    courseId: course._id,
                    name: course.courseName,
                    description: course.description,
                    image: course.imageUrl,
                    domain,
                });
            }
        });

        // Find the target course and its domain
        const targetIndex = courses.findIndex(course => course._id.toString() === targetCourseId.toString());
        if (targetIndex === -1) {
            console.error('Target course not found');
            return [];
        }

        const targetCourse = courseVectors[targetIndex];
        const targetVector = tfidf.listTerms(targetIndex).map(term => term.tfidf);

        const similarities = [];

        // Calculate cosine similarity for each course except the target course
        courseVectors.forEach((course, i) => {
            if (i !== targetIndex) {
                const courseVector = tfidf.listTerms(i).map(term => term.tfidf);
                const similarity = cosineSimilarity(targetVector, courseVector);

                if (similarity > 0.2 && course.domain === targetCourse.domain) {
                    similarities.push({
                        courseId: course.courseId,
                        name: course.name,
                        description: course.description,
                        image: course.image,
                        domain: course.domain,
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
