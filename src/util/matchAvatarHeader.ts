import { AVATARHEADER } from "./../constants/avatar/index";

/** 아바타 페이지 해더 문구들을 AVATARANIMALLIST의 key들로 바꿔주는 함수 */
const matchAvatarHeader = (props: (typeof AVATARHEADER)[number]) => {
  switch (props) {
    case "동물":
      return "face";
    case "몸":
      return "body";

    case "눈":
      return "eyes";

    case "코":
      return "nose";

    case "입":
      return "mouth";
    default:
      return "No value found";
  }
};

export default matchAvatarHeader;
