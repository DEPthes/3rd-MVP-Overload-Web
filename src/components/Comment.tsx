
import React, { useState } from "react";
import doComment from "../images/doComment.png";
import undoComment from "../images/undoComment.png";
import MyComment from "../components/MyComment";
import defaultProfile from "../images/rectangleDefaultProfile.png";
import "../style/comment.css";

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
};

const Comment: React.FC<CommentProps> = ({ comments, myProfile, myName, postId }) => {
    const [replyVisible, setReplyVisible] = useState<{ [key: number]: boolean }>({});

    const handleDoCommentClick = (commentId: number) => {
        setReplyVisible(prev => ({
            ...prev,
            [commentId]: !prev[commentId]
        }));
    };

    return (
        <>
            {/* 댓글 배열을 역순으로 정렬 */}
            {comments && comments.slice().reverse().map((comment, index) => (
                <li key={index}>
                    <div className="comment-total">
                        <div className="comment-top">
                            <div>
                                {comment.avatar.avatarFace ? 
                                    <img className="comment-profile" src={comment.avatar.avatarFace}/> : 
                                    <img className="default-profile" src={defaultProfile}/>}
                            </div>
                            <div className="comment-header">
                                <p className="comment-nickname">{comment.nickname}</p>
                                <p className="comment-date">{comment.createdDate}</p>
                            </div>
                        </div>
                        <div className="comment-body">
                            <p>{comment.content}</p>
                        </div>
                        <button onClick={() => handleDoCommentClick(comment.commentId)} className="comment-actions">
                            <img src={replyVisible[comment.commentId] ? undoComment : doComment} alt="toggle comment" />
                        </button>
                        <hr className={`comment-hr ${replyVisible[comment.commentId] ? 'active' : ''}`} />

                        {/* 대댓글 표시 */}
                        {replyVisible[comment.commentId] && (
                            <div className="comment-total active">
                                {/* 댓글이 있을 때만 대댓글 표시 */}
                                {comment.replyList && comment.replyList.length > 0 && (
                                    comment.replyList.slice().reverse().map((reply: any, replyIndex: number) => (
                                        <div key={replyIndex}>
                                            <div className="comment-top">
                                                <div>
                                                    {reply.avatar.avatarFace ? 
                                                        <img className="comment-profile" src={reply.avatar.avatarFace} alt="profile" /> : 
                                                        <img className="default-profile" src={defaultProfile} alt="default profile" />}
                                                </div>
                                                <div className="comment-header">
                                                    <p className="comment-nickname">{reply.nickname}</p>
                                                    <p className="comment-date">{reply.createdDate}</p>
                                                </div>
                                            </div>
                                            <div className="comment-body">
                                                <p>{reply.content}</p>
                                            </div>
                                        </div>
                                    ))
                                )}
                                {/* 대댓글이 없어도 MyComment 컴포넌트는 표시 */}
                                <MyComment
                                    commentId={comment.commentId}
                                    profile={myProfile}
                                    name={myName}
                                    postId={postId}
                                    parentPostId={comment.commentId}
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
