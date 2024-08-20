import {
  useSuspenseQuery,
  UseSuspenseQueryResult,
} from "@tanstack/react-query";

import { getMembers } from "../api/member";
import { MemberResponse } from "../types/member";

export function useMember(): UseSuspenseQueryResult<MemberResponse, Error> {
  const QUERY_KEY = "GetMembers";

  return useSuspenseQuery({
    queryKey: [QUERY_KEY],
    queryFn: () => getMembers(),
  });
}
