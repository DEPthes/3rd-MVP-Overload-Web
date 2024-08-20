export interface PageInfo {
  currentPage: number;
  totalPage: number;
  pageSize: number;
}

export interface Avatar {
  avatarFace: string;
  avatarBody: string;
  avatarEyes: string;
  avatarNose: string;
  avatarMouth: string;
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
  avatar: Avatar;
}

export interface ScrapsResponse {
  data: {
    pageInfo: PageInfo;
    dataList: ApiScraps[];
  };
}
