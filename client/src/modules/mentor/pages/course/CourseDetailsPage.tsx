import { useParams } from "react-router-dom";
import useFetch from "../../../../hooks/useFetch";
import { useEffect, useState } from "react";
import { ArrowLeft, Edit, X } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../../store";
import { setCourse } from "../../../../store/slices/courseSlice";
import { Course } from "../../../../shared/types/Course";
import CourseDetails from "../../components/course/CourseDetails";
import CourseEditForm from "../../components/course/CourseEditForm";
import LoadingComponent from "../../components/LoadingComponent";
import ErrorComponent from "../../components/ErrorComponent";

const MentorCourseDetailsPage = () => {
  const [isEditing, setIsEditing] = useState(false);
  const { courseId } = useParams();
  const { course } = useSelector((state: RootState) => state.course);
  const isPossible = (course: Course): boolean =>
    course
      ? ["approved", "published", "requested"].includes(course.status)
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
  } = useFetch<Course>(`/api/courses/${courseId}`);

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
    return <LoadingComponent item="course" theme="purple" />;
  }

  // Error handling
  if (courseError || !course) {
    return <ErrorComponent item="course" theme="purple" />;
  }

  return (
    <div className="min-h-screen bg-purple-50 py-8 px-4">
      <button
        className="flex items-center text-purple-600 hover:text-purple-800 transition-colors"
        onClick={() => window.history.back()}
      >
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back to Courses
      </button>
      <div className="max-w-4xl mx-auto">
        {/* Header with Back Button and Edit Toggle */}
        <div className="flex justify-between items-center mb-6">
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
