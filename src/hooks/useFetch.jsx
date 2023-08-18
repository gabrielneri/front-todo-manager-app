import { useState, useEffect } from "react";
import api from "../services/api";

const useFetch = (url, options = {}) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    api.get(url, options)
      .then(response => {
        setData(response.data);
        setError(null);
      })
      .catch(error => {
        setError(error);
        setData(null);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  return { data, error, isLoading };
};

export default useFetch;