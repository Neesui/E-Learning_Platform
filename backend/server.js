import express from 'express';
import path from 'path';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import studentRoute from './routes/Studentroute.js';
import CategoriesRoute from './routes/CategoriesRoute.js';
import coursesRoute from './routes/CoursesRoute.js';
// import VideosRoute from './routes/VideosRoute.js';
import AdminRoute from './routes/AdminRoute.js';
import UploadRoute from './routes/UploadRoute.js';
import QuizRoute from './routes/QuizRoute.js';
import AnswerRoute from './routes/AnswerRoute.js'

import VideoUploadRoute from './routes/VideoUploadRoute.js';
import RecommandationRoute from './routes/RecommendationRoute.js'
dotenv.config();

const app = express();
app.use(bodyParser.json());
app.use(cors());
app.use(cookieParser()); // Use cookie-parser

// Serve static files for uploaded images
app.use('/uploads', express.static(path.join(process.cwd(), 'uploads')));



// Middleware for routes that require authentication
app.use('/student', studentRoute);
app.use('/categories', CategoriesRoute);
app.use('/courses', coursesRoute);
app.use('/admin', AdminRoute);
app.use('/uploads', UploadRoute);
app.use('/videos', VideoUploadRoute);
app.use('/quiz', QuizRoute);
app.use('/ans', AnswerRoute);


app.use('/recommendations', RecommandationRoute);

const PORT = process.env.PORT || 4000;
const URL = process.env.MONGOURI;

mongoose.connect(URL).then(() => {
  console.log('Database connected successfully');
}).catch(error => console.log(error));

app.listen(PORT, () => {
  console.log(`Server is listening on port: ${PORT}`);
});
