import { useMutation } from "@tanstack/react-query";
import { postPost } from "../api/post/post";
import { PostPostsProps } from "../types/post";

const usePost = (
  onSuccessCallback: () => void,
  onErrorCallback: (error: unknown) => void
) => {
  return useMutation({
    mutationFn: (data: PostPostsProps) => postPost(data),
    onSuccess: () => {
      onSuccessCallback();
    },
    onError: (error: unknown) => {
      onErrorCallback(error);
    },
  });
};

export default usePost;
