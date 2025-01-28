import { useState } from "react";
import axios from "axios";
import MySwal from "sweetalert2-react-content";
import Swal from "sweetalert2";
import api from "../../../shared/utils/api";
import { showToast } from "../../../shared/utils/toastUtils";
import { CategoryStatus } from "./useCategoryTable";

type EntityType = "categories";

interface UseListUnlistResponse {
  isLoading: boolean;
  error: string | null;
  handleListUnlist: (
    id: string,
    entityType: EntityType,
    currentStatus: CategoryStatus
  ) => Promise<boolean>;
}

const host = "http://localhost:3000";

const useListUnlist = (): UseListUnlistResponse => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleListUnlist = async (
    id: string,
    entityType: EntityType,
    currentStatus: CategoryStatus
  ) => {
    setIsLoading(true);
    setError(null);

    try {
      const action = currentStatus === "unlisted" ? "list" : "unlist";
      const change = currentStatus === "unlisted" ? false : true;

      const result = await MySwal(Swal).fire({
        title: `Are you sure you want to ${action} this ${entityType}?`,
        text: `This action will ${action} the ${entityType}.`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: currentStatus === "unlisted" ? "#3085d6" : "#d33",
        cancelButtonColor: "#aaa",
        confirmButtonText: `Yes, ${action}`,
        cancelButtonText: "Cancel",
      });

      if (result.isConfirmed) {
        const endpoint = `${host}/admin/${entityType}/${id}/list-unlist`;

        // API call to list/unlist
        const response = await api.patch(endpoint, { change });

        console.log("response =", response);
        if (response.status === 200) {
          showToast.success(`Successfully ${action}ed the ${entityType}.`);
          return true;
        }
      } else {
        showToast.info("Action cancelled.");
      }
      return false;
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        const errorMessage = err.response?.data?.message || "An error occurred";
        setError(errorMessage);
        showToast.error(errorMessage);
      } else {
        setError("An unexpected error occurred");
        showToast.error("An unexpected error occurred");
      }
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    error,
    handleListUnlist,
  };
};

export default useListUnlist;
