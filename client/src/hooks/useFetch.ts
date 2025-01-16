import { useState, useEffect } from "react";
import axiosInstance from "../shared/axiosInstance";

const useFetch = <T>(url: string, options?: RequestInit) => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null); // Error message

  useEffect(() => {
    console.log("learner fetching");
    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await axiosInstance.get(url);

        if (!response.data) {
          throw new Error(`Error: ${response.status} ${response.statusText}`);
        }

        const jsonData = response.data;
        console.log("data:", jsonData);
        setData(jsonData.data);
      } catch (err: any) {
        setError(err.message || "Something went wrong!");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url, options]); // Dependencies for re-fetching when `url` or `options` change

  return { data, loading, error };
};

export default useFetch;
