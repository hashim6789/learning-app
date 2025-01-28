import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import CourseHeader from "../components/CourseHeader";
import CourseTabs from "../components/CourseTabs";
import CourseOverview from "../components/CourseOverview";
import { Course } from "../../../shared/types/Course";
// import { CourseStatus } from "../../../shared/types/CourseStatus";
// import { sampleCourse } from "../../../shared/sample/sampleCourse";
import useFetch from "../../../hooks/useFetch";
import CourseLessons from "../components/CourseLessons";
// import useCourseManagement from "../../../hooks/useCourseManagement";

import { setCourse } from "../../../store/slices/courseSlice";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../store";

const MentorCourseDetailsPage: React.FC = () => {
  const { courseId } = useParams<{ courseId: string }>();
  const dispatch = useDispatch<AppDispatch>();
  const { data, loading, error } = useFetch<Course>(
    `/mentor/courses/${courseId}`
  );
  // const { editCourse } = useCourseManagement();
  const { course } = useSelector((state: RootState) => state.course);

  const [activeTab, setActiveTab] = useState<"overview" | "lessons">(
    "overview"
  );

  useEffect(() => {
    if (data) {
      dispatch(setCourse(data));
    }
  }, [data, dispatch]);

  // const handleCourseUpdate = (updatedCourse: Partial<Course>) => {
  //   if (courseId) {
  //     editCourse(courseId, updatedCourse);
  //   }
  // };

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">Error loading course data.</p>;

  return (
    <div className="min-h-screen bg-purple-50 p-6">
      <div className="max-w-4xl mx-auto bg-white shadow-xl rounded-xl overflow-hidden">
        <CourseHeader />
        <CourseTabs activeTab={activeTab} setActiveTab={setActiveTab} />
        <div className="p-6">
          {activeTab === "overview" ? (
            <CourseOverview />
          ) : (
            <CourseLessons lessons={course?.lessons || []} />
          )}
        </div>
      </div>
    </div>
  );
};

export default MentorCourseDetailsPage;

// import React, { useState } from "react";
// import {
//   Clock,
//   BookOpen,
//   PlayCircle,
//   CheckCircle2,
//   XCircle,
//   Loader2,
//   Info,
// } from "lucide-react";
// import useFetch from "../../../hooks/useFetch";
// import { CourseStatus } from "../hooks/useCourseTableFunctionality";
// import { useParams } from "react-router-dom";

// // Defining the interfaces to match the provided types
// interface Category {
//   id: string;
//   title: string;
//   status: "blocked" | "unblocked";
//   isListed?: boolean;
// }

// interface Lesson {
//   id: string;
//   title: string;
//   duration: number;
//   isCompleted?: boolean;
// }

// interface Course {
//   id: string;
//   status: "approved" | "rejected" | "pending" | "draft";
//   title: string;
//   category: Category;
//   thumbnail: string;
//   lessons: Lesson[];
//   description: string;
// }

// const MentorCourseDetailsPage: React.FC = () => {
//   const { courseId } = useParams();
//   const { data, loading, error } = useFetch<Course>(
//     `/mentor/courses/${courseId}`
//   );
//   const [course, setCourse] = useState<Course>(sampleCourse);
//   const [activeTab, setActiveTab] = useState<"overview" | "lessons">(
//     "overview"
//   );

//   const courseData: Course | null = data
//     ? {
//         id: data.id,
//         title: `${data.title}`.trim(),
//         status: data.status as CourseStatus,
//         thumbnail: data.thumbnail || "",
//         category: data.category,
//         lessons: data.lessons,
//         description: data.description,
//       }
//     : null;

//   if (courseData) {
//     setCourse(courseData);
//   }

//   console.log("courses =", courseData);

//   // Helper function to get status icon and color
//   const getStatusIcon = () => {
//     switch (course.status) {
//       case "approved":
//         return <CheckCircle2 className="text-green-500" />;
//       case "pending":
//         return <Loader2 className="text-yellow-500 animate-spin" />;
//       case "rejected":
//         return <XCircle className="text-red-500" />;
//       case "draft":
//         return <Info className="text-purple-500" />;
//     }
//   };

//   // Calculate total course duration
//   const totalDuration = course.lessons.reduce(
//     (sum, lesson) => sum + lesson.duration,
//     0
//   );

//   return (
//     <div className="min-h-screen bg-purple-50 p-6">
//       <div className="max-w-4xl mx-auto bg-white shadow-xl rounded-xl overflow-hidden">
//         {/* Course Header */}
//         <div className="relative">
//           <img
//             src={course.thumbnail}
//             alt={course.title}
//             className="w-full h-64 object-cover"
//           />
//           <div className="absolute top-4 right-4 flex items-center space-x-2 bg-white/80 px-3 py-1 rounded-full">
//             {getStatusIcon()}
//             <span className="capitalize text-sm font-medium">
//               {course.status}
//             </span>
//           </div>
//         </div>

//         {/* Course Title and Category */}
//         <div className="p-6 bg-purple-100">
//           <h1 className="text-3xl font-bold text-purple-800 mb-2">
//             {course.title}
//           </h1>
//           <div className="flex items-center space-x-2">
//             <span className="bg-purple-200 text-purple-700 px-2 py-1 rounded-full text-sm">
//               {course.category.title}
//             </span>
//           </div>
//         </div>

//         {/* Tabs */}
//         <div className="flex border-b border-purple-200">
//           <button
//             onClick={() => setActiveTab("overview")}
//             className={`flex-1 py-3 font-semibold ${
//               activeTab === "overview"
//                 ? "bg-purple-500 text-white"
//                 : "text-purple-600 hover:bg-purple-100"
//             }`}
//           >
//             Overview
//           </button>
//           <button
//             onClick={() => setActiveTab("lessons")}
//             className={`flex-1 py-3 font-semibold ${
//               activeTab === "lessons"
//                 ? "bg-purple-500 text-white"
//                 : "text-purple-600 hover:bg-purple-100"
//             }`}
//           >
//             Lessons
//           </button>
//         </div>

//         {/* Content */}
//         <div className="p-6">
//           {activeTab === "overview" ? (
//             <div>
//               <h2 className="text-xl font-bold text-purple-800 mb-4">
//                 Course Description
//               </h2>
//               <p className="text-gray-700 mb-6">{course.description}</p>

//               <div className="grid grid-cols-2 gap-4">
//                 <div className="flex items-center space-x-3 bg-purple-50 p-4 rounded-lg">
//                   <BookOpen className="text-purple-600" />
//                   <div>
//                     <p className="font-semibold text-purple-800">
//                       Total Lessons
//                     </p>
//                     <p className="text-gray-600">
//                       {course.lessons.length} Lessons
//                     </p>
//                   </div>
//                 </div>
//                 <div className="flex items-center space-x-3 bg-purple-50 p-4 rounded-lg">
//                   <Clock className="text-purple-600" />
//                   <div>
//                     <p className="font-semibold text-purple-800">
//                       Total Duration
//                     </p>
//                     <p className="text-gray-600">{totalDuration} minutes</p>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           ) : (
//             <div>
//               <h2 className="text-xl font-bold text-purple-800 mb-4">
//                 Course Lessons
//               </h2>
//               {course.lessons.map((lesson, index) => (
//                 <div
//                   key={lesson.id}
//                   className="flex items-center justify-between bg-purple-50 p-4 rounded-lg mb-3"
//                 >
//                   <div className="flex items-center space-x-4">
//                     <span className="text-purple-600 font-bold">
//                       {index + 1}.
//                     </span>
//                     <div>
//                       <p className="font-semibold text-purple-800">
//                         {lesson.title}
//                       </p>
//                       <p className="text-gray-600">{lesson.duration} minutes</p>
//                     </div>
//                   </div>
//                   {lesson.isCompleted ? (
//                     <CheckCircle2 className="text-green-500" />
//                   ) : (
//                     <PlayCircle className="text-purple-600" />
//                   )}
//                 </div>
//               ))}
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default MentorCourseDetailsPage;
