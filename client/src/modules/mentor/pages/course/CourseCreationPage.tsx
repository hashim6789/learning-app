import React, { useEffect, useState } from "react";
import CourseForm from "./CourseForm";
import LessonForm from "../../components/course/LessonForm";
import MaterialForm from "../../components/course/MaterialFrom";
import Breadcrumbs from "../../components/BreadCrumbs";
import { Course } from "../../../../shared/types/Course";
import CourseView from "./CourseView";
import useCourseManagement from "../../../../hooks/useCourseManagement";

const CourseCreationPage: React.FC = () => {
  const { course } = useCourseManagement();
  console.log("render the create course!");
  useEffect(() => {
    console.log("Course Updated:", course); // ✅ Debugging
  }, [course]);
  return (
    <div className="p-6 space-y-6">
      <Breadcrumbs
        paths={[
          { title: "Courses", link: "/mentor/courses" },
          { title: "Create Course", link: "/mentor/courses/create" },
        ]}
      />
      {/* Course Form - Full Width */}
      <div className="bg-white shadow-md p-6 rounded-lg">
        <h2 className="text-xl font-semibold mb-4">Create Course</h2>
        {course ? <CourseView course={course} /> : <CourseForm />}
      </div>

      {/* Lesson & Material Forms - Side by Side */}

      {/* Material Form (Takes 1/3 of space) */}
      {/* <div className="bg-white shadow-md p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-4">Add Materials</h2>
          <MaterialForm />
        </div> */}
    </div>
  );
};

export default CourseCreationPage;
