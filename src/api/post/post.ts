import api from "../index";
import { PostPostsProps, PostResponse } from "../../types/post";
import { TempsResponse } from "../../types/temps";

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

export async function postTemps({
  title,
  content,
  tagNameList,
}: PostPostsProps): Promise<PostResponse> {
  const response = await api.post("/posts/temps", {
    title,
    content,
    tagNameList,
  });
  return response?.data;
}

export async function getTemps(): Promise<TempsResponse> {
  const response = await api.get("/posts/temps");
  return response?.data;
}
