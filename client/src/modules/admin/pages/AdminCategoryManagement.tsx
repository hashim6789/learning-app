// import React, { useState } from "react";

//imported child components
import CategoriesTable from "../tables/CategoryTable";

//imported custom hooks
// import useCategory from "../../../hooks/useCategory";
import useFetch from "../../../hooks/useFetch";

//import subclasses
import { Category } from "../../../shared/types/Category";
import CategoryCreation from "../components/CategoryCreation";

interface AdminCategoryManagementProps {}

const AdminCategoryManagement: React.FC<AdminCategoryManagementProps> = () => {
  const {
    loading,
    error,
    data: categoryData,
  } = useFetch<Category[] | null>("/admin/categories");

  const categories: Category[] = Array.isArray(categoryData)
    ? categoryData.map((item) => ({
        id: item.id,
        title: item.title.trim(),
        isListed: item.isListed,
        status: item.isListed === true ? "listed" : "unlisted",
      }))
    : [];

  // const { createCategory } = useCategory();
  // const [newCategoryTitle, setNewCategoryTitle] = useState("");

  // const handleSaveCategory = () => {
  //   if (newCategoryTitle) {
  //     createCategory(newCategoryTitle); // Call createCategory from the custom hook
  //     setIsCreatingCategory(false); // Hide the form after saving
  //     setNewCategoryTitle(""); // Reset the input field
  //   }
  // };

  //loading handling
  if (loading) {
    return (
      <div className="container mx-auto p-6 max-w-7xl h-[80vh] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin h-12 w-12 mb-4 border-4 border-blue-600 border-t-transparent rounded-full mx-auto"></div>
          <h2 className="text-xl font-semibold text-gray-700">
            Loading categories details...
          </h2>
          <p className="text-gray-500 mt-2">
            Please wait while we fetch the information
          </p>
        </div>
      </div>
    );
  }

  //error handling
  if (error) {
    return (
      <div className="container mx-auto p-6 max-w-7xl h-[80vh] flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-bold text-red-800">
            error fetch categories details...
          </h2>
          <p className="text-red-500 mt-2">Please try again (:</p>
        </div>
      </div>
    );
  }

  //error handling (no categories found)
  if (categoryData && categoryData.length === 0) {
    return (
      <>
        <CategoryCreation />
        <div className="container mx-auto p-6 max-w-7xl h-[80vh] flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-xl font-bold text-red-800">
              No Categories Available...
            </h2>
            <p className="text-red-500 mt-2">Unavailable data (:</p>
          </div>
        </div>
      </>
    );
  }

  return (
    <div className="p-6">
      <CategoryCreation />
      {/* Categories table */}
      <CategoriesTable categories={categories || []} />
    </div>
  );
};

export default AdminCategoryManagement;
