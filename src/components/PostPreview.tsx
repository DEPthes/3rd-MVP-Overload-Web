
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import heart from "../images/heart.png";
import view from "../images/View.png";
import bookmark from "../images/bookmark.png";
import checkBookmark from "../images/checkBookmark.png";
import checkHeart from "../images/checkHeart.png";
import defaultProfile from "../images/defaultProfile.png";

import "../style/postPreview.css";

type PostPreviewProps = {
    id: string;
    title: string;
    content: string;
    date: string;
    writer: string;
    view: number;
    like: number;
    scrap: number;
    picture?: string;
    profile: string;
    handleHeartClick?: ()=>boolean
    selectedHeart?: boolean;
    handleScrapClick?: ()=>boolean
    selectedScrap?: boolean;
};

// 게시글 간단하게 보는 Component

const PostPreview: React.FC<PostPreviewProps> = (props) => {
    
    const navigate = useNavigate();

    

    const handleTitleClick = () => {
        navigate(`/viewDetailPost/${props.id}`);
    };

    return (
        <div className="preview-total">
            <div className="preview-left">
                <div className="preview-title">
                    <a onClick={handleTitleClick}>{props.title}</a>
                </div>
                <div className="preview-content">{props.content}</div>

                <div className="preview-middle">
                    <div>{props.date}</div>
                    <img src={props.profile? props.profile:defaultProfile} />
                    <div>{props.writer}</div>
                </div>

                <div className="preview-bottom">
                    <div>
                        <img src={view} alt="Views" />
                        {props.view}
                    </div>
                    <div>
                        <button onClick={props.handleHeartClick}>
                            <img src={props.selectedHeart ? checkHeart : heart} />
                        </button>
                        {props.like}
                    </div>
                    <div>
                        <button onClick={props.handleScrapClick}>
                            <img src={props.selectedScrap ? checkBookmark : bookmark} />
                        </button>
                        {props.scrap}
                    </div>
                </div>
            </div>
            {props.picture && (
                <div className="preview-right">
                    <img src={props.picture}/>
                </div>
            )}
        </div>
    );
};

export default PostPreview;

