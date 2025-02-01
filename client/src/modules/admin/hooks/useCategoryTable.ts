import { useState, useMemo, useCallback } from "react";
import { Category } from "../../../shared/types/Category";
import api from "../../../shared/utils/api";
import { config } from "../../../shared/configs/config";
import { showToast } from "../../../shared/utils/toastUtils";

export type CategoryStatus = "listed" | "unlisted" | "all";

interface TableFunctionalityOptions {
  data: Category[];
  itemsPerPage: number;
}

export function useCategoryTable({
  data,
  itemsPerPage,
}: TableFunctionalityOptions) {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState<
    "all" | "listed" | "unlisted"
  >("all");
  const [isLoading, setIsLoading] = useState(false);
  const [categoryData, setCategoryData] = useState<Category[]>(data);
  const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);
  const [isCreating, setIsCreating] = useState<boolean>(false);

  const filteredData = useMemo(() => {
    return categoryData.filter((item) => {
      const matchesStatus =
        filterStatus === "all" || item.status === filterStatus;
      const matchesSearch = String(item["status"])
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      return matchesStatus && matchesSearch;
    });
  }, [categoryData, filterStatus, searchQuery]);

  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredData.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredData, currentPage, itemsPerPage]);

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  const handlePageChange = useCallback((page: number) => {
    setCurrentPage(page);
  }, []);

  const handleSearchChange = useCallback((query: string) => {
    setSearchQuery(query);
    setCurrentPage(1);
  }, []);

  const handleFilterChange = useCallback(
    (status: "all" | "listed" | "unlisted") => {
      setFilterStatus(status);
      setCurrentPage(1);
    },
    []
  );

  const handleToggleStatus = async (
    itemId: string,
    status: "listed" | "unlisted"
  ) => {
    const confirmed = window.confirm(
      `Are you sure you want to ${
        status === "listed" ? "unlist" : "list"
      } this category?`
    );

    if (!confirmed) return;

    setIsLoading(true);
    const change = status === "unlisted"; // Toggle logic

    try {
      const response = await api.patch(
        `${config.API_BASE_URL}/admin/categories/${itemId}/list-unlist`,
        { change }
      );

      if (response && response.data) {
        const updatedItem: Category = response.data.data as Category;

        const updatedData = categoryData.map<Category>((item) =>
          item.id === itemId
            ? {
                ...item,
                status: updatedItem.isListed ? "listed" : "unlisted",
                isListed: updatedItem.isListed,
              }
            : item
        );
        setCategoryData(updatedData);
        showToast.success(response.data.message); // Show success toast
      }
    } catch (error) {
      console.error("Error toggling item status:", error);
      showToast.error("Failed to toggle status"); // Show error toast
    } finally {
      setIsLoading(false);
    }
  };

  const handleEditTitle = (categoryId: string) => {
    setIsEditModalOpen(true);
  };

  const handleOpenCreateModal = () => {
    setIsCreating(true);
  };

  const handleSavaTitle = async (categoryId: string, newTitle: string) => {
    console.log("Updating category title: ", newTitle, categoryId);

    try {
      const response = await api.put(
        `${config.API_BASE_URL}/admin/categories/${categoryId}`, // Update the endpoint to the correct one for updating titles
        { title: newTitle } // Send the new title in the request body
      );

      if (response && response.data) {
        const updatedItem: Category = response.data.data as Category;

        // Update the category data state
        const updatedData = categoryData.map<Category>((item) =>
          item.id === categoryId
            ? { ...item, title: updatedItem.title } // Update only the title
            : item
        );

        setCategoryData(updatedData); // Update the local state with the new category data
        setIsEditModalOpen(false); // Close the editing state
        showToast.success(response.data.message); // Show success toast
      }
    } catch (error) {
      console.error("Error updating category title:", error);
      showToast.error("Failed to update title"); // Show error toast
    }
  };

  const saveNewCategory = async (newTitle: string) => {
    try {
      const response = await api.post(
        `${config.API_BASE_URL}/admin/categories`, // Update the endpoint to the correct one for updating titles
        { title: newTitle, isListed: true } // Send the new title in the request body
      );

      if (response && response.data) {
        const data = response.data.data;
        console.log("create category title: ", data);

        const updatedItem: Category = {
          id: data.id,
          title: data.title,
          isListed: data.isListed,
          status: data.isListed ? "listed" : "unlisted",
        };

        // Update the category data state
        const updatedData = [...categoryData, updatedItem];

        setCategoryData(updatedData); // Update the local state with the new category data
        setIsCreating(false); // Close the editing state
        showToast.success("Category created successfully!"); // Show success toast
      }
    } catch (error) {
      console.error("Error creating category title:", error);
      showToast.error("Failed to create category"); // Show error toast
    }
  };

  return {
    isLoading,
    filterStatus,
    currentPage,
    searchQuery,
    paginatedData,
    totalPages,
    isEditModalOpen,
    isCreating,
    setIsEditModalOpen,
    handleOpenCreateModal,
    saveNewCategory,
    handleSavaTitle,
    handleEditTitle,
    handlePageChange,
    handleSearchChange,
    handleFilterChange,
    handleToggleStatus,
  };
}
