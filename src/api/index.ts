import axios from "axios";
import { jwtDecode } from "jwt-decode";

const api = axios.create({
  baseURL: "https://www.deplog.kro.kr",
  timeout: 2000,
});

// JWT 토큰 만료 확인 함수
const isTokenExpired = (token: string) => {
  const decoded: any = jwtDecode(token);
  const currentTime = Date.now() / 1000;
  return decoded.exp < currentTime;
};

// Refresh Token 함수
const refreshToken = async () => {
  const storedRefreshToken = localStorage.getItem("refreshToken") || sessionStorage.getItem("refreshToken");
  if (!storedRefreshToken) {
    throw new Error("리프레시 토큰이 적절하지 않습니다.");
  }

  const response = await axios.get("https://www.deplog.kro.kr/auth/reissue", {
    params: { refreshToken: storedRefreshToken },
  });

  const newAccessToken = response.data.accessToken;
  if (newAccessToken) {
    if (localStorage.getItem("token")) {
      localStorage.setItem("token", newAccessToken);
    } else {
      sessionStorage.setItem("token", newAccessToken);
    }
  }
  return newAccessToken;
};

// Request Interceptor
api.interceptors.request.use(
  async (config) => {
    let token = localStorage.getItem("token") || sessionStorage.getItem("token");

    if (token) {
      if (isTokenExpired(token)) {
        token = await refreshToken();
      }
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response Interceptor
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response && error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      const token = await refreshToken();
      if (token) {
        originalRequest.headers.Authorization = `Bearer ${token}`;
        return api(originalRequest);
      }
    }

    return Promise.reject(error);
  }
);

export default api;