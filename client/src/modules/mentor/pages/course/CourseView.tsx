import React from "react";
import { Course } from "../../../../shared/types/Course";
import { Book, Clock } from "lucide-react";

interface CourseViewProps {
  course: Course;
}

const CourseView: React.FC<CourseViewProps> = ({ course }) => {
  return (
    // View Mode
    <>
      <div className="bg-purple-600 text-white p-8">
        <h1 className="text-3xl font-bold mb-4">{course.title}</h1>
        <div className="flex items-center space-x-6">
          <div className="flex items-center">
            <Clock className="h-5 w-5 mr-2" />
            <span>{course.duration} minutesssss</span>
          </div>
          <div className="flex items-center">
            <Book className="h-5 w-5 mr-2" />
            <span>{course.lessons.length} lessons</span>
          </div>
        </div>
      </div>

      <div className="p-8 space-y-8">
        <div>
          <h2 className="text-xl font-semibold text-purple-800 mb-4">
            Description
          </h2>
          <p className="text-gray-700 leading-relaxed">{course.description}</p>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-purple-800 mb-4">
            Learning Lessons
          </h2>
          <div className="grid gap-3">
            {course.lessons.map((material, index) => (
              <div
                key={material.id}
                className="flex items-center p-4 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors"
              >
                <span className="h-8 w-8 flex items-center justify-center bg-purple-200 text-purple-700 rounded-full mr-4">
                  {index + 1}
                </span>
                <div>
                  <h3 className="font-medium text-purple-900">
                    {material.title}
                  </h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default CourseView;
