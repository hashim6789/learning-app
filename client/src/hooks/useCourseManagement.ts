import {
  useState,
  //  useEffect,
  useCallback,
} from "react";

import api from "../shared/utils/api";

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

  // Fetch categories (only if not already fetched)
  const fetchCategories = useCallback(async () => {
    if (categories.length > 0) return; // Avoid duplicate requests if categories are already fetched

    setLoading(true);
    setError(null);
    try {
      const response = await api.get(`${baseUrl}/categories`);
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
      await api.post(`${baseUrl}/courses`, course);
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to add course");
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
  };
};

export default useCourseManagement;
