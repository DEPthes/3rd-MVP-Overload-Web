import api from ".";
import { AvatarApiProps, AvatarResponse } from "../types/avatar";

export async function putAvatar({
  avatarFace,
  avatarBody,
  avatarEyes,
  avatarNose,
  avatarMouth,
}: AvatarApiProps): Promise<AvatarResponse> {
  const response = await api.put("/members", {
    avatarFace,
    avatarBody,
    avatarEyes,
    avatarNose,
    avatarMouth,
  });
  return response?.data;
}
