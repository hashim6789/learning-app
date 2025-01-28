import { useState } from "react";
import Swal from "sweetalert2";
import api from "../../../shared/utils/api";
import useListUnlist from "./useListUnlist";
import { Category, CategoryStatus } from "../../../shared/types/Category";
import { useCategoryTable } from "./useCategoryTable";

const useCategoryManagement = (
  categories: Category[],
  itemsPerPage: number
) => {
  const { handleListUnlist } = useListUnlist();

  const [categoryStatus, setCategoryStatus] = useState<{
    [key: string]: CategoryStatus;
  }>(
    categories.reduce(
      (acc, category) => ({ ...acc, [category.id]: category.status }),
      {}
    )
  );

  const updatedCategories = categories.map((category) => ({
    ...category,
    status: categoryStatus[category.id],
  }));

  const {
    currentPage,
    searchQuery,
    filterStatus,
    paginatedData,
    totalPages,
    handlePageChange,
    handleSearchChange,
    handleFilterChange,
  } = useCategoryTable({
    data: updatedCategories,
    itemsPerPage,
    filterField: "title",
  });

  const [editingCategoryId, setEditingCategoryId] = useState<string | null>(
    null
  );
  const [newTitle, setNewTitle] = useState<string>("");

  // const handleEditClick = (category: Category) => {
  //   setEditingCategoryId(category.id);
  //   setNewTitle(category.title);
  // };

  // const handleSaveEdit = async (categoryId: string, currentTitle: string) => {
  //   if (newTitle.trim() === currentTitle.trim()) {
  //     Swal.fire({
  //       title: "No changes detected",
  //       text: "Please enter a different title to update.",
  //       icon: "info",
  //     });
  //     return;
  //   }

  //   try {
  //     const response = await api.put(
  //       `http://localhost:3000/admin/categories/${categoryId}`,
  //       {
  //         title: newTitle,
  //       }
  //     );

  //     const updatedCategory = response.data;

  //     setCategoryStatus((prevState) => ({
  //       ...prevState,
  //       [categoryId]: updatedCategory.status, // Update status for the specific category
  //     }));

  //     Swal.fire({ title: "Category updated successfully!", icon: "success" });
  //     setEditingCategoryId(null);
  //   } catch (err) {
  //     Swal.fire({
  //       title: "Error updating category",
  //       text: "Something went wrong",
  //       icon: "error",
  //     });
  //   }
  // };

  // const handleCancelEdit = () => {
  //   setEditingCategoryId(null);
  //   setNewTitle("");
  // };

  // const handleStatusChange = async (
  //   categoryId: string,
  //   currentStatus: CategoryStatus
  // ) => {
  //   try {
  //     const newStatus = currentStatus === "listed" ? "unlisted" : "listed";
  //     const success = await handleListUnlist(
  //       categoryId,
  //       "categories",
  //       newStatus
  //     );

  //     if (success) {
  //       setCategoryStatus((prevState) => ({
  //         ...prevState,
  //         [categoryId]: newStatus,
  //       }));
  //     }
  //   } catch (error) {
  //     console.error("Failed to list/unlist category:", error);
  //   }
  // };

  return {
    editingCategoryId,
    newTitle,
    currentPage,
    searchQuery,
    filterStatus,
    paginatedData,
    totalPages,
    handlePageChange,
    handleSearchChange,
    handleFilterChange,
    // handleEditClick,
    // handleSaveEdit,
    // handleCancelEdit,
    // handleStatusChange,
  };
};

export default useCategoryManagement;
