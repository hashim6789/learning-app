import React, { useState } from "react";

//imported child components
import CategoriesTable from "../tables/CategoryTable";

//imported custom hooks
import useCategory from "../../../hooks/useCategory";
import useFetch from "../../../hooks/useFetch";

interface AdminCategoryManagementProps {}

interface Category {
  id: string;
  title: string;
  status: "blocked" | "unblocked";
  isListed?: boolean;
}

const AdminCategoryManagement: React.FC<AdminCategoryManagementProps> = () => {
  const {
    loading: fetchLoading,
    error: fetchError,
    data: categoryData,
  } = useFetch<Category[] | null>("http://localhost:3000/admin/categories");

  const categories: Category[] = Array.isArray(categoryData)
    ? categoryData.map((item) => ({
        id: item.id,
        title: item.title.trim(),
        status: item.isListed === true ? "unblocked" : "blocked",
      }))
    : [];

  const { createCategory } = useCategory();
  const [isCreatingCategory, setIsCreatingCategory] = useState(false);
  const [newCategoryTitle, setNewCategoryTitle] = useState("");

  const handleCreateCategoryClick = () => {
    setIsCreatingCategory(true);
  };

  const handleSaveCategory = () => {
    if (newCategoryTitle) {
      createCategory(newCategoryTitle); // Call createCategory from the custom hook
      setIsCreatingCategory(false); // Hide the form after saving
      setNewCategoryTitle(""); // Reset the input field
    }
  };

  const handleCancelCategoryCreation = () => {
    setIsCreatingCategory(false); // Hide the form when Cancel is clicked
    setNewCategoryTitle(""); // Reset the input field
  };

  if (fetchLoading) {
    return (
      <div className="container mx-auto p-6 max-w-7xl h-[80vh] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin h-12 w-12 mb-4 border-4 border-blue-600 border-t-transparent rounded-full mx-auto"></div>
          <h2 className="text-xl font-semibold text-gray-700">
            Loading learner details...
          </h2>
          <p className="text-gray-500 mt-2">
            Please wait while we fetch the information
          </p>
        </div>
      </div>
    );
  }

  if (fetchError) {
    return (
      <div className="container mx-auto p-6 max-w-7xl h-[80vh] flex items-center justify-center">
        <div className="text-center">
          {/* <div className="animate-spin h-12 w-12 mb-4 border-4 border-blue-600 border-t-transparent rounded-full mx-auto"></div> */}
          <h2 className="text-xl font-bold text-red-800">{fetchError}</h2>
          <p className="text-red-500 mt-2">Please try again (:</p>
        </div>
      </div>
    );
  }
  if (categoryData && categoryData.length === 0) {
    return <div className="p-6 text-red-500">No categories exists!</div>;
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-800">
          Category Management
        </h2>
        <button
          onClick={handleCreateCategoryClick}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg"
        >
          Create New Category
        </button>
      </div>

      {/* Show the form when isCreatingCategory is true */}
      {isCreatingCategory && (
        <div className="bg-white p-6 rounded-lg border border-gray-200 mb-6">
          <h3 className="text-lg font-semibold text-gray-700 mb-4">
            New Category
          </h3>
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-2">
              Category Title
            </label>
            <input
              type="text"
              value={newCategoryTitle}
              onChange={(e) => setNewCategoryTitle(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
          <div className="mt-4 flex justify-end gap-2">
            <button
              onClick={handleCancelCategoryCreation}
              className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg"
            >
              Cancel
            </button>
            <button
              onClick={handleSaveCategory}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg"
            >
              Save
            </button>
          </div>
        </div>
      )}

      {/* Categories table */}
      <CategoriesTable categories={categories || []} />
    </div>
  );
};

export default AdminCategoryManagement;
