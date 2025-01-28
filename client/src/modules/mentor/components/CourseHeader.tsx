import React from "react";
import { CheckCircle2, Loader2, XCircle, Info } from "lucide-react";
// import { Course } from "../../../shared/types/Course";
import { useSelector } from "react-redux";
import { RootState } from "../../../store";

const CourseHeader: React.FC<{}> = ({}) => {
  const { course } = useSelector((state: RootState) => state.course);
  if (!course) return <div>loading</div>;
  const getStatusIcon = () => {
    switch (course.status) {
      case "approved":
        return <CheckCircle2 className="text-green-500" />;
      case "pending":
        return <Loader2 className="text-yellow-500 animate-spin" />;
      case "rejected":
        return <XCircle className="text-red-500" />;
      case "draft":
        return <Info className="text-purple-500" />;
    }
  };

  return (
    <div className="relative">
      <div className="w-full" style={{ aspectRatio: "16 / 9" }}>
        <img
          src={course.thumbnail}
          alt={course.title}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="absolute top-4 right-4 flex items-center space-x-2 bg-white/80 px-3 py-1 rounded-full">
        {getStatusIcon()}
        <span className="capitalize text-sm font-medium">{course.status}</span>
      </div>
      {/* Course Title and Category */}
      <div className="p-6 bg-purple-100">
        <h1 className="text-3xl font-bold text-purple-800 mb-2">
          {course.title}
        </h1>
        <div className="flex items-center space-x-2">
          <span className="bg-purple-200 text-purple-700 px-2 py-1 rounded-full text-sm">
            {course.category.title}
          </span>
        </div>
        <h3 className="text-3xl font-bold text-purple-800 mb-2">
          {course.description}
        </h3>
      </div>
    </div>
  );
};

export default CourseHeader;
