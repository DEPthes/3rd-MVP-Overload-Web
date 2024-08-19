
import "../style/mycomment.css";
import noncheck from "../images/squareCheckboxEmpty.png";
import check from "../images/squareCheckbox.png";
import defaultProfile from "../images/rectangleDefaultProfile.png";
import { useEffect, useState } from "react";
import api from "../api";

type Avatar = {
    avatarFace?: string;
    avatarBody?: string;
    avatarEyes?: string;
    avatarNose?: string;
    avatarMouth?: string;
};

type MyCommentProps = {
    commentId?: number;
    profile?: Avatar; // 수정된 타입
    name: string;
    postId: number;
    parentPostId?: number;
    refreshComments?: () => void; // 댓글 새로 고침 함수
};

const MyComment: React.FC<MyCommentProps> = (props) => {
    const [selectedBox, setSelectedBox] = useState<boolean>(false);
    const [commentText, setCommentText] = useState<string>("");
    const [nickname, setNickname] = useState<string>(props.name);
    const [isToken, setIsToken] = useState(false);

    useEffect(() => {
        const token = sessionStorage.getItem("token");
        if (token != null) {
            setIsToken(true);
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
            // 페이지 새로 고침
            window.location.reload();
        } catch (error) {
            console.error("댓글 제출 중 오류 발생:", error);
            console.log(props.commentId, props.postId, commentText, selectedBox, props.name)
        }
    };

    return (
        <>
            {isToken ? (//isToken
                <div className="mycomment-total">
                    <textarea
                        className="mycomment-writebox"
                        placeholder="댓글은 수정 및 삭제할 수 없어요."
                        value={commentText}
                        onChange={handleCommentChange}
                    ></textarea>
                    <div className="mycomment-writerinfo">
                        {props.profile && (
                            <div>
                                {props.profile.avatarFace ? (
                                    <img className="mycomment-avatar-face" src={props.profile.avatarFace} alt="Avatar Face" />
                                ) : (
                                    <img className="default-profile" src={defaultProfile} alt="Default Profile" />
                                )}
                                {props.profile.avatarBody && (
                                    <img className="mycomment-avatar-body" src={props.profile.avatarBody} alt="Avatar Body" />
                                )}
                                {props.profile.avatarEyes && (
                                    <img className="mycomment-avatar-eyes" src={props.profile.avatarEyes} alt="Avatar Eyes" />
                                )}
                                {props.profile.avatarNose && (
                                    <img className="mycomment-avatar-nose" src={props.profile.avatarNose} alt="Avatar Nose" />
                                )}
                                {props.profile.avatarMouth && (
                                    <img className="mycomment-avatar-mouth" src={props.profile.avatarMouth} alt="Avatar Mouth" />
                                )}
                            </div>
                        )}
                        <div className="mycomment-writerinfo-nickname">
                            <textarea
                                placeholder="이름"
                                value={nickname}
                                onChange={handleNicknameChange}
                            ></textarea>
                            <div className="mycomment-nickname">
                                <button
                                    className="mycomment-checkbox"
                                    onClick={handleBoxClick}
                                >
                                    <img src={selectedBox ? check : noncheck} alt="체크박스"/>
                                </button>
                                <p>닉네임 사용</p>
                            </div>
                        </div>
                        <button
                            className={`mycomment-button ${commentText ? 'active' : ''}`}
                            disabled={!commentText}
                            onClick={handleSubmit}
                        >
                            댓글 남기기
                        </button>
                    </div>
                </div>
            ) : null}
        </>
    );
};

export default MyComment;
