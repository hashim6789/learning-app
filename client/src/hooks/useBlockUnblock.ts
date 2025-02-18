import { useState } from "react";
import axios from "axios";
import MySwal from "sweetalert2-react-content";
import Swal from "sweetalert2";
import api from "../shared/utils/api";
import { showToast } from "../shared/utils/toastUtils";
import { UserStatus } from "../shared/types/UserStatus";

type EntityType = "learner" | "mentor" | "categorie";
type Status = UserStatus;

interface UseBlockUnblockResponse {
  isLoading: boolean;
  error: string | null;
  handleBlockUnblock: (
    id: string,
    entityType: EntityType,
    currentStatus: Status
  ) => Promise<boolean>;
}

const useBlockUnblock = (): UseBlockUnblockResponse => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleBlockUnblock = async (
    id: string,
    entityType: EntityType,
    currentStatus: Status
  ) => {
    setIsLoading(true);
    setError(null);

    try {
      const action = currentStatus === "blocked" ? "unblock" : "block";
      const change = currentStatus === "blocked" ? false : true;

      const result = await MySwal(Swal).fire({
        title: `Are you sure you want to ${action} this ${entityType}?`,
        text: `This action will ${action} the ${entityType}.`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: currentStatus === "blocked" ? "#3085d6" : "#d33",
        cancelButtonColor: "#aaa",
        confirmButtonText: `Yes, ${action}`,
        cancelButtonText: "Cancel",
      });

      if (result.isConfirmed) {
        const endpoint = `/api/${entityType}s/${id}/block-unblock`;

        // API call to block/unblock
        const response = await api.patch(endpoint, { change });

        if (response.status === 200) {
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
    handleBlockUnblock,
  };
};

export default useBlockUnblock;
