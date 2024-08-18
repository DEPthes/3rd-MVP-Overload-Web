
import "../style/mycomment.css"
import noncheck from "../images/squareCheckboxEmpty.png";
import check from "../images/squareCheckbox.png";
import defaultProfile from "../images/defaultProfile.png";
import { useState } from "react";

type myComment = {
    profile: string;
    name: string;
}

const MyComment:React.FC<myComment> = (props) => {
    const [selectedbox, setSelectebox] = useState<boolean>(false);
    const [commentText, setCommentText] = useState<string>("");


    const handleBoxClick = () => {
        setSelectebox(!selectedbox);
    }

    const handleCommentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setCommentText(e.target.value);
    }

    return(
        <>
        <div className="mycomment-total">
            <textarea className="mycomment-writebox" 
                placeholder="댓글은 수정 및 삭제할 수 없어요."
                value={commentText}
                onChange={handleCommentChange}
            >

            </textarea>
            <div className="mycomment-writerinfo">
                {props.profile && (
                    <div className="mycomment-profile">
                        <img src={props.profile?props.profile:defaultProfile}/>
                    </div>
                )}
                <div className="mycomment-writerinfo-nickname">
                    <textarea placeholder="이름"></textarea>
                    <div className="mycomment-nickname">
                        <button className="mycomment-checkbox" onClick={handleBoxClick}>
                            <img src={selectedbox ? check : noncheck}/>
                        </button>
                        <p>닉네임 사용</p>
                    </div>
                </div>
                <button
                    className={`mycomment-button ${commentText ? 'active' : ''}`}
                    disabled={!commentText}
                >
                    댓글 남기기
                </button>
            </div>
            
        </div>
        </>
    );
}

export default MyComment;