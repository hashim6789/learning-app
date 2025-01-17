import { useState } from "react";
import Swal from "sweetalert2";
import api from "../shared/utils/api";

interface Lesson {
  title: string;
  description: string;
  courseId?: string;
}

const useLesson = (courseId: string) => {
  const [lesson, setLesson] = useState<Lesson>({
    title: "",
    description: "",
    courseId,
  });

  const handleInputChange = (field: keyof Lesson, value: string) => {
    setLesson((prev) => ({ ...prev, [field]: value }));
  };

  const resetLesson = () => {
    setLesson({ title: "", description: "" });
  };

  const validateLesson = () => {
    if (!lesson.title || !lesson.description) {
      Swal.fire({
        icon: "error",
        title: "Validation Error",
        text: "Please fill out all fields.",
      });
      return false;
    }
    return true;
  };

  const addLesson = async () => {
    if (!validateLesson()) return;

    try {
      const response = await api.post("/mentor/lessons", lesson); // Adjust endpoint as necessary
      Swal.fire({
        icon: "success",
        title: "Lesson Added",
        text: `Lesson "${lesson.title}" has been added successfully!`,
      });
      resetLesson();
      return response.data; // Return data if needed by caller
    } catch (error) {
      console.error(error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "An error occurred while adding the lesson. Please try again later.",
      });
    }
  };

  return {
    lesson,
    handleInputChange,
    resetLesson,
    validateLesson,
    addLesson,
  };
};

export default useLesson;
