import {
  useSuspenseQuery,
  UseSuspenseQueryResult,
} from "@tanstack/react-query";
import { ScrapsResponse } from "../types/scraps";
import { getScraps } from "../api/getScraps";

export function useGetScraps(
  page: number
): UseSuspenseQueryResult<ScrapsResponse, Error> {
  const QUERY_KEY = "GetScraps";

  return useSuspenseQuery({
    queryKey: [QUERY_KEY],
    queryFn: () => getScraps(page),
  });
}
