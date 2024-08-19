import { useMutation } from "@tanstack/react-query";
import { PostPostsProps } from "../../types/post";
import { postPost } from "../../api/post/post";

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
