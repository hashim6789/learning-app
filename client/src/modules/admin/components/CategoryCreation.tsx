import { useState } from "react";
import useCategory from "../../../hooks/useCategory";

const CategoryCreation: React.FC = () => {
  const [isCreatingCategory, setIsCreatingCategory] = useState<boolean>(false);
  const [newCategoryTitle, setNewCategoryTitle] = useState<string>("");
  const { createCategory } = useCategory();

  const handleCreateCategoryClick = () => {
    setIsCreatingCategory(true);
  };

  const handleCancelCategoryCreation = () => {
    setIsCreatingCategory(false);
    setNewCategoryTitle("");
  };

  const handleSaveCategory = () => {
    if (newCategoryTitle.trim() === "") {
      alert("Category title cannot be empty!");
      return;
    }
    console.log("Saving category:", newCategoryTitle);
    createCategory(newCategoryTitle);
    setIsCreatingCategory(false);
    setNewCategoryTitle("");
  };

  return (
    <div>
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
    </div>
  );
};

export default CategoryCreation;
