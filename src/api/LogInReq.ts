import api from './index.ts';

// 로그인 요청
export const LogInReq = async ({ email, password }: { email: string; password: string; }): Promise<any> => {
  const response = await api.post('/auth/login', {
    email,
    password
  });
  return response.data;
};
