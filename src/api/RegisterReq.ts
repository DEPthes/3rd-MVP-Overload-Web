import api from './index.ts';

// 이메일 중복 체크
export const checkEmailDuplicate = async (email: string): Promise<boolean> => {
    const response = await api.get(`/auth/emails?email=${email}`);
    return response.data.data.availability;
};

// 회원가입 요청
export const RegisterReq = async ({ email, password, name, part, generation }: { email: string; password: string; name?: string; part?: string; generation?: number }): Promise<any> => {
  const response = await api.post('/auth/join', {
    email,
    password,
    name,
    part,
    generation,
  });
  return response.data;
};

//메일인증
export const sendMail = async (email: string): Promise<void> => {
  await api.get(`/mails?email=${email}`);
};
