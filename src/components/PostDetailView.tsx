
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {marked} from 'marked';

import heart from "../images/heart.png";
import view from "../images/View.png";
import bookmark from "../images/bookmark.png";
import checkBookmark from "../images/checkBookmark.png";
import checkHeart from "../images/checkHeart.png";
import menu from "../images/menu.png";

import "../style/postDetailView.css";

type post = {
    title: string;
    date: string;
    writer: string;
    part: string;
    content: string;
    profile: string;
    view: number;
    like: number;
    scrap: number;
    tag: string[];
};

// 상세 게시글 페이지에서 본문 부분 Component

const PostDetailView: React.FC<post> = (props) => {
    const navigate = useNavigate();
    const htmlContent = marked(props.content)

    const [selectedHeart, setSelectedHeart] = useState<boolean>(false);
    const [selectedScarp, setSelectedScarp] = useState<boolean>(false);
    const [selecteMenu, setSelecteMenu] = useState<boolean>(false);

    const handleMenuClick = () => {
        setSelecteMenu(!selecteMenu);
    }

    const handleHeartClick = () => {
        setSelectedHeart(!selectedHeart);
    };

    const handleScrapClick = () => {
        setSelectedScarp(!selectedScarp);
    };

    const handleTagClick = (tag: string) => {
        navigate('/searchResults', { state: { searchTerm: tag, isTagSearch: true } });
    };

    return (
        <div className="detail-total">
            <div className="detail-title">
                {props.title}
                <div className='detail-menu-container'>
                    <button className="detail-menu" onClick={handleMenuClick}><img src={menu}/></button>
                    {selecteMenu && (
                        <div className='detail-menu-options'>
                            <button className='detail-menu-option'>게시글 수정</button>
                            <button className='detail-menu-option'>게시글 삭제</button>
                        </div>
                    )}
                </div>
            </div>

            <hr/>
            <div className="detail-info">
                <div>{props.date}</div>
                <img src={ props.profile }/>
                <div>{props.writer}</div>
            </div>
            <div className="detail-content" dangerouslySetInnerHTML={{__html:htmlContent}}></div>

            <div className="detail-tags">
                {props.tag.map((t, index) => (
                    <button key={index} onClick={() => handleTagClick(t)}>#{t}</button>
                ))}
            </div>
            <div className="interaction">
                <div>
                    <img src={view} alt="Views"/>
                    {props.view}
                </div>
                <div>
                    <button onClick={handleHeartClick}>
                        <img src={selectedHeart ? checkHeart : heart} alt="Likes"/>
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
            <div className='detail-bottom'>
                <img src={props.profile}/>
                <div>
                    <p className='detail-profile-name'>{props.writer}</p>
                    <p className='detail-profile-part'>{props.part}</p>
                </div>
            </div>
            <hr/>
        </div>
    );
};

export default PostDetailView;

