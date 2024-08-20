import "../style/mycomment.css";
import noncheck from "../images/squareCheckboxEmpty.png";
import check from "../images/squareCheckbox.png";
import defaultProfile from "../images/rectangleDefaultProfile.png";
import { useEffect, useState } from "react";
import api from "../api";
import { Navigate } from "react-router-dom";
import AvatarComponent from "./avatarPage/AvatarComponent";

type Avatar = {
  avatarFace?: string;
  avatarBody?: string;
  avatarEyes?: string;
  avatarNose?: string;
  avatarMouth?: string;
};

type MyComment = {
  commentId?: number;
  profile?: Avatar;
  name: string;
  postId: number;
  parentPostId?: number;
  refreshComments?: () => void; // 댓글 새로 고침 함수
};

const MyComment: React.FC<MyComment> = (props) => {
  const [selectedBox, setSelectedBox] = useState<boolean>();
  const [commentText, setCommentText] = useState<string>("");
  const [nickname, setNickname] = useState<string>();
  const [isToken, setIsToken] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token")
      ? localStorage.getItem("token")
      : sessionStorage.getItem("token");
    if (token != null) {
      setIsToken(true);
      setSelectedBox(false);
    } else {
      setSelectedBox(true);
    }
  }, [props.postId]);

  const handleBoxClick = () => {
    setSelectedBox(!selectedBox);
  };

  const handleNicknameChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNickname(e.target.value);
  };

  const handleCommentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCommentText(e.target.value);
  };

  const handleSubmit = async () => {
    try {
      await api.post(`/comments`, {
        parentCommentId: props.commentId ? props.commentId : null,
        postId: props.postId,
        content: commentText,
        useNicknameChecked: selectedBox,
        nickname: selectedBox ? nickname : props.name,
      });
      // 댓글 제출 후 textarea 초기화
      setCommentText("");
      setNickname("");
      setSelectedBox(false);
      // 댓글 새로 고침 함수 호출
      if (props.refreshComments) {
        props.refreshComments();
      }
    } catch (error) {
      console.error("댓글 제출 중 오류 발생:", error);
      console.log(props.postId, commentText, selectedBox, nickname, props.name);
    }
  };

  return (
    <>
      {
        //isToken
        <div className="mycomment-total">
          <textarea
            className="mycomment-writebox"
            placeholder="댓글은 수정 및 삭제할 수 없어요."
            value={commentText}
            onChange={handleCommentChange}
          ></textarea>
          <div className="mycomment-writerinfo">
            {props.profile ? (
              <div>
                <AvatarComponent
                  height="112px"
                  width="112px"
                  face={props.profile.avatarFace}
                  body={props.profile.avatarBody}
                  eyes={props.profile.avatarEyes}
                  nose={props.profile.avatarNose}
                  mouth={props.profile.avatarMouth}
                />
              </div>
            ) : (
              <img
                className="profile-icon"
                src={defaultProfile}
                style={{ marginLeft: "19px" }}
              />
            )}
            <div className="mycomment-writerinfo-nickname">
              {selectedBox ? (
                <textarea
                  placeholder="이름"
                  value={nickname}
                  onChange={handleNicknameChange}
                ></textarea>
              ) : (
                <textarea readOnly placeholder={props.name}></textarea>
              )}
              <div className="mycomment-nickname">
                {isToken ? (
                  <button
                    className="mycomment-checkbox"
                    onClick={handleBoxClick}
                  >
                    <img src={selectedBox ? check : noncheck} />
                  </button>
                ) : (
                  <button className="mycomment-checkbox">
                    <img src={check} />
                  </button>
                )}
                <p>닉네임 사용</p>
              </div>
            </div>
            {isToken ? (
              selectedBox ? (
                <button
                  className={`mycomment-button ${
                    commentText && nickname ? "active" : ""
                  }`}
                  disabled={!commentText}
                  onClick={handleSubmit}
                >
                  댓글 남기기
                </button>
              ) : (
                <button
                  className={`mycomment-button ${commentText ? "active" : ""}`}
                  disabled={!commentText}
                  onClick={handleSubmit}
                >
                  댓글 남기기
                </button>
              )
            ) : (
              <button
                className={`mycomment-button ${
                  commentText && nickname ? "active" : ""
                }`}
                disabled={!commentText}
                onClick={handleSubmit}
              >
                댓글 남기기
              </button>
            )}
          </div>
        </div>
      }
    </>
  );
};

export default MyComment;
