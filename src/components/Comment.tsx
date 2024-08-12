
import { useState } from "react";

import doComment from "../images/doComment.png";
import undoComment from "../images/undoComment.png";
import MyComment from "../components/MyComment";
import cocomentdummy from "../assets/cocoment-dummydata.json";
import "../style/comment.css";

type comment = {
    id: string;
    profile: string;
    nickname: string;
    date: string;
    comment: string;
    myProfile:string;
    myName:string;
};

const Comment: React.FC<comment> = (props) => {
    const [selectedDoComment, setSelecteDoComment] = useState<boolean>(false);

    const handleDoCommentClick = () => {
        setSelecteDoComment(!selectedDoComment);
    }

    return (
        <div className="comment-total">
            <div className="comment-top">
                <div className="comment-profile">
                    <img src={props.profile} />
                </div>
                <div className="comment-header">
                    <p className="comment-nickname">{props.nickname}</p>
                    <p className="comment-date">{props.date}</p>
                </div>
            </div>
            <div className="comment-body">
                <p>{props.comment}</p>
            </div>
            <button onClick={handleDoCommentClick} className="comment-actions">
                <img src={selectedDoComment ? undoComment : doComment} alt="toggle comment"/>
            </button>
            <hr className={`comment-hr ${selectedDoComment ? 'active' : ''}`}/>
            
            {/* 대댓글 */}
            {selectedDoComment && (
            <div className={`comment-total ${selectedDoComment ? 'active' : ''}`}>
                {cocomentdummy.map((cocoment, index) => (
                    <div>
                        <div className="comment-top">
                            <div className="comment-profile">
                                <img src={cocoment.profile} />
                            </div>
                            <div className="comment-header">
                                <p className="comment-nickname">{cocoment.nickname}</p>
                                <p className="comment-date">{cocoment.date}</p>
                            </div>
                        </div>
                        <div className="comment-body">
                            <p>{cocoment.comment}</p>
                        </div>
                        
                    </div>
                ))}
                 <button className="comment-actions">
                    <img src={doComment}/>
                </button>
                <hr/>
                 <div>
                     {selectedDoComment && (
                     <MyComment
                         profile={props.myProfile}
                         name={props.myName}
                         />)}
                 </div>
             </div>)}
            
        </div>



    );
}

export default Comment;
