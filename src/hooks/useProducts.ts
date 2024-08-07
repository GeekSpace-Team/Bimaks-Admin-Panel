import useSWR from "swr";
import axios from "axios";

const fetcher = (url: string) => axios.get(url).then((res) => res.data);

export const useProducts = (groupId: number) => {
  const { data, error, mutate } = useSWR(
    `/product/product-by-group?group=${groupId}`,
    fetcher
  );

  return {
    products: data,
    isLoading: !error && !data,
    isError: error,
    mutate,
  };
};
