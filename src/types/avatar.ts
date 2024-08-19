import { AVATARANIMALLIST } from "../constants/avatar";

type AvatarCategoryImages = typeof AVATARANIMALLIST;
type BodyImage = AvatarCategoryImages["body"][number];
type EyesImage = AvatarCategoryImages["eyes"][number];
type FaceImage = AvatarCategoryImages["face"][number];
type MouthImage = AvatarCategoryImages["mouth"][number];
type NoseImage = AvatarCategoryImages["nose"][number];

export interface AvatarComponentProps {
  width: string;
  height: string;
  face: FaceImage;
  body: BodyImage;
  eyes: EyesImage;
  nose: NoseImage;
  mouth: MouthImage;
}

export type AvatarAnimalListKey = "body" | "eyes" | "face" | "mouth" | "nose";

export interface AvatarAnimalList {
  [key: string]: string[]; // 모든 속성의 값이 string[]인 객체
}
