import api from ".";
import { ScrapsResponse } from "../types/scraps";

export async function getScraps(page: number): Promise<ScrapsResponse> {
  const response = await api.get(`/scraps?page=${page}&size=5`);
  return response?.data;
}
