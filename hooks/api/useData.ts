import { AxiosRequestConfig } from "axios";
import { Dispatch, SetStateAction, useState } from "react";
import {
  QueryKey,
  useQuery,
  UseQueryOptions,
  UseQueryResult,
} from "@tanstack/react-query";
import fetcher from "@portofolio-fe/services/fetcher";
import { HttpMethod } from "./url";

interface IUseData<T, F = unknown> {
  queryResult: UseQueryResult<T, any>;
  filterItem?: F;
  setFilterItem: Dispatch<SetStateAction<F | undefined>>;
}

export const getListData = async (
  options?: Omit<AxiosRequestConfig, "method">
) => {
  const json = await fetcher({ ...options, method: HttpMethod.GET });
  const result = json;
  return result;
};

const useData = <T, F = unknown>(
  fetchOptions: Omit<AxiosRequestConfig, "method" | "params">,
  queryKey: QueryKey,
  filter?: F,
  options: Omit<
    UseQueryOptions<any, unknown, any, unknown[]>,
    "queryKey" | "queryFn"
  > = {
    enabled: true,
    retry: 2,
    retryDelay: 1500,
  }
): IUseData<T, F> => {
  const [filterItem, setFilterItem] = useState(filter);

  const queryResult = useQuery({
    queryKey: [...queryKey, filterItem],
    queryFn: () => {
      return getListData({ ...fetchOptions, params: filterItem });
    },
    ...options,
  });

  return {
    queryResult,
    filterItem,
    setFilterItem,
  };
};

export default useData;
