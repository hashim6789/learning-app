import React from "react";
import { sampleCourses } from "../../../../shared/sample/sampleCourse";
import useFetch from "../../../../hooks/useFetch";
import { Course } from "../../../../shared/types/Course";

export enum CourseStatus {
  NEW = "NEW",
  ONGOING = "ONGOING",
  COMPLETED = "COMPLETED",
}

export interface Category {
  id: string;
  name: string;
  icon: string;
}

export interface Lesson {
  id: string;
  title: string;
}

// export interface Course {
//   id: string;
//   status: CourseStatus;
//   title: string;
//   category: Category;
//   thumbnail: string;
//   lessons: Lesson[];
//   description: string;
//   certificateType: string;
// }

interface CourseGridProps {
  courses: Course[];
}

const CourseGrid: React.FC<CourseGridProps> = ({ courses }) => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-6">Most Popular Courses</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {courses.map((course) => (
          <div
            key={course.id}
            className="bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-lg transition-shadow duration-300 flex flex-col h-full"
          >
            {/* Image and Badge Container */}
            <div className="relative">
              <img
                src={course.thumbnail}
                alt={course.title}
                className="w-full h-48 object-cover rounded-t-lg"
              />
              {/* {course.status === "NEW" && (
                <div className="absolute top-3 right-3">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-500 text-white">
                    New AI skills
                  </span>
                </div>
              )} */}
            </div>

            {/* Header Section */}
            <div className="p-6 flex-grow">
              <div className="flex items-center gap-2 mb-2">
                {/* {course.category.icon && (
                  <img
                    src={course.category.icon}
                    alt={course.category.name}
                    className="w-6 h-6 rounded-full"
                  />
                )} */}
                <span className="text-sm text-gray-600">
                  {course.category.title}
                </span>
              </div>

              <h3 className="text-lg font-semibold leading-tight mb-4">
                {course.title}
              </h3>

              {/* Description */}
              <p className="text-sm text-gray-600 line-clamp-2">
                {course.description}
              </p>
            </div>

            {/* Footer Section */}
            <div className="p-6 pt-0 mt-auto">
              <div className="pt-4 border-t border-gray-200 flex items-center justify-between">
                {/* <div className="flex items-center gap-2">
                  <svg
                    className="w-5 h-5 text-blue-500"
                    fill="none"
                    strokeWidth="2"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6z"
                    />
                  </svg>
                  <span className="text-sm text-blue-500 font-medium">
                    Build toward a degree
                  </span>
                </div>
                <span className="text-sm text-gray-600">
                  Professional Certificate
                </span> */}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* <button className="mt-8 px-4 py-2 border border-blue-500 text-blue-500 rounded-md hover:bg-blue-50 transition-colors duration-300">
        Show 8 more
      </button> */}
    </div>
  );
};

export default CourseGrid;
