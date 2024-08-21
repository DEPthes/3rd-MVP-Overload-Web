import axios from "axios";
import { jwtDecode } from "jwt-decode";

const api = axios.create({
  baseURL: "https://www.deplog.kro.kr",
  timeout: 2000,
});

// JWT 토큰 만료 확인 함수
const isTokenExpiringSoon = (token: string) => {
  const decoded: any = jwtDecode(token);
  const currentTime = Date.now() / 1000;
  const expirationTime = decoded.exp;
  const bufferTime = 5 * 60; // 만료 시간 5분 전 (단위: 초)

  return expirationTime - currentTime < bufferTime;
};

// Refresh Token 함수
const refreshToken = async () => {
  const storedRefreshToken = localStorage.getItem("refreshToken") || sessionStorage.getItem("refreshToken");
  const currentToken = localStorage.getItem("token") || sessionStorage.getItem("token");

  if (!storedRefreshToken || !currentToken) {
    throw new Error("리프레시 토큰 또는 액세스 토큰이 적절하지 않습니다.");
  }

  try {
    const response = await axios.get("https://www.deplog.kro.kr/auth/reissue", {
      params: {
        refreshToken: storedRefreshToken,
      },
      headers: {
        Authorization: `Bearer ${currentToken}`,
      },
    });

    const newAccessToken = response.data.data.accessToken;
    if (newAccessToken) {
      if (localStorage.getItem("token")) {
        localStorage.setItem("token", newAccessToken);
        sessionStorage.setItem("token", newAccessToken);
      } else {
        sessionStorage.setItem("token", newAccessToken);
      }
      return newAccessToken;
    } else {
      throw new Error("새로운 액세스 토큰을 받지 못했습니다.");
    }
  } catch (error) {
    console.error("토큰 갱신 중 오류가 발생했습니다:", error);
    throw error;
  }
};

// 주기적으로 토큰 만료를 체크하고 갱신하는 함수
const checkTokenExpiration = async () => {
  let token = localStorage.getItem("token") || sessionStorage.getItem("token");

  // 로컬 스토리지에 토큰이 있지만 세션 스토리지에 토큰이 없는 경우 복사
  if (localStorage.getItem("token") && !sessionStorage.getItem("token")) {
    sessionStorage.setItem("token", localStorage.getItem("token")!);
  }

  if (token) {
    const decoded: any = jwtDecode(token);
    const currentTime = Date.now() / 1000;
    const expirationTime = decoded.exp;

    console.log(`현재 시간: ${new Date(currentTime * 1000).toLocaleTimeString()}, 토큰 만료 시간: ${new Date(expirationTime * 1000).toLocaleTimeString()}`);

    if (isTokenExpiringSoon(token)) {
      console.log("백그라운드에서 토큰 만료가 임박하여 갱신을 시도합니다.");
      try {
        token = await refreshToken();
        console.log("토큰이 성공적으로 갱신되었습니다.");
      } catch (error) {
        console.error("토큰 갱신에 실패했습니다:", error);
      }
    } else {
      console.log("토큰이 아직 유효합니다. 갱신이 필요하지 않습니다.");
    }
  } else {
    console.log("저장된 토큰이 없습니다.");
  }
};

// 백그라운드에서 주기적으로 토큰 확인 (예: 1분마다 실행)
setInterval(checkTokenExpiration, 1 * 60 * 1000); // 1분마다 확인

// Request Interceptor
api.interceptors.request.use(
  async (config) => {
    let token = localStorage.getItem("token") || sessionStorage.getItem("token");

    // 로컬 스토리지에 토큰이 있지만 세션 스토리지에 토큰이 없는 경우 복사
    if (localStorage.getItem("token") && !sessionStorage.getItem("token")) {
      sessionStorage.setItem("token", localStorage.getItem("token")!);
    }

    if (token) {
      if (isTokenExpiringSoon(token)) {
        console.log("API 호출 중 토큰 만료가 임박하여 갱신을 시도합니다.");
        try {
          token = await refreshToken();
          console.log("토큰이 API 호출 중 성공적으로 갱신되었습니다.");
        } catch (error) {
          console.error("API 호출 중 토큰 갱신에 실패했습니다:", error);
        }
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

      console.log("401 오류 발생, 토큰 갱신을 시도합니다.");
      try {
        const token = await refreshToken();
        if (token) {
          originalRequest.headers.Authorization = `Bearer ${token}`;
          return api(originalRequest);
        }
      } catch (tokenRefreshError) {
        console.error("토큰 갱신에 실패했습니다:", tokenRefreshError);
        return Promise.reject(tokenRefreshError);
      }
    }

    if (error.response && error.response.status === 500) {
      console.log("500 오류 발생: 로그아웃 처리 및 페이지 새로고침.");

      // 로컬스토리지와 세션스토리지 비우기
      localStorage.clear();
      sessionStorage.clear();

      // 페이지 새로고침
      window.location.reload();
    }

    return Promise.reject(error);
  }
);

export default api;
