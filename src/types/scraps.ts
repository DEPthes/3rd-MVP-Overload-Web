export interface PageInfo {
  currentPage: number;
  totalPage: number;
  pageSize: number;
}

export interface ApiScraps {
  id: number;
  title: string;
  previewImage: string;
  previewContent: string;
  createdDate: string;
  name: string;
  viewCount: number;
  likeCount: number;
  scrapCount: number;
}

export interface ScrapsResponse {
  data: {
    pageInfo: PageInfo;
    dataList: ApiScraps[];
  };
}
