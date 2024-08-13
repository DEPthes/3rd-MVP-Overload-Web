import { useState } from "react";
import AddTagButton from "../../components/postPage/AddTagButton";
import AutoTextArea from "../../components/postPage/AutoTextArea";
import "../../style/postPage/postPage.css";
import TagInput from "../../components/postPage/TagInput";
import PostNav from "../../components/postPage/PostNav";
import { isDuplicateTag } from "../../util/isDuplicateTag";

const PostPage = () => {
  const [tags, setTags] = useState<string[]>([""]);

  const handleInputChange = (
    index: number,
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const newTags = [...tags];
    newTags[index] = event.target.value;
    setTags(newTags);
  };

  const handleAddTag = () => {
    setTags([...tags, ""]);
  };

  return (
    <>
      {/* 중복 태그 여부 확인 후 제출 추가 해야됨 */}
      <PostNav />
      <div className="postContainer">
        <input
          type="text"
          placeholder="제목을 입력하세요"
          className="inputBox"
        />
        <AutoTextArea />
        <div className="tagContainer">
          {tags.map((tag, index) => (
            <TagInput
              key={index}
              value={tag}
              onChange={(event) => handleInputChange(index, event)}
              isDuplicate={isDuplicateTag(tags, tag, index)}
            />
          ))}
          <AddTagButton onClick={handleAddTag} />
        </div>
      </div>
    </>
  );
};

export default PostPage;
