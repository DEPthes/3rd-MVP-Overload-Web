import api from "./index";

export async function getMembers() {
  const response = await api.get(`/members`);
  return response?.data;
}
