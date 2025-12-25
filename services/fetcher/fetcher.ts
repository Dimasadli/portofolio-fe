import axios, {
  AxiosError,
  AxiosRequestConfig,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";
import {
  localStorageExt,
  LOCAL_STORAGE_KEYS,
  logger,
} from "@portofolio-fe/utils";
// import { analytics, logEvent } from "apps/gearbox/config/firebase";

const baseURL = process.env["NEXT_PUBLIC_API_URL"];

const baseConfig = {
  timeout: 20000,
  headers: {
    "Content-Type": "application/json",
  },
  baseURL,
};

const client = axios.create(baseConfig);

const interceptorOnFulfilledRequest = (
  config: InternalAxiosRequestConfig<any>
) => {
  const token = localStorageExt.getLocalStorage(
    LOCAL_STORAGE_KEYS.USER_INFO as string
  )?.access_token;

  if (token) {
    if (config.headers) {
      config.headers["Authorization"] = "Bearer " + token;
    }
  }

  logger.info({
    message: "axios request " + config?.url,
    type: "AXIOS",
    detailMessage: JSON.stringify(config),
  });

  return config;
};

const interceptorOnFulfilledResponse = (response: AxiosResponse) => {
  logger.info({
    message: "axios response " + response?.config?.url,
    type: "AXIOS",
    detailMessage: JSON.stringify(response?.data),
  });
  return response;
};

const interceptorOnRejectedResponse = async (err: AxiosError) => {
  logger.error({
    message: "axios error response " + err?.config?.url,
    type: "AXIOS",
    detailMessage: JSON.stringify(err.response?.data),
  });
  //   if (analytics) {
  //     logEvent(analytics, "error_toaster", {
  //       current_screen: window.location.pathname,
  //       error_message: JSON.stringify(err.response?.data) ?? "",
  //     });
  //   }
  if (err.response?.status === 401) {
    localStorageExt.clearLocalStorage();
    window.location.href = "/login";
    // datadogUserProperty.clearUser();
  }
  return Promise.reject(err);
};
client.interceptors.request.use(interceptorOnFulfilledRequest);
client.interceptors.response.use(
  interceptorOnFulfilledResponse,
  interceptorOnRejectedResponse
);

export default client;

const fetcher = async <T = any, Z = AxiosRequestConfig>(config: Z) => {
  return client.request<T>(config as AxiosRequestConfig);
};
