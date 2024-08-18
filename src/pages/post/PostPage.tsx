import React, { useState } from "react";
import AddTagButton from "../../components/postPage/AddTagButton";
import AutoTextArea from "../../components/postPage/AutoTextArea";
import "../../style/postPage/postPage.css";
import TagInput from "../../components/postPage/TagInput";
import PostNav from "../../components/postPage/PostNav";
import { isDuplicateTag } from "../../util/isDuplicateTag";
import usePost from "../../hooks/usePost";
import { useNavigate } from "react-router-dom";

const PostPage = () => {
  const [title, setTitle] = useState<string>("");
  const [text, setText] = useState<string>("");
  const [tags, setTags] = useState<string[]>([""]);
  const navigate = useNavigate();

  const { mutate: submitPost, isError, isSuccess, error } = usePost();

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  const handleContentChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setText(event.target.value);
  };

  const handleTagChange = (
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

  const handleSubmitPost = async () => {
    try {
      await submitPost({ title, content: text, tagNameList: tags });
      // Wait for the submission to complete and then navigate
      if (isSuccess) {
        navigate(`/`);
      }
    } catch (err) {
      alert(error?.message || "An error occurred while posting.");
    }
  };

  return (
    <>
      <PostNav onClick={handleSubmitPost} />
      <div className="postContainer">
        <input
          type="text"
          placeholder="제목을 입력하세요"
          className="inputBox"
          onChange={handleTitleChange}
        />
        <AutoTextArea onChange={handleContentChange} />
        <div className="tagContainer">
          {tags.map((tag, index) => (
            <TagInput
              key={index}
              value={tag}
              onChange={(event) => handleTagChange(index, event)}
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
