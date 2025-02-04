import { useState, useEffect } from "react";
import { api } from "../services/api.js";

const useFetchData = (url, refetch = 0) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchDataAsync();
  }, [url, refetch]);

  const fetchDataAsync = async () => {
    try {
      const response = await api.get(url);
      setData(response.data);
      setLoading(false);
    } catch (error) {
      setError(error);
      setLoading(false);
    }
  };

  return { data, loading, error };
};

export default useFetchData;
