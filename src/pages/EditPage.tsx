import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AddTagButton from "../components/postPage/AddTagButton";
import AutoTextArea from "../components/postPage/AutoTextArea";
import "../style/postPage/postPage.css";
import TagInput from "../components/postPage/TagInput";
import PostNav from "../components/postPage/PostNav";
import { hasDuplicateTags, isDuplicateTag } from "../util/isDuplicateTag";
import api from "../api";

const EditPage = () => {
  const { postId } = useParams<{ postId: string }>();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const navigate = useNavigate();
  const [isToken, setIsToken] = useState<boolean>(false);
  const [token, setToken] = useState<string | null>(null);

  const [post, setPost] = useState<any | null>(null); // 기존 게시글 데이터를 저장하는 상태
  const [title, setTitle] = useState<string>(""); // 제목 상태
  const [text, setText] = useState<string>(""); // 본문 내용 상태
  const [tags, setTags] = useState<string[]>([""]); // 태그 상태

  const numericPostId = Number(postId);

  // 페이지 로드 시 토큰 설정 및 게시글 데이터 불러오기
  useEffect(() => {
    const storedToken = localStorage.getItem("token") || sessionStorage.getItem("token");
    if (storedToken) {
      setIsToken(true);
      setToken(storedToken);
    }

    // 게시글 상세 정보를 가져와서 상태에 저장
    api.get(`posts/details/${numericPostId}`, {
      headers: {
        Authorization: `Bearer ${storedToken}`,
      },
    })
      .then((response) => {
        const data = response.data.data;
        setPost(data);
        setTitle(data.title); // 제목 설정
        setText(data.content); // 본문 내용 설정
        setTags(data.tagNameList); // 태그 설정

        console.log(data.content);
      })
      .catch((error) => {
        console.error("게시글 데이터 가져오기 오류:", error);
      });
  }, [numericPostId]);


  const handleSubmitPost = async () => {
      try {
        if(isToken){
          await api.put(`/posts/edits/${numericPostId}`, {title: title, content: text, tagNameList:tags}, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          navigate("/");
        } 
      }catch (error) {
        console.error("게시글 삭제 중 오류가 발생했습니다.", error);
      }

  };

  // 임시 저장 (템프)
  const handleSaveTemp = () => {
    setIsModalOpen(true);
    // 저장 로직을 추가하거나 임시 저장을 위해 별도의 API 호출을 구현할 수 있습니다.
  };

  // 태그 추가 로직
  const handleTagChange = (index: number, event: React.ChangeEvent<HTMLInputElement>) => {
    const newTags = [...tags];
    newTags[index] = event.target.value;
    setTags(newTags);
  };

  const handleAddTag = () => {
    setTags([...tags, ""]);
  };

  return (
    <>
      <PostNav
        onClick={handleSubmitPost} // 게시글 제출 버튼 클릭 시 handleSubmitPost 호출
        onSave={handleSaveTemp} // 임시 저장 버튼 클릭 시 handleSaveTemp 호출
        isClear={hasDuplicateTags(tags)} // 중복 태그가 있는지 확인
      />
      {isModalOpen && <div className="saveModal">임시 저장되었습니다.</div>} {/* 임시 저장 모달 */}
      <div className="postContainer">
        <input
          type="text"
          placeholder="제목을 입력하세요"
          value={title} // 제목 상태 바인딩
          className="inputBox"
          onChange={(e) => setTitle(e.target.value)} // 제목 변경 시 상태 업데이트
        />

        <AutoTextArea
          value={text} // 본문 내용 상태 바인딩
          onChange={(e) => setText(e.target.value)} // 본문 내용 변경 시 상태 업데이트
        />

        <div className="tagContainer">
          {tags.map((tag, index) => (
            <TagInput
              key={index}
              value={tag} // 태그 상태 바인딩
              onChange={(event) => handleTagChange(index, event)} // 태그 변경 시 상태 업데이트
              isDuplicate={isDuplicateTag(tags, tag, index)} // 중복 태그 여부 확인
            />
          ))}
          <AddTagButton onClick={handleAddTag} /> {/* 태그 추가 버튼 */}
        </div>
      </div>
    </>
  );
};

export default EditPage;
