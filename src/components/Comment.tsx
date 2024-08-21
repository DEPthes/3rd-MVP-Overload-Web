import React, { useEffect, useState } from "react";
import doComment from "../images/doComment.png";
import undoComment from "../images/undoComment.png";
import MyComment from "../components/MyComment";
import recDefaultProfile from "../images/rectangleDefaultProfile.png";
import "../style/comment.css";

import body1 from "../assets/avatar/body1.svg";
import body2 from "../assets/avatar/body2.svg";
import body3 from "../assets/avatar/body3.svg";
import eyes1 from "../assets/avatar/eyes1.svg";
import eyes2 from "../assets/avatar/eyes2.svg";
import eyes3 from "../assets/avatar/eyes3.svg";
import eyes4 from "../assets/avatar/eyes4.svg";
import eyes5 from "../assets/avatar/eyes5.svg";
import eyes6 from "../assets/avatar/eyes6.svg";
import eyes7 from "../assets/avatar/eyes7.svg";
import eyes8 from "../assets/avatar/eyes8.svg";
import face1 from "../assets/avatar/face1.svg";
import face2 from "../assets/avatar/face2.svg";
import face3 from "../assets/avatar/face3.svg";
import face4 from "../assets/avatar/face4.svg";
import mouth1 from "../assets/avatar/mouth1.svg";
import mouth2 from "../assets/avatar/mouth2.svg";
import mouth3 from "../assets/avatar/mouth3.svg";
import mouth4 from "../assets/avatar/mouth4.svg";
import mouth5 from "../assets/avatar/mouth5.svg";
import mouth6 from "../assets/avatar/mouth6.svg";
import mouth7 from "../assets/avatar/mouth7.svg";
import mouth8 from "../assets/avatar/mouth8.svg";
import mouth9 from "../assets/avatar/mouth9.svg";
import nose1 from "../assets/avatar/nose1.svg";
import nose2 from "../assets/avatar/nose2.svg";
import nose3 from "../assets/avatar/nose3.svg";
import nose4 from "../assets/avatar/nose4.svg";
import nose5 from "../assets/avatar/nose5.svg";
import nose6 from "../assets/avatar/nose6.svg";
import nose7 from "../assets/avatar/nose7.svg";
import nose8 from "../assets/avatar/nose8.svg";
import api from "../api";
import AvatarComponent from "./avatarPage/AvatarComponent";

// 이미지 매핑 객체
const avatarImages: any = {
  body1,
  body2,
  body3,
  eyes1,
  eyes2,
  eyes3,
  eyes4,
  eyes5,
  eyes6,
  eyes7,
  eyes8,
  face1,
  face2,
  face3,
  face4,
  mouth1,
  mouth2,
  mouth3,
  mouth4,
  mouth5,
  mouth6,
  mouth7,
  mouth8,
  mouth9,
  nose1,
  nose2,
  nose3,
  nose4,
  nose5,
  nose6,
  nose7,
  nose8,
};

type Avatar = {
  avatarFace?: string;
  avatarBody?: string;
  avatarEyes?: string;
  avatarNose?: string;
  avatarMouth?: string;
};

type CommentProps = {
  comments?: any[]; // 전체 댓글 리스트
  myProfile?: Avatar;
  myName: string;
  postId: number;
  refreshComments: () => void;
};

const Comment: React.FC<CommentProps> = (props) => {
  const [replyVisible, setReplyVisible] = useState<{ [key: number]: boolean }>(
    {}
  );

  const handleDoCommentClick = (commentId: number) => {
    setReplyVisible((prev) => ({
      ...prev,
      [commentId]: !prev[commentId],
    }));
  };
console.log(props.comments);
  return (
    <>
      {/* 댓글 배열을 정순으로 정렬 */}
      {props.comments &&
        props.comments.slice().map((comment, index) => (
          <li key={index}>
            <div className="comment-total">
              <div className="comment-top">
                <div>
                  {comment.avatar.avatarFace !== null ? (
                    <div style={{ marginRight: "20px" }}>
                      <AvatarComponent
                        height="112px"
                        width="112px"
                        face={comment.avatar.avatarFace}
                        body={comment.avatar.avatarBody}
                        eyes={comment.avatar.avatarEyes}
                        nose={comment.avatar.avatarNose}
                        mouth={comment.avatar.avatarMouth}
                      />
                    </div>
                  ) : (
                    <img
                      className="profile-icon"
                      src={recDefaultProfile}
                      style={{
                        width: "112px",
                        height: "112px",
                        marginRight: "20px",
                      }}
                    />
                  )}
                </div>
                <div className="comment-header">
                  <p className="comment-nickname">{comment.nickname}</p>
                  <p className="comment-date">{comment.createdDate}</p>
                </div>
              </div>
              <div className="comment-body">
                <p>{comment.content}</p>
              </div>
              <button
                onClick={() => handleDoCommentClick(comment.commentId)}
                className="comment-actions"
              >
                <img
                  src={
                    replyVisible[comment.commentId] ? undoComment : doComment
                  }
                  alt="toggle comment"
                />
              </button>
              <hr
                className={`comment-hr ${
                  replyVisible[comment.commentId] ? "active" : ""
                }`}
              />

              {/* 대댓글 표시 */}
              {replyVisible[comment.commentId] && (
                <div className="comment-total active">
                  {/* 댓글이 있을 때만 대댓글 표시 */}
                  {comment.replyList &&
                    comment.replyList.length > 0 &&
                    comment.replyList
                      .slice()
                      .map((reply: any, replyIndex: number) => (
                        <div key={replyIndex}>
                          <div className="comment-top">
                            <div>
                              {reply.avatar.avatarFace ? (
                                <div style={{ marginRight: "20px" }}>
                                  <AvatarComponent
                                    height="112px"
                                    width="112px"
                                    face={reply.avatar.avatarFace}
                                    body={reply.avatar.avatarBody}
                                    eyes={reply.avatar.avatarEyes}
                                    nose={reply.avatar.avatarNose}
                                    mouth={reply.avatar.avatarMouth}
                                  />
                                </div>
                              ) : (
                                <img
                                  className="profile-icon"
                                  src={recDefaultProfile}
                                  style={{
                                    width: "112px",
                                    height: "112px",
                                    marginRight: "20px",
                                  }}
                                />
                              )}
                            </div>
                            <div className="comment-header">
                              <p className="comment-nickname">
                                {reply.nickname}
                              </p>
                              <p className="comment-date">
                                {reply.createdDate}
                              </p>
                            </div>
                          </div>
                          <div className="comment-body">
                            <p>{reply.content}</p>
                          </div>
                        </div>
                      ))}
                  {/* 대댓글이 없어도 MyComment 컴포넌트는 표시 */}
                  <MyComment
                    commentId={comment.commentId}
                    profile={props.myProfile}
                    name={props.myName}
                    postId={props.postId}
                    parentPostId={comment.commentId}
                    refreshComments={props.refreshComments}
                  />
                </div>
              )}
            </div>
          </li>
        ))}
    </>
  );
};

export default Comment;
