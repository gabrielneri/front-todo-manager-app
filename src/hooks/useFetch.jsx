import { useState, useEffect } from "react";
import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000/api"
});

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
  }, [url, options]);

  return { data, error, isLoading };
};

export default useFetch;