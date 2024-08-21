import React, { useState } from "react";
import AddTagButton from "../../components/postPage/AddTagButton";
import AutoTextArea from "../../components/postPage/AutoTextArea";
import "../../style/postPage/postPage.css";
import TagInput from "../../components/postPage/TagInput";
import PostNav from "../../components/postPage/PostNav";
import { hasDuplicateTags, isDuplicateTag } from "../../util/isDuplicateTag";
import { useNavigate, useSearchParams } from "react-router-dom";
import usePost from "../../hooks/post/usePost";
import { SaveModalSvg } from "../../assets";
import usePostTemps from "../../hooks/post/usePostTemps";
import { useGetTemps } from "../../hooks/post/useGetTemps";
import { useGetDetails } from "../../hooks/useGetDetail";
import api from "../../api";

const PostPage = () => {
  const [title, setTitle] = useState<string>("");
  const [text, setText] = useState<string>("");
  const [tags, setTags] = useState<string[]>([""]);
  const [isModalOpel, setIsModal] = useState<boolean>(false);

  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const selectedId = searchParams.get("id");

  const handleSuccess = () => {
    navigate(`/`);
  };

  const handleSaveSuccess = () => {
    setIsModal(true);

    setTimeout(() => {
      setIsModal(false);
    }, 2000); // 2000ms = 2초
  };

  const handleError = (error: unknown) => {
    alert((error as any)?.message || "게시물 작성 중 오류가 발생했습니다.");
  };

  const { mutate: submitPost } = usePost(handleSuccess, handleError);
  const { mutate: savePost } = usePostTemps(handleSaveSuccess, handleError);

  // const { data: detailData } = useGetDetails(
  //   selectedId ? Number(searchParams.get("id")) : 1
  // );

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

  const handleSubmitPost = () => {
    submitPost({ title, content: text, tagNameList: tags });
  };

  const handleSaveTemp = async () => {
    await savePost({ title, content: text, tagNameList: tags });
  };

  const handleSetTemp = async () => {
    const response = await api.get(`/posts/temps/details/${selectedId}`);
    setTitle(response.data.data.title);
    setText(response.data.data.content);
    setTags(response.data.data.tagNameList);
  };

  return (
    <>
      <PostNav
        onClick={handleSubmitPost}
        onSave={handleSaveTemp}
        isClear={hasDuplicateTags(tags)}
        setTemp={handleSetTemp}
      />
      <div className="saveModal"> {isModalOpel && <SaveModalSvg />}</div>
      <div className="postContainer">
        <input
          type="text"
          placeholder="제목을 입력하세요"
          className="inputBox"
          onChange={handleTitleChange}
          value={title}
        />

        <AutoTextArea onChange={handleContentChange} value={text} />
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
