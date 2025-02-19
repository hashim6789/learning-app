import Swal from "sweetalert2";
import React from "react";
import { useNavigate } from "react-router-dom";
import MaterialCard from "../../components/materials/MaterialCard";
import Breadcrumbs from "../../components/BreadCrumbs";
import LoadingComponent from "../../components/LoadingComponent";
import { Path } from "../../../../shared/types/Path";
import { useMaterialTableFunctionality } from "../../hooks/useTableFunctionality";
import api from "../../../../shared/utils/api";
import { showToast } from "../../../../shared/utils/toastUtils";
import { MaterialType } from "../../../../shared/types/Material";

const paths: Path[] = [{ title: "My Materials", link: "" }];

const MentorMaterialManagement: React.FC = () => {
  const navigate = useNavigate();

  const {
    data,
    searchQuery,
    materialFilterType,
    handleSearchChange,
    currentPage,
    handlePageChange,
    handleFilterChange,
    totalPages,
    loading,
    handleDelete,
  } = useMaterialTableFunctionality({ itemsPerPage: 6, filterField: "type" });

  if (loading) {
    return <LoadingComponent theme="purple" item="material" />;
  }

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <Breadcrumbs paths={paths} />
      <div className="max-w-7xl mx-auto">
        <div className="mb-6 border-b pb-4 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-purple-700">
              Learning Materials
            </h1>
            <p className="text-gray-600">
              Manage your educational content and assessments
            </p>
          </div>
          <button
            onClick={() => navigate("/mentor/my-materials/create")}
            className="px-4 py-2 bg-purple-600 text-white font-semibold rounded-lg shadow-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
          >
            + Create New Material
          </button>
        </div>

        {/* Search and Filter Bar */}
        <div className="mb-4 flex flex-wrap gap-4">
          <input
            type="text"
            placeholder="Search materials..."
            value={searchQuery}
            onChange={(e) => handleSearchChange(e.target.value)}
            className="flex-1 px-4 py-2 border rounded-md focus:ring-2 focus:ring-purple-500"
          />
          <select
            value={materialFilterType}
            onChange={(e) => handleFilterChange(e.target.value as MaterialType)}
            className="px-4 py-2 border rounded-md focus:ring-2 focus:ring-purple-500"
          >
            <option value="all">All</option>
            {["video", "reading"].map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>

        {/* Material List */}
        {data.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {data.map((material) => (
              <MaterialCard
                key={material.id}
                material={material}
                handleDelete={handleDelete}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No materials found</p>
          </div>
        )}

        {/* Pagination */}
        <div className="mt-6 flex justify-end items-center gap-2">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className={`px-4 py-2 rounded border ${
              currentPage === 1
                ? "text-gray-400 cursor-not-allowed"
                : "text-black"
            }`}
          >
            Prev
          </button>
          <span className="text-sm text-gray-600">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className={`px-4 py-2 rounded border ${
              currentPage === totalPages
                ? "text-gray-400 cursor-not-allowed"
                : "text-black"
            }`}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default MentorMaterialManagement;
