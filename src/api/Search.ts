import api from './index.ts';

// 검색 기능
export const SearchPosts = async (searchWord: string, page: number = 1, size: number = 10): Promise<any> => {
    const response = await api.get(`/posts/searches`, {
      params: {
        searchWord,
        page,
        size
      }
    });
    return response.data;
  };
