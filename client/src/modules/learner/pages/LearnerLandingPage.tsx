import React from "react";
import CourseGrid from "../components/course/CourseGrid";
import useFetch from "../../../hooks/useFetch";
import { Course } from "../../../shared/types/Course";

interface LearnerLandingPageProps {}

const LearnerLandingPage: React.FC<LearnerLandingPageProps> = ({}) => {
  const { data } = useFetch<Course[]>("/api/courses");

  return <>{data && <CourseGrid courses={data} />}</>;
};

export default LearnerLandingPage;
