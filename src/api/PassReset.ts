import api from './index.ts';

// 비밀번호 변경
export const PassReset = async ({ email, password }: { email: string; password: string;}): Promise<any> => {
  const response = await api.put('/auth/password', {
    email,
    password
  });
  return response.data;
};

//메일 인증
export const sendMail = async (email: string): Promise<void> => {
    await api.get(`/mails?email=${email}`);
  };
  