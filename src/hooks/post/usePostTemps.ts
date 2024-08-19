import { useMutation } from "@tanstack/react-query";
import { PostPostsProps } from "../../types/post";
import { postTemps } from "../../api/post/post";

const usePostTemps = (
  onSuccessCallback: () => void,
  onErrorCallback: (error: unknown) => void
) => {
  return useMutation({
    mutationFn: (data: PostPostsProps) => postTemps(data),
    onSuccess: () => {
      onSuccessCallback();
    },
    onError: (error: unknown) => {
      onErrorCallback(error);
    },
  });
};

export default usePostTemps;
