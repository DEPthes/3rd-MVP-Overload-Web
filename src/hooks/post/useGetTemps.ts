import {
  useSuspenseQuery,
  UseSuspenseQueryResult,
} from "@tanstack/react-query";
import { TempsResponse } from "../../types/temps";
import { getTemps } from "../../api/post/post";

export function useGetTemps(): UseSuspenseQueryResult<TempsResponse, Error> {
  const QUERY_KEY = "GetTemps";

  return useSuspenseQuery({
    queryKey: [QUERY_KEY],
    queryFn: () => getTemps(),
  });
}
