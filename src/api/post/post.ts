import api from "../index";
import { PostPostsProps, PostResponse } from "../../types/post";

export async function postPost({
  title,
  content,
  tagNameList,
}: PostPostsProps): Promise<PostResponse> {
  const response = await api.post("/posts", {
    title,
    content,
    tagNameList,
  });
  return response?.data;
}
