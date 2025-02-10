// import { Book, Clock } from "lucide-react";
// import React from "react";
// import { useSelector } from "react-redux";
// import { RootState } from "../../../../store";
// import LessonView from "./LessonView";

// interface CourseDetailsProps {}

// const CourseDetails: React.FC<CourseDetailsProps> = ({}) => {
//   const { course } = useSelector((state: RootState) => state.course);
//   if (!course) {
//     return <div>The course is not exist</div>;
//   }
//   return (
//     <>
//       <div className="bg-purple-600 text-white p-8">
//         <h1 className="text-3xl font-bold mb-4">{course.title}</h1>
//         <div className="flex items-center space-x-6">
//           <div className="flex items-center">
//             <Clock className="h-5 w-5 mr-2" />
//             <span>{course.duration} minutes</span>
//           </div>
//           <div className="flex items-center">
//             <Book className="h-5 w-5 mr-2" />
//             <span>{course.lessons.length} lessons</span>
//           </div>
//         </div>
//       </div>

//       <div className="p-8 space-y-8">
//         <div>
//           <h2 className="text-xl font-semibold text-purple-800 mb-4">
//             Description
//           </h2>
//           <p className="text-gray-700 leading-relaxed">{course.description}</p>
//         </div>

//         <div>
//           <h2 className="text-xl font-semibold text-purple-800 mb-4">
//             Learning Lessons
//           </h2>
//           <div className="grid gap-3">
//             {course.lessons.map((lesson) => (
//               <div
//                 key={lesson.id}
//                 className="flex items-center p-4 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors"
//               >
//                 <LessonView lessonId={lesson.id} title={lesson.title} />
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default CourseDetails;

import { Book, Clock } from "lucide-react";
import type React from "react";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "../../../../store";
import LessonView from "./LessonView";
import { updateCourseStatus } from "../../../../store/slices/courseSlice";
import api from "../../../../shared/utils/api";
import { showToast } from "../../../../shared/utils/toastUtils";
import { CourseStatus } from "../../../../shared/types/CourseStatus";
import { getCourseStatusIcon } from "../../../../shared/utils/icons";
import { getCourseStatusColor } from "../../../../shared/utils/colors";

interface CourseDetailsProps {
  userRole: "mentor" | "admin" | "student";
  onPreventEdit: () => void;
}

const CourseDetails: React.FC<CourseDetailsProps> = ({
  userRole,
  onPreventEdit,
}) => {
  const dispatch = useDispatch();
  const { course } = useSelector((state: RootState) => state.course);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newStatus, setNewStatus] = useState<CourseStatus>("draft");

  if (!course) {
    return <div>The course does not exist</div>;
  }

  const handleStatusChange = (status: CourseStatus) => {
    setNewStatus(status);
    setIsModalOpen(true);
  };

  const confirmStatusChange = async () => {
    try {
      const response = await api.patch(
        `/mentor/courses/${course.id}/update-status`,
        { newStatus: newStatus }
      );
      if (response && response.status === 200) {
        dispatch(updateCourseStatus(newStatus));
        showToast.success(response.data.message);
        setIsModalOpen(false);
        onPreventEdit();
      }
      console.log(response.data);
    } catch (error: any) {
      setIsModalOpen(false);
      console.log("error", error);
      showToast.error(error.response.data.message);
      console.error(error);
    }
  };

  return (
    <>
      <div className="bg-purple-600 text-white p-8">
        <h1 className="text-3xl font-bold mb-4">{course.title}</h1>
        <div className="flex items-center space-x-6">
          <div className="flex items-center">
            <Clock className="h-5 w-5 mr-2" />
            <span>{course.duration} minutes</span>
          </div>
          <div className="flex items-center">
            <Book className="h-5 w-5 mr-2" />
            <span>{course.lessons.length} lessons</span>
          </div>
          <div
            className={`flex items-center px-3 py-1 rounded-full ${getCourseStatusColor(
              course.status
            )}`}
          >
            {getCourseStatusIcon(course.status)}
            <span className="capitalize">{course.status}</span>
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

        {userRole === "mentor" && course.status === "draft" && (
          <div>
            <button
              onClick={() => handleStatusChange("completed")}
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
            >
              Mark as Completed
            </button>
          </div>
        )}
        {userRole === "mentor" && course.status === "completed" && (
          <div>
            <button
              onClick={() => handleStatusChange("requested")}
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
            >
              Send Request For Approval
            </button>
          </div>
        )}

        {userRole === "admin" && course.status === "completed" && (
          <div className="flex space-x-4">
            <button
              onClick={() => handleStatusChange("approved")}
              className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
            >
              Approve Course
            </button>
            <button
              onClick={() => handleStatusChange("rejected")}
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
            >
              Reject Course
            </button>
          </div>
        )}

        <div>
          <h2 className="text-xl font-semibold text-purple-800 mb-4">
            Learning Lessons
          </h2>
          <div className="grid gap-3">
            {course.lessons.map((lesson) => (
              <div
                key={lesson.id}
                className="flex items-center p-4 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors"
              >
                <LessonView lessonId={lesson.id} title={lesson.title} />
              </div>
            ))}
          </div>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-lg font-semibold">Confirm Status Change</h2>
            <p className="mt-2">
              Are you sure you want to change the course status to {newStatus}?
            </p>
            <div className="mt-4 flex justify-end space-x-4">
              <button
                onClick={() => setIsModalOpen(false)}
                className="border border-gray-500 text-gray-700 px-4 py-2 rounded"
              >
                Cancel
              </button>
              <button
                onClick={confirmStatusChange}
                className="bg-blue-500 text-white px-4 py-2 rounded"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CourseDetails;
