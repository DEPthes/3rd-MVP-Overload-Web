export interface Avatar {
  avatarFace: string;
  avatarBody: string;
  avatarEyes: string;
  avatarNose: string;
  avatarMouth: string;
}

export interface WriterInfo {
  avatar: Avatar;
  name: string;
  generation: number;
  part: string;
}

export interface ApiDtail {
  postId: number;
  title: string;
  createdDate: string;
  content: string;
  tagNameList: string[];
  viewCount: number;
  likeCount: number;
  scrapCount: number;
  writerInfo: WriterInfo;
}

export interface DetailResponse {
  data: ApiDtail;
}
