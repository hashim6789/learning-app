import Swal from "sweetalert2";
import React, { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";
import api from "../../../shared/utils/api";
import { config } from "../../../shared/configs/config";
import { IMaterial } from "../../../shared/types/Material";
import MaterialCard from "../components/materials/MaterialCard";
import { showToast } from "../../../shared/utils/toastUtils";

// Simplified MaterialType and IMaterial interface

const MentorMaterialManagement: React.FC = () => {
  const [materials, setMaterials] = useState<IMaterial[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();

  useEffect(() => {
    fetchMaterials();
  }, []);

  const fetchMaterials = async () => {
    try {
      setIsLoading(true);
      // Replace with your actual API endpoint
      const response = await api(`${config.API_BASE_URL}/mentor/materials`);
      if (!response.data) throw new Error("Failed to fetch materials");
      const data = response.data.data;
      console.log("materials", data);
      setMaterials(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load materials");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (materialId: string) => {
    // Show a confirmation dialog
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });

    // Proceed if the user confirmed
    if (result.isConfirmed) {
      try {
        const response = await api.delete(
          `${config.API_BASE_URL}/mentor/materials/${materialId}`
        );
        if (response.data) {
          const newMaterials = materials.filter(
            (material) => material.id !== materialId
          );
          setMaterials(newMaterials);
          showToast.success("The material deleted successfully!");
        }
      } catch (error: any) {
        console.log(error);
        showToast.error(error.message);
      }
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-red-600 text-center">
          <p className="text-xl font-semibold mb-2">Error loading materials</p>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-purple-900 mb-2">
            Learning Materials
          </h1>
          <p className="text-gray-600">
            Manage your educational content and assessments
          </p>
          <button
            onClick={() => navigate("/mentor/my-materials/create")}
            className="bg-purple-600"
          >
            Create
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {materials.map((material) => (
            <MaterialCard
              key={material.id}
              material={material}
              handleDelete={handleDelete}
            />
          ))}
        </div>

        {materials.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No materials found</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MentorMaterialManagement;
