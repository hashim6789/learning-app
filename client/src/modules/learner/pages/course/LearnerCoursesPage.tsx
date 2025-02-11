import React from "react";
import useFetch from "../../../../hooks/useFetch";
import { Course } from "../../../../shared/types/Course";
import CourseGrid from "../../components/course/CourseGrid";

interface LearnerCoursesPageProps {}

const LearnerCoursesPage: React.FC<LearnerCoursesPageProps> = ({}) => {
  const { data } = useFetch<Course[]>("/api/courses");

  return <>{data && <CourseGrid courses={data} />}</>;
};

export default LearnerCoursesPage;
