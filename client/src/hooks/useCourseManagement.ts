import Swal from "sweetalert2";
import { useState, useCallback } from "react";

import api from "../shared/utils/api";
import { showToast } from "../shared/utils/toastUtils";
import { config } from "../shared/configs/config";
import { Category } from "../shared/types/Category";
import { Course } from "../shared/types/Course";

const baseUrl = config.API_BASE_URL;

const useCourseManagement = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [course, setCourse] = useState<Course | null>(null);
  const handleSetCourse = (course: Course) => {
    setCourse(course);
  };

  // Fetch categories (only if not already fetched)
  const fetchCategories = useCallback(async () => {
    if (categories.length > 0) return;

    setLoading(true);
    setError(null);
    try {
      const response = await api.get(`${baseUrl}/mentor/categories`);
      setCategories(response.data.data);
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to fetch categories");
    } finally {
      setLoading(false);
    }
  }, [baseUrl, categories]);

  // Add a new course
  const addCourse = async (course: Partial<Course>): Promise<boolean> => {
    setLoading(true);
    setError(null);
    try {
      if (!course.category || !course.category.id) {
        showToast.error("Course category not exist!");
        return false;
      }

      const lessonIds = course.lessons
        ? course.lessons.map((course) => course.id)
        : [];

      const postData = {
        ...course,
        lessons: lessonIds,
        category: course.category.id,
      };
      const response = await api.post(`${baseUrl}/mentor/courses`, postData);

      if (response && response.data) {
        showToast.success("Course created successfully!");
        handleSetCourse(response.data.course);
        return true;
      }

      return false;
    } catch (err: any) {
      showToast.error("Failed to add course");
      setError(err.response?.data?.message || "Failed to add course");
      return false;
    } finally {
      setLoading(false);
    }
  };

  // Edit a course
  const editCourse = async (
    courseId: string,
    updatedCourse: Partial<Course>
  ) => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.put(
        `${baseUrl}/mentor/courses/${courseId}`,
        updatedCourse
      );
      if (response && response.data) {
        showToast.success("Course updated successfully!");
      }
    } catch (err: any) {
      showToast.error("Failed to update course");
      setError(err.response?.data?.message || "Failed to update course");
    } finally {
      setLoading(false);
    }
  };

  // Delete a course
  const deleteCourse = async (courseId: string): Promise<boolean> => {
    setLoading(true);
    setError(null);
    try {
      const result = await Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      });

      if (result.isConfirmed) {
        const response = await api.delete(
          `${baseUrl}/mentor/courses/${courseId}`
        );
        if (response && response.status === 200) {
          showToast.success("Course deleted successfully!");
          return true;
        }
        showToast.error("Course deleted failed!");
      } else {
        showToast.info("Deletion canceled.");
      }
      return false;
    } catch (err: any) {
      showToast.error("Failed to delete course");
      setError(err.response?.data?.message || "Failed to delete course");
      return false;
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    error,
    categories,
    fetchCategories,
    addCourse,
    editCourse,
    deleteCourse,
    course,
  };
};

export default useCourseManagement;
