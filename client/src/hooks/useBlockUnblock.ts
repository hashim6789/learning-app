import { useState } from "react";
import axios, { AxiosError } from "axios";
import api from "../shared/utils/api";

type EntityType = "learner" | "mentor" | "categorie";
type Status = "blocked" | "unblocked";

interface UseBlockUnblockResponse {
  isLoading: boolean;
  error: string | null;
  blockUnblock: (id: string, entityType: EntityType, status: Status) => void;
}

const host = "http://localhost:3000";

const useBlockUnblock = (): UseBlockUnblockResponse => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const blockUnblock = async (
    id: string,
    entityType: EntityType,
    status: Status
  ) => {
    setIsLoading(true);
    setError(null); // Reset error before making the request

    try {
      const change = status === "blocked" ? false : true;
      // Define the API endpoint
      const endpoint = `${host}/admin/${entityType}s/${id}/block-unblock`;
      console.log(change);

      // API call to block/unblock
      const response = await api.patch(endpoint, { change });

      if (response.status === 200) {
      }
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        // Handle AxiosError specifically
        setError(err.response?.data?.message || "An error occurred");
      } else {
        // Handle non-Axios errors
        setError("An unexpected error occurred");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    error,
    blockUnblock,
  };
};

export default useBlockUnblock;
