import { DUPLICATETAGCOMMENT } from "../../constants/postPage";
import "../../style/postPage/tagInput.css";
import { InputProps } from "../../types/post";

const TagInput = ({ value, onChange, isDuplicate }: InputProps) => {
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
