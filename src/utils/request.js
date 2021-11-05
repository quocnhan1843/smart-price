import axios from "axios";

import Config from "@/app.config";

const VALID_METHODS = ["GET", "POST", "PUT", "PATCH", "DELETE"];

const fetcher = ({ path, ...params }) =>
  axios({
    url: path,
    baseURL: Config.apiUrl,
    timeout: 30000,
    ...params,
  });

const isValidMethod = (method) => VALID_METHODS.includes(method);

const isSuccessStatus = (status) => status >= 200 && status < 400;

const makeFetchParams = ({ method = "GET", data }) => {
  if (!isValidMethod(method)) {
    throw new TypeError(
      `Method [${method}] is invalid. The method must be one of [${VALID_METHODS}]`
    );
  }

  const dataKey = ["POST", "PUT", "PATCH", "DELETE"].includes(method)
    ? "data"
    : "params";

  return {
    method,
    [dataKey]: data,
  };
};

const parseResponse = (res) => {
  const status = res && res.status;

  if (!isSuccessStatus(status)) {
    throw new Error(`ERROR:: Request failed with status ${status}`, res);
  }

  const { data } = res || {};

  return { data, status };
};

const request = async (payload) => {
  try {
    const { path, method, data } = payload || {};
    const params = makeFetchParams({ method, data });
    const response = await fetcher({ path, ...params });
    const result = parseResponse(response);

    return result;
  } catch (error) {}
};

export default request;
