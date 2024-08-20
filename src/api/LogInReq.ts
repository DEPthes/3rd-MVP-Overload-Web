import api from "./index.ts";

// 로그인 요청
export const LogInReq = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}): Promise<any> => {
  const response = await api.post("/auth/login", {
    email,
    password,
  });
  return response.data;
};

export const LogOutReq = async ({
  accessToken,
  refreshToken,
}: {
  accessToken: string;
  refreshToken: string;
}): Promise<any> => {
  const response = await api.delete("/auth/logout", {
    data: {
      accessToken,
      refreshToken,
    },
  });
  return response.data;
};
