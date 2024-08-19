import {
  useSuspenseQuery,
  UseSuspenseQueryResult,
} from "@tanstack/react-query";
import { getDetail } from "../api/Detail";
import { DetailResponse } from "../types/detail";

export function useGetDetails(
  id: number
): UseSuspenseQueryResult<DetailResponse, Error> {
  const QUERY_KEY = "GetDetail";

  return useSuspenseQuery({
    queryKey: [QUERY_KEY],
    queryFn: () => getDetail({ id }),
  });
}
