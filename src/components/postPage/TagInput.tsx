import { DUPLICATETAGCOMMENT } from "../../constants/postPage";
import "../../style/postPage/tagInput.css";

interface TagInputProps {
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  isDuplicate: boolean;
}

const TagInput = ({ value, onChange, isDuplicate }: TagInputProps) => {
  return (
    <div className="tagInputContainer">
      <input
        className="tagInput"
        value={value}
        onChange={onChange}
        placeholder="# Tag"
      />
      {isDuplicate && (
        <span className="duplicateComment">{DUPLICATETAGCOMMENT}</span>
      )}
    </div>
  );
};

export default TagInput;
