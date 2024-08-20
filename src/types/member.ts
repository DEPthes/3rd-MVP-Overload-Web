type Avatar = {
  avatarFace: string;
  avatarBody: string;
  avatarEyes: string;
  avatarNose: string;
  avatarMouth: string;
};

type Member = {
  memberId: number;
  avatar: Avatar;
  memberName: string;
  part: string;
  email: string;
};

export interface MemberResponse {
  data: Member;
}
