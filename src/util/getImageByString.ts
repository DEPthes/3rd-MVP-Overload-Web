import body1 from "../assets/avatar/body1.svg";
import body2 from "../assets/avatar/body2.svg";
import body3 from "../assets/avatar/body3.svg";
import eyes1 from "../assets/avatar/eyes1.svg";
import eyes2 from "../assets/avatar/eyes2.svg";
import eyes3 from "../assets/avatar/eyes3.svg";
import eyes4 from "../assets/avatar/eyes4.svg";
import eyes5 from "../assets/avatar/eyes5.svg";
import eyes6 from "../assets/avatar/eyes6.svg";
import eyes7 from "../assets/avatar/eyes7.svg";
import eyes8 from "../assets/avatar/eyes8.svg";
import face1 from "../assets/avatar/face1.svg";
import face2 from "../assets/avatar/face2.svg";
import face3 from "../assets/avatar/face3.svg";
import face4 from "../assets/avatar/face4.svg";
import mouth1 from "../assets/avatar/mouth1.svg";
import mouth2 from "../assets/avatar/mouth2.svg";
import mouth3 from "../assets/avatar/mouth3.svg";
import mouth4 from "../assets/avatar/mouth4.svg";
import mouth5 from "../assets/avatar/mouth5.svg";
import mouth6 from "../assets/avatar/mouth6.svg";
import mouth7 from "../assets/avatar/mouth7.svg";
import mouth8 from "../assets/avatar/mouth8.svg";
import mouth9 from "../assets/avatar/mouth9.svg";
import nose1 from "../assets/avatar/nose1.svg";
import nose2 from "../assets/avatar/nose2.svg";
import nose3 from "../assets/avatar/nose3.svg";
import nose4 from "../assets/avatar/nose4.svg";
import nose5 from "../assets/avatar/nose5.svg";
import nose6 from "../assets/avatar/nose6.svg";
import nose7 from "../assets/avatar/nose7.svg";
import nose8 from "../assets/avatar/nose8.svg";

// 이미지 리스트 맵핑
const imageMap: { [key: string]: string } = {
  body1: body1,
  body2: body2,
  body3: body3,
  eyes1: eyes1,
  eyes2: eyes2,
  eyes3: eyes3,
  eyes4: eyes4,
  eyes5: eyes5,
  eyes6: eyes6,
  eyes7: eyes7,
  eyes8: eyes8,
  face1: face1,
  face2: face2,
  face3: face3,
  face4: face4,
  mouth1: mouth1,
  mouth2: mouth2,
  mouth3: mouth3,
  mouth4: mouth4,
  mouth5: mouth5,
  mouth6: mouth6,
  mouth7: mouth7,
  mouth8: mouth8,
  mouth9: mouth9,
  nose1: nose1,
  nose2: nose2,
  nose3: nose3,
  nose4: nose4,
  nose5: nose5,
  nose6: nose6,
  nose7: nose7,
  nose8: nose8,
};

// 문자열에 대응하는 이미지를 반환하는 함수
export function getImageByString(
  imageString: string | undefined
): string | undefined {
  // 입력된 문자열에서 키워드를 추출
  const key = Object.keys(imageMap).find((k) => imageString?.includes(k));

  // 키워드에 해당하는 이미지 반환
  return key ? imageMap[key] : undefined;
}
