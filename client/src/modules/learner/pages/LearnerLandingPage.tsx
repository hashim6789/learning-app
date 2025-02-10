import React from "react";
import CourseGrid from "../components/course/CourseGrid";
import { sampleCourses } from "../../../shared/sample/sampleCourse";

interface LearnerLandingPageProps {}

const LearnerLandingPage: React.FC<LearnerLandingPageProps> = ({}) => {
  return (
    <>
      <div>LearnerLandingPage</div>
      <CourseGrid courses={sampleCourses} />
    </>
  );
};

export default LearnerLandingPage;
