import React from 'react';
import MainPage from '../components/Mainpage';
import MainpageCategories from '../components/MainpageCategories';
import OurCourses from '../components/OurCourses';

import RecommendationCourses from '../components/RecommendationCourses';
// import FeedbackSection from '../components/FeedbackSection';


function Home() {
  return (
    <>
      <MainPage />
      <MainpageCategories />
      <OurCourses />
      <RecommendationCourses />
      {/* <FeedbackSection /> */}
    </>
  );
}

export default Home;
