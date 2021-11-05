import { useState, useEffect } from "react";
import axios from "axios";
import { camelizeKeys } from "humps";
import get from "lodash/get";
import { useToast } from "@chakra-ui/react";

import Config from "@/app.config";

const RESULT_PATTERN = {
  complete: false,
  data: null,
  error: false,
  loading: false,
};

const axiosInstance = axios.create({
  timeout: Config.requestTimeout,
  baseURL: Config.apiUrl,
});

const parseRequestError = (error) => {
  const status = get(error, "response.status") || "";
  const statusText = get(error, "response.statusText") || "";

  return { status, statusText, message: "Something went wrong!" };
};

const useApi = (fn) => {
  const [result, setResult] = useState(RESULT_PATTERN);
  const [request, setRequestOptions] = useState(null);
  const toast = useToast();

  useEffect(() => {
    if (!request) {
      setResult({
        complete: true,
        error: false,
        data: null,
        loading: false,
      });

      return;
    }

    setResult({
      complete: false,
      error: false,
      data: null,
      loading: true,
    });
    const { url, method, data } = request;

    const dataKey = ["GET", "DELETE"].includes(method) ? "params" : "data";

    const requestOptions = {
      url,
      method,
      [dataKey]: data,
    };

    axiosInstance
      .request(requestOptions)
      .then((res) => {
        const camelizedJson = camelizeKeys(res);
        setResult({
          complete: true,
          data: camelizedJson.data,
          error: false,
          loading: false,
        });
      })
      .catch((error) => {
        const { status, message } = parseRequestError(error);

        toast({
          title: "ERROR",
          description: `${status} ${message}`,
          status: "error",
          duration: 3000,
          isClosable: true,
        });

        setResult({
          complete: true,
          data: null,
          error: true,
          loading: false,
        });
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [request]);

  return [result, (...args) => setRequestOptions(fn(...args))];
};

export default useApi;
