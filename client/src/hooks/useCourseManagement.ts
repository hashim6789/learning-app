import Swal from "sweetalert2";
import { useState, useCallback } from "react";

import api from "../shared/utils/api";
import { showToast } from "../shared/utils/toastUtils";
import { useNavigate } from "react-router-dom";

interface Course {
  id: string;
  status: "Approved" | "Rejected" | "Pending" | "Draft";
  title: string;
  category: string;
  description: string;
  thumbnail: string;
}

interface Category {
  id: string;
  title: string;
}

const useCourseManagement = (baseUrl: string) => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

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
  const addCourse = async (course: Partial<Course>) => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.post(`${baseUrl}/mentor/courses`, course);

      if (response && response.data) {
        // navigate("/mentor/my-courses");
        showToast.success("Course created successfully!");
      }
    } catch (err: any) {
      showToast.error("Failed to add course");
      setError(err.response?.data?.message || "Failed to add course");
    } finally {
      setLoading(false);
    }
  };

  // Delete a course

  const deleteCourse = async (courseId: string) => {
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
        await api.delete(`${baseUrl}/mentor/courses/${courseId}`);
        showToast.success("Course deleted successfully!");
      } else {
        showToast.info("Deletion canceled.");
      }
    } catch (err: any) {
      showToast.error("Failed to delete course");
      setError(err.response?.data?.message || "Failed to delete course");
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
    deleteCourse,
  };
};

export default useCourseManagement;
