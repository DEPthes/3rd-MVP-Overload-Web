import "../../style/postPage/savePost.css";
import { ChangeEvent, useState } from "react";

const SavePost = ({
  id,
  title,
  date,
  setSelectedId,
}: {
  id: string;
  title: string;
  date: string;
  setSelectedId: (selectedId: string) => void;
}) => {
  const handleRadioChange = (event: ChangeEvent<HTMLInputElement>) => {
    // 선택된 radio button의 id를 가져옴
    setSelectedId(event.target.id);
    // const temp = {
    //   id: Number(selectedId),
    //   title: title,
    //   createdDate: date,
    //   content: detailData.data.content,
    // };
    // setSaveTemp(temp);
  };

  return (
    <div className="savePostMainContainer">
      <div className="leftContainer">
        <input
          className="radioButton"
          type="radio"
          id={id}
          name="select"
          onChange={handleRadioChange} // 선택 상태 변경 처리
        />
        <span className="title">{title}</span>
      </div>
      <div className="rightContainer">
        <span className="date">{date}</span>
      </div>
    </div>
  );
};

export default SavePost;
