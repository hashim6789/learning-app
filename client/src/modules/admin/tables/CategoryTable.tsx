import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { Search } from "lucide-react";
import useBlockUnblock from "../../../hooks/useBlockUnblock";
import api from "../../../shared/utils/api";

interface Category {
  id: string;
  status: "blocked" | "unblocked";
  title: string;
}

interface CategoriesTableProps {
  categories: Category[];
}

const CategoriesTable: React.FC<CategoriesTableProps> = ({ categories }) => {
  const { handleBlockUnblock } = useBlockUnblock();
  const [categoriesState, setCategoriesState] =
    useState<Category[]>(categories);
  const [editingCategoryId, setEditingCategoryId] = useState<string | null>(
    null
  );
  const [newTitle, setNewTitle] = useState<string>("");

  useEffect(() => {
    setCategoriesState(categories);
  }, [categories]);

  const handleEditClick = (category: Category) => {
    setEditingCategoryId(category.id);
    setNewTitle(category.title);
  };

  const handleSaveEdit = async (categoryId: string, currentTitle: string) => {
    if (newTitle.trim() === currentTitle.trim()) {
      Swal.fire({
        title: "No changes detected",
        text: "Please enter a different title to update.",
        icon: "info",
      });
      return;
    }

    try {
      await api.put(`http://localhost:3000/admin/categories/${categoryId}`, {
        title: newTitle,
      });

      Swal.fire({ title: "Category updated successfully!", icon: "success" });

      setCategoriesState((prevCategories) =>
        prevCategories.map((category) =>
          category.id === categoryId
            ? { ...category, title: newTitle }
            : category
        )
      );

      setEditingCategoryId(null);
    } catch (err) {
      Swal.fire({
        title: "Error updating category",
        text: "Something went wrong",
        icon: "error",
      });
    }
  };

  const handleCancelEdit = () => {
    setEditingCategoryId(null);
    setNewTitle("");
  };

  // Update category status locally after button click
  const handleStatusChange = (
    categoryId: string,
    currentStatus: "blocked" | "unblocked"
  ) => {
    const newStatus = currentStatus === "blocked" ? "unblocked" : "blocked";
    setCategoriesState((prevCategories) =>
      prevCategories.map((category) =>
        category.id === categoryId
          ? { ...category, status: newStatus }
          : category
      )
    );

    // Call the backend API to update the status
    handleBlockUnblock(categoryId, "categorie", newStatus);
  };

  return (
    <div className="p-6">
      <table className="w-full bg-white border border-gray-200">
        <thead>
          <tr className="border-b border-gray-200">
            <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">
              Status
            </th>
            <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">
              Category Title
            </th>
            <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {categoriesState.map((category) => (
            <tr
              key={category.id}
              className="border-b border-gray-200 last:border-0"
            >
              <td className="px-6 py-4">
                <span
                  className={`px-3 py-1 rounded-full text-sm ${
                    category.status === "blocked"
                      ? "bg-red-100 text-red-600"
                      : "bg-green-100 text-green-600"
                  }`}
                >
                  {category.status === "blocked" ? "Unlisted" : "Listed"}
                </span>
              </td>
              <td className="px-6 py-4">
                {editingCategoryId === category.id ? (
                  <input
                    type="text"
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    className="border border-gray-300 rounded-md p-2 w-full"
                  />
                ) : (
                  <span className="text-sm font-medium text-gray-800">
                    {category.title}
                  </span>
                )}
              </td>
              <td className="px-6 py-4">
                {editingCategoryId === category.id ? (
                  <div className="flex gap-2">
                    <button
                      onClick={() =>
                        handleSaveEdit(category.id, category.title)
                      }
                      className="px-4 py-2 bg-green-500 text-white rounded-md"
                    >
                      Save
                    </button>
                    <button
                      onClick={handleCancelEdit}
                      className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md"
                    >
                      Cancel
                    </button>
                  </div>
                ) : (
                  <div className="flex gap-3">
                    <button
                      onClick={() => handleEditClick(category)}
                      className="px-4 py-2 bg-yellow-500 text-white rounded-md"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() =>
                        handleStatusChange(category.id, category.status)
                      }
                      className={`px-4 py-2 rounded-md ${
                        category.status === "unblocked"
                          ? "bg-red-100 text-red-600 hover:bg-red-200"
                          : "bg-green-100 text-green-600 hover:bg-green-200"
                      }`}
                    >
                      {category.status === "unblocked" ? "Unlist" : "List"}
                    </button>
                  </div>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CategoriesTable;
