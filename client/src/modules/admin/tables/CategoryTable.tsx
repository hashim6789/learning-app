import React, { useState } from "react";
import { Search } from "lucide-react";
import useBlockUnblock from "../../../hooks/useBlockUnblock";
import Swal from "sweetalert2";

interface Category {
  id: string;
  status: "blocked" | "unblocked";
  title: string;
}

interface CategoriesTableProps {
  categories: Category[];
}

const CategoriesTable: React.FC<CategoriesTableProps> = ({ categories }) => {
  const { blockUnblock } = useBlockUnblock();

  const [categoryStatus, setCategoryStatus] = useState<{
    [key: string]: "blocked" | "unblocked";
  }>(
    categories.reduce((acc, category) => {
      acc[category.id] = category.status;
      return acc;
    }, {} as { [key: string]: "blocked" | "unblocked" })
  );

  const handleBlockUnblock = async (
    categoryId: string,
    currentStatus: "blocked" | "unblocked"
  ) => {
    try {
      await blockUnblock(categoryId, "categorie", currentStatus);

      Swal.fire({
        title: `Category ${
          currentStatus === "blocked" ? "Unlisted" : "Listed"
        }`,
        icon: "success",
      });

      // Toggle the category's status based on the current status
      setCategoryStatus((prevStatus) => ({
        ...prevStatus,
        [categoryId]: currentStatus === "blocked" ? "unblocked" : "blocked",
      }));
    } catch (err) {
      console.error("Error in block/unblock operation", err);
    }
  };

  const [filterStatus, setFilterStatus] = useState<
    "all" | "blocked" | "unblocked"
  >("all");

  const filteredCategories = categories.filter((category) => {
    if (filterStatus === "all") return true;
    return categoryStatus[category.id] === filterStatus;
  });

  // Pagination setup
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5; // Number of categories per page

  const totalPages = Math.ceil(filteredCategories.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentCategories = filteredCategories.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const handlePageChange = (page: number) => {
    if (page < 1 || page > totalPages) return; // prevent invalid page numbers
    setCurrentPage(page);
  };

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <h2 className="text-xl font-semibold text-gray-800">Categories</h2>
          <span className="text-sm text-gray-500">
            {filteredCategories.length} Categories
          </span>
        </div>
      </div>
      {/* Header and filters */}
      <div className="flex items-center justify-between mb-4">
        <div className="relative w-80">
          <Search
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
            size={20}
          />
          <input
            type="text"
            placeholder="Search title..."
            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-600">Filter by</span>
          <div className="flex gap-2">
            {["all", "blocked", "unblocked"].map((status) => (
              <button
                key={status}
                onClick={() => setFilterStatus(status as any)}
                className={`px-3 py-1 rounded-full text-sm ${
                  filterStatus === status
                    ? "bg-purple-100 text-purple-600"
                    : "bg-gray-100 text-gray-600"
                }`}
              >
                {status}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-lg border border-gray-200">
        <table className="w-full">
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
            {currentCategories.length > 0 ? (
              currentCategories.map((category) => (
                <tr
                  key={category.id}
                  className="border-b border-gray-200 last:border-0"
                >
                  <td className="px-6 py-4">
                    <span
                      className={`px-3 py-1 rounded-full text-sm ${
                        categoryStatus[category.id] === "blocked"
                          ? "bg-red-100 text-red-600"
                          : "bg-green-100 text-green-600"
                      }`}
                    >
                      {categoryStatus[category.id] === "blocked"
                        ? "Unlisted"
                        : "Listed"}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm font-medium text-gray-800">
                      {category.title}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() =>
                          handleBlockUnblock(
                            category.id,
                            categoryStatus[category.id]
                          )
                        }
                        className={`text-sm px-4 py-2 rounded-md ${
                          categoryStatus[category.id] === "unblocked"
                            ? "bg-red-100 text-red-600 hover:bg-red-200"
                            : "bg-green-100 text-green-600 hover:bg-green-200"
                        }`}
                      >
                        {categoryStatus[category.id] === "unblocked"
                          ? "Unlist"
                          : "List"}
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={3} className="text-center py-4 text-gray-600">
                  No categories found
                </td>
              </tr>
            )}
          </tbody>
        </table>
        <div className="p-4 border-t border-gray-200">
          <div className="flex items-center justify-between">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              className="text-sm text-gray-600 disabled:text-gray-400"
              disabled={currentPage === 1}
            >
              Previous
            </button>
            <span className="text-sm text-gray-600">
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              className="text-sm text-gray-600 disabled:text-gray-400"
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoriesTable;
