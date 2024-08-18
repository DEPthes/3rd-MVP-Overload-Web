export interface InputProps {
  value?: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  isDuplicate?: boolean;
}

export interface InputAreaProps {
  onChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

export interface PostPostsProps {
  title: string;
  content: string;
  tagNameList: string[];
}

export interface PostResponse {
  message: string;
}
