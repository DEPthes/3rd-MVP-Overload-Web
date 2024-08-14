import React from "react";
import "../../style/component/tagComponent.css";

interface AddTagButtonProps {
  onClick: () => void;
}

const AddTagButton: React.FC<AddTagButtonProps> = ({ onClick }) => {
  return (
    <button className="addButton" onClick={onClick}>
      + 추가하기
    </button>
  );
};

export default AddTagButton;
