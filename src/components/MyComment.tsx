
import "../style/mycomment.css";
import noncheck from "../images/squareCheckboxEmpty.png";
import check from "../images/squareCheckbox.png";
import defaultProfile from "../images/rectangleDefaultProfile.png";
import { useEffect, useState } from "react";
import api from "../api";

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
import { Navigate } from "react-router-dom";

// 이미지 매핑 객체
const avatarImages:any = {
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
    const [nickname, setNickname] = useState<string>(props.name);
    const [isToken, setIsToken] = useState(false);

    useEffect(() => {
        const token = sessionStorage.getItem("token");
        if (token != null) {
            setIsToken(true);
            setSelectedBox(false);
        }else{
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
            console.log(props.postId, commentText, selectedBox, nickname, props.name)
        }
    };

    return (
        <>
            {(//isToken
                <div className="mycomment-total">
                    <textarea
                        className="mycomment-writebox"
                        placeholder="댓글은 수정 및 삭제할 수 없어요."
                        value={commentText}
                        onChange={handleCommentChange}
                    ></textarea>
                    <div className="mycomment-writerinfo">
                        {props.profile && (
                            <div className='mycomment-avatar'>
                            {props.profile.avatarFace ? (
                                <img className="mycomment-avatar-img" src={avatarImages[props.profile.avatarFace]} />
                            ) 
                            : (
                                <img src={defaultProfile} className="mycomment-default-profile"/>
                            )}
                            {props.profile.avatarBody && (
                                <img className="mycomment-avatar-img" src={avatarImages[props.profile.avatarBody]} />
                            )}
                            {props.profile.avatarEyes && (
                                <img className="mycomment-avatar-img" src={avatarImages[props.profile.avatarEyes]} />
                            )}
                            {props.profile.avatarNose && (
                                <img className="mycomment-avatar-img" src={avatarImages[props.profile.avatarNose]} />
                            )}
                            {props.profile.avatarMouth && (
                                <img className="mycomment-avatar-img" src={avatarImages[props.profile.avatarMouth]} />
                            )}
                            </div>
                        )}
                        <div className="mycomment-writerinfo-nickname">
                            <textarea
                                placeholder='이름'
                                value={nickname}
                                onChange={handleNicknameChange}
                            ></textarea>
                            <div className="mycomment-nickname">
                                {isToken?
                                <button
                                    className="mycomment-checkbox"
                                    onClick={handleBoxClick}
                                >
                                    <img src={selectedBox ? check : noncheck}/>
                                </button>
                                :
                                <button className="mycomment-checkbox">
                                    <img src={check}/>
                                </button>
                                }
                                <p>닉네임 사용</p>
                            </div>
                        </div>
                        {isToken?
                        <button
                            className={`mycomment-button ${commentText ? 'active' : ''}`}
                            disabled={!commentText}
                            onClick={handleSubmit}
                        >
                            댓글 남기기
                        </button>
                        :
                        <button
                            className={`mycomment-button ${commentText && nickname ? 'active' : ''}`}
                            disabled={!commentText}
                            onClick={handleSubmit}
                        >
                            댓글 남기기
                        </button>
                        }
                    </div>
                </div>
            ) }
        </>
    );
};

export default MyComment;
