import { useParams } from "react-router-dom";
import useFetch from "../../../../hooks/useFetch";
import { useEffect, useState } from "react";
import { ArrowLeft, Edit, X, Loader2 } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../../store";
import { setCourse } from "../../../../store/slices/courseSlice";
import { Course } from "../../../../shared/types/Course";
import CourseDetails from "../../components/course/CourseDetails";
import CourseEditForm from "../../components/course/CourseEditForm";
import { CourseStatus } from "../../hooks/useCourseTableFunctionality";

// interface Course {
//   id: string;
//   title: string;
//   description: string;
//   lessons: { id: string; title: string }[];
//   duration: number;
// }

const MentorCourseDetailsPage = () => {
  const [isEditing, setIsEditing] = useState(false);
  const { courseId } = useParams();
  const { course } = useSelector((state: RootState) => state.course);
  const isPossible = (course: Course): boolean =>
    course
      ? ["approved", "completed", "requested"].includes(course.status)
        ? false
        : true
      : false;
  const [isEditPossible, setEditPossible] = useState<boolean>(false);
  const dispatch = useDispatch<AppDispatch>();

  // Fetch course data
  const {
    data,
    loading: courseLoading,
    error: courseError,
  } = useFetch<Course>(`/mentor/courses/${courseId}`);

  useEffect(() => {
    if (data) {
      dispatch(setCourse(data));
      setEditPossible(isPossible(data));
    }
  }, [data, dispatch]);

  const stopEditing = () => {
    setIsEditing(false);
  };

  const PreventEdit = () => {
    setEditPossible(false);
  };

  if (courseLoading) {
    return (
      <div className="min-h-screen bg-purple-50 flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-purple-600" />
      </div>
    );
  }

  if (courseError || !course) {
    return (
      <div className="min-h-screen bg-purple-50 flex items-center justify-center text-red-600">
        Error loading course
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-purple-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header with Back Button and Edit Toggle */}
        <div className="flex justify-between items-center mb-6">
          <button
            className="flex items-center text-purple-600 hover:text-purple-800 transition-colors"
            onClick={() => window.history.back()}
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Courses
          </button>

          {isEditPossible && (
            <button
              onClick={() => setIsEditing(!isEditing)}
              className="flex items-center px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
            >
              {isEditing ? (
                <>
                  <X className="h-4 w-4 mr-2" />
                  Cancel
                </>
              ) : (
                <>
                  <Edit className="h-4 w-4 mr-2" />
                  Edit Course
                </>
              )}
            </button>
          )}
        </div>

        {/* Main Content Card */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          {isEditPossible && isEditing ? (
            <CourseEditForm course={course} onStopEditing={stopEditing} />
          ) : (
            // View Mode
            <CourseDetails userRole={"mentor"} onPreventEdit={PreventEdit} />
          )}
        </div>
      </div>
    </div>
  );
};

export default MentorCourseDetailsPage;
