import { useMutation } from "@tanstack/react-query";
import { postPost } from "../api/post/post";
import { PostPostsProps } from "../types/post";

const usePost = () => {
  return useMutation({
    mutationFn: (data: PostPostsProps) => postPost(data),
  });
};

export default usePost;
