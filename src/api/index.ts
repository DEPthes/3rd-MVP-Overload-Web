import axios from "axios";

const api = axios.create({
  baseURL: "http://www.deplog.kro.kr:8080",
  // withCredentials: true,
  timeout: 2000,
});

export default api;

// * 혹시 사용법 모를까봐 이런 식으로 따로 파일 파서 데이터 불러오고 이걸 리액트 쿼리든 뭐로든으로
// * 관리하는 거임.
// export async function getNotices(type: string | null): Promise<APINotice[]> {
//     return await api.get(`/notice?type=${type}`);
//   }
