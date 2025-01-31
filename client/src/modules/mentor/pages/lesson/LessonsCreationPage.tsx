import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useFetch from "../../../../hooks/useFetch";
import LessonStructure from "../../components/LessonStructure";
import Swal from "sweetalert2";
import LessonList from "../../components/LessonList";
import api from "../../../../shared/utils/api";
import { showToast } from "../../../../shared/utils/toastUtils";
import useCourseManagement from "../../../../hooks/useCourseManagement";
import { config } from "../../../../shared/configs/config";
import { Category } from "../../../../shared/types/Category";

interface Course {
  id: string;
  status: "Approved" | "Rejected" | "Pending" | "Draft";
  title: string;
  category: Category;
  thumbnail: string;
  lessons: Lesson[];
  description: string;
}

interface Lesson {
  id: string;
  title: string;
  description: string;
}

const LessonsCreatePage = () => {
  const { courseId } = useParams<{ courseId: string }>();
  const [isAddLesson, setIsAddLesson] = useState(false);
  const { categories, fetchCategories } = useCourseManagement();

  const navigate = useNavigate();

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  const {
    data: course,
    loading: courseLoading,
    error: courseError,
  } = useFetch<Course>(`${config.API_BASE_URL}/mentor/courses/${courseId}`);

  const lessons = course?.lessons;
  const fetchedLessons: Lesson[] = Array.isArray(lessons)
    ? lessons.map((item) => ({
        id: item.id,
        title: `${item.title}`.trim(),
        description: item.description || "",
      }))
    : [];

  const handleAddLesson = () => {
    setIsAddLesson(true);
  };

  const handleEditLesson = (lessonId: string) => {
    Swal.fire("Edit lesson", `Editing lesson with ID: ${lessonId}`, "info");
  };

  const handleDeleteLesson = (lessonId: string) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to recover this lesson!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await api.delete(
            `${config.API_BASE_URL}/mentor/courses/${courseId}/lessons/${lessonId}`
          );
          showToast.success("Your lesson has been deleted.");
        } catch (error) {
          showToast.error("Failed to delete the lesson.");
        }
      }
    });
  };

  const handleCourseUpdate = async (
    courseId: string,
    updatedCourse: Pick<Course, "description" | "title"> & {
      category: string;
    }
  ) => {
    try {
      const response = await api.put(
        `${config.API_BASE_URL}/mentor/courses/${courseId}`,
        updatedCourse
      );

      if (!response) {
        throw new Error("Failed to update course");
      }

      navigate("/mentor/my-courses");
      showToast.success("Course updated successfully!");
    } catch (error) {
      showToast.error("Course update failed!!");

      console.error("Error updating course:", error);
    }
  };

  if (courseLoading) {
    return <div>Loading...</div>;
  }

  if (courseError) {
    return <div>Error: {courseError}</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Course Lessons</h1>

      {course && (
        <div className="max-w-4xl mx-auto p-6">
          <h1 className="text-3xl font-bold mb-6">Course Management</h1>
          {/* <CourseDetails
            categories={categories}
            course={course}
            onUpdate={handleCourseUpdate}
          /> */}
        </div>
      )}

      <button
        onClick={handleAddLesson}
        className="px-4 py-2 bg-blue-600 text-white rounded-lg mb-6 hover:bg-blue-700"
      >
        Add Lesson
      </button>

      {isAddLesson && (
        <LessonStructure
          courseId={courseId as string}
          onCancel={() => setIsAddLesson(false)}
        />
      )}

      <LessonList
        lessons={fetchedLessons}
        onEditLesson={handleEditLesson}
        onDeleteLesson={handleDeleteLesson}
      />
    </div>
  );
};

export default LessonsCreatePage;
