import Swal from "sweetalert2";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../../../shared/utils/api";
import { config } from "../../../../shared/configs/config";
import { IMaterial, MaterialType } from "../../../../shared/types/Material";
import MaterialCard from "../../components/materials/MaterialCard";
import { showToast } from "../../../../shared/utils/toastUtils";
import Breadcrumbs from "../../components/BreadCrumbs";
import { Path } from "../../../../shared/types/Path";
import { useTableFunctionalityOfMaterial } from "../../hooks/useTableFunctionality";
import useFetch from "../../../../hooks/useFetch";

const paths: Path[] = [{ title: "my materials", link: "" }];

const MentorMaterialManagement: React.FC = () => {
  const navigate = useNavigate();
  const { data, loading, error } = useFetch<any[]>("/mentor/materials");
  const [mateials, setMaterials] = useState<IMaterial[]>([]);

  const fetchedMaterials: IMaterial[] = Array.isArray(data)
    ? data.map((item: IMaterial) => ({
        id: item.id,
        title: item.title,
        description: item.description,
        type: item.type,
        duration: item.duration,
        url: item.url,
      }))
    : [];

  useEffect(() => {
    if (Array.isArray(data)) {
      const fetchedMaterials: IMaterial[] = data.map((item: IMaterial) => ({
        id: item.id,
        title: item.title,
        description: item.description,
        type: item.type,
        duration: item.duration,
        url: item.url,
      }));
      setMaterials(fetchedMaterials);
    }
  }, [data]);

  const {
    paginatedData: paginatedLessons,
    searchQuery,
    filterStatus,
    handleSearchChange,
    currentPage,
    handlePageChange,
    handleFilterChange,
    totalPages,
  } = useTableFunctionalityOfMaterial(fetchedMaterials, 9);

  const handleDelete = async (lessonId: string) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#6B46C1",
      cancelButtonColor: "#E53E3E",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      try {
        await api.delete(`${config.API_BASE_URL}/mentor/materials  /${lessonId}`);
        showToast.success("The lesson was deleted successfully!");

        // Remove the deleted lesson from the state
        setMaterials((prevLessons) =>
          prevLessons.filter((lesson) => lesson.id !== lessonId)
        );

        // Adjust the current page if necessary
        if (paginatedLessons.length === 1 && currentPage > 1) {
          handlePageChange(currentPage - 1);
        }
      } catch (error: any) {
        showToast.error(error.message);
      }
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto p-6 max-w-7xl h-[80vh] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin h-12 w-12 mb-4 border-4 border-purple-600 border-t-transparent rounded-full mx-auto"></div>
          <h2 className="text-xl font-semibold text-gray-700">
            Loading material details...
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
          <h2 className="text-xl font-bold text-purple-800">
            error fetch material details...
          </h2>
          <p className="text-red-500 mt-2">Please try again (:</p>
        </div>
      </div>
    );
  }

  //error handling (no materials found)
  if (data && data.length === 0) {
    return (
      <div className="container mx-auto p-6 max-w-7xl h-[80vh] flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-bold text-purple-800">
            No Materials Available...
          </h2>
          <p className="text-red-500 mt-2">Unavailable data (:</p>
        </div>
      </div>
    );
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
            value={filterStatus}
            onChange={(e) => handleFilterChange(e.target.value as MaterialType)}
            className="px-4 py-2 border rounded-md focus:ring-2 focus:ring-purple-500"
          >
            <option value="all">All</option>
            {["video", "reading"].map((type) => (
              <option value={type}>{type}</option>
            ))}
          </select>
        </div>

        {/* Material List */}
        {paginatedLessons.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {paginatedLessons.map((material) => (
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
        {totalPages > 1 && (
          <div className="flex justify-center mt-6">
            <button
              disabled={currentPage === 1}
              onClick={() => handlePageChange(currentPage - 1)}
              className="px-4 py-2 mx-1 bg-gray-300 rounded disabled:opacity-50"
            >
              Previous
            </button>
            <span className="px-4 py-2">{`Page ${currentPage} of ${totalPages}`}</span>
            <button
              disabled={currentPage === totalPages}
              onClick={() => handlePageChange(currentPage + 1)}
              className="px-4 py-2 mx-1 bg-gray-300 rounded disabled:opacity-50"
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default MentorMaterialManagement;
