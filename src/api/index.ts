import axios from "axios";

const api = axios.create({
  baseURL: "https://www.deplog.kro.kr",
  // withCredentials: true,
  timeout: 2000,
});

api.interceptors.request.use(
  (config) => {
    let token = localStorage.getItem("token");
    // localStorage에 토큰이 없으면 sessionStorage에서 가져오기.
    if (!token) {
      token = sessionStorage.getItem("token");
    }
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;

// * 혹시 사용법 모를까봐 이런 식으로 따로 파일 파서 데이터 불러오고 이걸 리액트 쿼리든 뭐로든으로
// * 관리하는 거임.
// export async function getNotices(type: string | null): Promise<APINotice[]> {
//     return await api.get(`/notice?type=${type}`);
//   }
