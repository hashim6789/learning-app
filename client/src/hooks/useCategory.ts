import { useState } from "react";
import api from "../shared/utils/api";
import { showToast } from "../shared/utils/toastUtils";

const useCategory = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Create a new category
  const createCategory = async (newCategoryTitle: string) => {
    setLoading(true);
    try {
      const response = await api.post(
        "http://localhost:3000/admin/categories",
        {
          title: newCategoryTitle.trim().toUpperCase(),
          isListed: true,
        }
      );

      showToast.success("New category created:");
    } catch (err) {
      showToast.error("An error when the category created:");
      setError("Error creating category");
    } finally {
      setLoading(false);
    }
  };

  // Update an existing category title
  const updateCategoryTitle = async (
    categoryId: string,
    newCategoryTitle: string
  ) => {
    setLoading(true);
    try {
      const response = await api.put(
        `http://localhost:3000/admin/categories/${categoryId}`,
        {
          title: newCategoryTitle.trim().toUpperCase(),
        }
      );

      console.log("Category title updated:", response.data);
    } catch (err) {
      setError("Error updating category title");
    } finally {
      setLoading(false);
    }
  };

  return { createCategory, updateCategoryTitle, loading, error };
};

export default useCategory;
