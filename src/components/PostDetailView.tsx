
import React, { Component, useState } from 'react';
import heart from "../images/heart.png";
import view from "../images/View.png";
import bookmark from "../images/bookmark.png";
import checkBookmark from "../images/checkBookmark.png";
import checkHeart from "../images/checkHeart.png";
import defaultProfile from "../images/defaultProfile.png"
import "../style/postDetailView.css";

type post = {
    title: string;
    date: string;
    writer: string;
    content: string;
    picture?: string;
    view: number;
    like: number;
    scrap: number;
    tag: string[];
};

// 상세 게시글 페이지에서 본문 부분 Component

const PostDetailView: React.FC<post> = (props) => {

    const [selectedHeart, setSelectedHeart] = useState<boolean>(false);
    const [selectedScarp, setSelectedScarp] = useState<boolean>(false);

    const handleHeartClick = () => {
        setSelectedHeart(!selectedHeart);
    };

    const handleScrapClick = () => {
        setSelectedScarp(!selectedScarp);
    };

    return (
        <div className="detail-total">
            <div className="detail-title">{props.title}</div>
            <hr/>
            <div className="detail-info">
                <div>{props.date}</div>
                {/* 수정 필요 */}
                <img src={ defaultProfile }/>
                <div>{props.writer}</div>
            </div>
            <div className="detail-content">{props.content}</div>
            {props.picture && <div className="detail-image"><img src={props.picture}/></div>}
            <div className="detail-tags">
                {props.tag.map((t, index) => (
                    <button key={index}>#{t}</button>
                ))}
            </div>
            <div className="interaction">
                <div>
                    <img src={view} alt="Views"/>
                    {props.view}
                </div>
                <div>
                    <button onClick={handleHeartClick}>
                        <img src={selectedHeart ?  checkHeart:  heart} alt="Likes"/>
                    </button>
                    {props.like}
                </div>
                <div>
                    <button onClick={handleScrapClick}>
                        <img src={selectedScarp ? checkBookmark : bookmark} alt="Views"/>
                    </button>
                    {props.scrap}
                </div>
            </div>
        </div>
    );
};

export default PostDetailView;
