import api from "./index";
import { DetailResponse } from "../types/detail";

export async function getDetail({
  id,
}: {
  id: number;
}): Promise<DetailResponse> {
  const response = await api.get(`/posts/details/${id}`);
  return response?.data;
}
