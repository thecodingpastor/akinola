import { useState, useCallback, useRef, useEffect } from "react";

const useHttpClient = () => {
  const [Loading, setLoading] = useState();
  const [error, setError] = useState();

  const activeHttpRequests = useRef([]);

  const SendRequest = useCallback(
    async (url, method = "GET", body = null, headers = {}) => {
      setLoading(true);
      // For preventing errors when a new request is made before one finishes.
      const httpAbortController = new AbortController();
      activeHttpRequests.current.push(httpAbortController);

      try {
        const response = await fetch(url, {
          method,
          headers,
          body,
          signal: httpAbortController.signal,
        });
        let data;
        if (response.status === 204) {
          data = null;
        } else {
          data = await response.json();
        }

        // This terminates incomplete requests, thereby removing errors
        activeHttpRequests.current = activeHttpRequests.current.filter(
          (reqCtrl) => reqCtrl !== httpAbortController
        );

        if (!response.ok) {
          throw new Error(data.message);
        }

        setLoading(false);
        return data;
      } catch (error) {
        setError(error.message);

        setLoading(false);
        throw error;
      }
    },
    []
  );

  const ClearError = () => setError(null);

  useEffect(() => {
    return () => {
      activeHttpRequests.current.forEach((abortCtrl) => abortCtrl.abort());
    };
  }, []);

  return { Loading, error, ClearError, SendRequest };
};
export default useHttpClient;
