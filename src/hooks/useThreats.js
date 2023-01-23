import { useEffect, useState } from "react";
import { fetchThreats } from "../api";

export const useThreats = () => {
  const [data, setData] = useState();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      fetchThreats().then(res => setData(res.data));
      setLoading(false);
    } catch (err) {
      setError(err);
      setLoading(false);
    }
  }, []);

  return {
    data,
    error,
    loading
  }
};
