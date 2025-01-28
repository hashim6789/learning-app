import { useState } from "react";
import { Category } from "../../../shared/types/Category";
import useCategoryManagement from "../hooks/useCategoryManagement";

interface CategoriesTableProps {
  categories: Category[];
}

const CategoriesTable: React.FC<CategoriesTableProps> = ({ categories }) => {
  const {
    editingCategoryId,
    // newTitle,
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
  } = useCategoryManagement(categories, 10);

  const [newTitle, setNewTitle] = useState<string>();

  return (
    <div className="p-6">
      <div className="flex justify-between mb-4">
        <input
          type="text"
          placeholder="Search categories..."
          value={searchQuery}
          onChange={(e) => handleSearchChange(e.target.value)}
          className="border border-gray-300 rounded-md p-2"
        />
        <select
          value={filterStatus}
          onChange={(e) =>
            handleFilterChange(e.target.value as "all" | "listed" | "unlisted")
          }
          className="border border-gray-300 rounded-md p-2"
        >
          <option value="all">All</option>
          <option value="listed">Listed</option>
          <option value="unlisted">Unlisted</option>
        </select>
      </div>

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
          {paginatedData.map((category) => {
            const isEditing = editingCategoryId === category.id;
            return (
              <tr
                key={category.id}
                className="border-b border-gray-200 last:border-0"
              >
                <td className="px-6 py-4">
                  <span
                    className={`px-3 py-1 rounded-full text-sm ${
                      category.status === "unlisted"
                        ? "bg-red-100 text-red-600"
                        : "bg-green-100 text-green-600"
                    }`}
                  >
                    {category.status === "unlisted" ? "Unlisted" : "Listed"}
                  </span>
                </td>
                <td className="px-6 py-4">
                  {isEditing ? (
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
                  {isEditing ? (
                    <div className="flex gap-2">
                      <button className="px-4 py-2 bg-green-500 text-white rounded-md">
                        Save
                      </button>
                      <button className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md">
                        Cancel
                      </button>
                    </div>
                  ) : (
                    <div className="flex gap-3">
                      <button className="px-4 py-2 bg-yellow-500 text-white rounded-md">
                        Edit
                      </button>
                      <button
                        className={`px-4 py-2 rounded-md ${
                          category.status === "listed"
                            ? "bg-red-100 text-red-600 hover:bg-red-200"
                            : "bg-green-100 text-green-600 hover:bg-green-200"
                        }`}
                      >
                        {category.status === "listed" ? "Unlist" : "List"}
                      </button>
                    </div>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      <div className="mt-4 flex justify-center">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index}
            onClick={() => handlePageChange(index + 1)}
            className={`mx-1 px-4 py-2 rounded-md ${
              currentPage === index + 1
                ? "bg-gray-800 text-white"
                : "bg-gray-200 text-gray-800"
            }`}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default CategoriesTable;
