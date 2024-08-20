import api from ".";

export const ExitReq = async (): Promise<any> => {
  const response = await api.delete("/auth/exit");
  return response.data;
};
