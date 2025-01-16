import React, { useState } from "react";
import { useParams } from "react-router-dom";
import useFetch from "../../../hooks/useFetch";
import LessonStructure from "../components/LessonStructure";
import Swal from "sweetalert2";
import axios from "axios";
import LessonList from "../components/LessonList";

interface Course {
  id: string;
  status: "Approved" | "Rejected" | "Pending" | "Draft";
  title: string;
  category: string;
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

  const {
    data: course,
    loading: courseLoading,
    error: courseError,
  } = useFetch<Course>(`http://localhost:3000/mentor/courses/${courseId}`);

  // const {
  //   data: lessons,
  //   loading: lessonsLoading,
  //   error: lessonsError,
  // } = useFetch<Lesson[]>(
  //   `http://localhost:3000/mentor/courses/${courseId}/lessons`
  // );
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
          await axios.delete(
            `http://localhost:3000/mentor/courses/${courseId}/lessons/${lessonId}`
          );
          Swal.fire("Deleted!", "Your lesson has been deleted.", "success");
        } catch (error) {
          Swal.fire("Error", "Failed to delete the lesson.", "error");
        }
      }
    });
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
        <div className="border rounded-lg p-6 mb-6 bg-white shadow-md">
          <h2 className="text-2xl font-semibold">{course.title}</h2>
          <p className="text-gray-600">{course.category}</p>
          <div className="flex items-center gap-4 mt-4">
            <img
              src={course.thumbnail}
              alt={course.title}
              className="w-24 h-24 object-cover rounded-lg"
            />
            <div>
              <p className="font-medium">Status: {course.status}</p>
              <p className="font-medium">description: {course.description}</p>
            </div>
          </div>
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
