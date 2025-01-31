// import React, { useState, useEffect } from "react";
// import { useParams } from "react-router-dom";
// import CourseHeader from "../../components/CourseHeader";
// import CourseTabs from "../../components/CourseTabs";
// import CourseOverview from "../../components/CourseOverview";
// import { Course } from "../../../../shared/types/Course";
// // import { CourseStatus } from "../../../shared/types/CourseStatus";
// // import { sampleCourse } from "../../../shared/sample/sampleCourse";
// import useFetch from "../../../../hooks/useFetch";
// import CourseLessons from "../../components/CourseLessons";
// // import useCourseManagement from "../../../hooks/useCourseManagement";

// import { setCourse } from "../../../../store/slices/courseSlice";
// import { useDispatch, useSelector } from "react-redux";
// import { AppDispatch, RootState } from "../../../../store";

// const MentorCourseDetailsPage: React.FC = () => {
//   const { courseId } = useParams<{ courseId: string }>();
//   const dispatch = useDispatch<AppDispatch>();
//   const { data, loading, error } = useFetch<Course>(
//     `/mentor/courses/${courseId}`
//   );
//   // const { editCourse } = useCourseManagement();
//   const { course } = useSelector((state: RootState) => state.course);

//   const [activeTab, setActiveTab] = useState<"overview" | "lessons">(
//     "overview"
//   );

//   useEffect(() => {
//     if (data) {
//       dispatch(setCourse(data));
//     }
//   }, [data, dispatch]);

//   if (loading) return <p>Loading...</p>;
//   if (error) return <p className="text-red-500">Error loading course data.</p>;

//   return (
//     <div className="min-h-screen bg-purple-50 p-6">
//       <div className="max-w-4xl mx-auto bg-white shadow-xl rounded-xl overflow-hidden">
//         <CourseHeader />
//         <CourseTabs activeTab={activeTab} setActiveTab={setActiveTab} />
//         <div className="p-6">
//           {activeTab === "overview" ? (
//             <CourseOverview />
//           ) : (
//             <CourseLessons lessons={course?.lessons || []} />
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default MentorCourseDetailsPage;
