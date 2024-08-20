
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {marked} from 'marked';

import heart from "../images/heart.png";
import view from "../images/View.png";
import bookmark from "../images/bookmark.png";
import checkBookmark from "../images/checkBookmark.png";
import checkHeart from "../images/checkHeart.png";
import menu from "../images/menu.png";
import recDefaultProfile from "../images/rectangleDefaultProfile.png"
import defaultProfile from "../images/defaultProfile.png"

import "../style/postDetailView.css";
import api from '../api';

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
import EditPage from '../pages/EditPage';

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

type post = {
    id:number;
    title: string;
    date: string;
    writer: string;
    part: string;
    content: string;
    profile: Avatar;
    view: number;
    like: number;
    liked: boolean;
    scraped: boolean;
    mine: boolean;
    scrap: number;
    tag: string[];
    generation: number;
    handleHeartClick?: ()=>void
    selectedHeart?: boolean;
    handleScrapClick?: ()=>void
    selectedScrap?: boolean;
};

// 상세 게시글 페이지에서 본문 부분 Component

const PostDetailView: React.FC<post> = (props) => {
    const navigate = useNavigate();
    const htmlContent = marked(props.content)

    const [isHeartSelected, setIsHeartSelected] = useState(props.liked || false);
    const [isScrapSelected, setIsScrapSelected] = useState(props.scraped || false);
    const [likeCount, setLikeCount] = useState(props.like);
    const [scrapCount, setScrapCount] = useState(props.scrap);
    const [selecteMenu, setSelecteMenu] = useState<boolean>(false);
    const [isToken, setIsToken] = useState(false);
    const [token, setToken] = useState<string>();

    useEffect(()=>{
        // setIsScrapSelected(props.selectedScrap || false);

        const token = localStorage.getItem("token") ? localStorage.getItem("token") : sessionStorage.getItem("token");
        if (token) {
            setIsToken(true);
            setToken(token);
        }

    }, [props.selectedScrap]);

    const handleMenuClick = () => {
        setSelecteMenu(!selecteMenu);
    }

    const toggleHeart = async () => {
        try {
            if(isToken){
                if (isHeartSelected) {
                    await api.delete(`/likes/${props.id}`, {
                        headers: {
                            'Authorization': `Bearer ${token}` 
                        }
                    });
                    setLikeCount(likeCount - 1);
                } else {
                    await api.post(`/likes/${props.id}`, {
                        headers: {
                            'Authorization': `Bearer ${token}` // Bearer 토큰 설정
                        }
                    });
                    setLikeCount(likeCount + 1);
                }
                    setIsHeartSelected(!isHeartSelected);
                } 
            }catch (error) {
                console.error("like API 요청 중 오류가 발생했습니다.", error);
                console.log(isScrapSelected);
                console.log(isHeartSelected);
            }
            

        if (props.handleHeartClick) {
            props.handleHeartClick();
        }
    };

    const toggleScrap = async () => {
        try {
            if(isToken){
                if (isScrapSelected) {
                    await api.delete(`/scraps/${props.id}`, {
                        headers: {
                            'Authorization': `Bearer ${token}` 
                        }
                    });
                    setScrapCount(scrapCount - 1);
                } else {
                    await api.post(`/scraps/${props.id}`,{
                        headers: {
                            'Authorization': `Bearer ${token}` 
                        }
                    });
                    setScrapCount(scrapCount + 1);
                }
                setIsScrapSelected(!isScrapSelected);
            }
        } catch (error) {
            console.error("Scrap API 요청 중 오류가 발생했습니다.", error);
        }
    
        if (props.handleScrapClick) {
            props.handleScrapClick();
        }
    };

    const handleTagClick = (tag: string) => {
        navigate('/searchResults', { state: { searchTerm: tag, isTagSearch: true } });
    };

    const handleDeletePost = async () => {
        try {
            await api.delete(`/posts/${props.id}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            navigate('/');
        } catch (error) {
            console.error("게시글 삭제 중 오류가 발생했습니다.", error);
        }
    }

    const handleEditPost = () => {
        navigate(`/editPage/${props.id}`);
    }

    return (
        <div className="detail-total">
            <div className="detail-title">
                {props.title}
                <div className='detail-menu-container'>
                    {props.mine &&(
                        <>
                        <button className="detail-menu" onClick={handleMenuClick}><img src={menu}/></button>
                        {selecteMenu && 
                            <div className='detail-menu-options'>
                                <button className='detail-menu-option'onClick={handleEditPost}>게시글 수정</button>
                                <button className='detail-menu-option' onClick={handleDeletePost}>게시글 삭제</button>
                            </div>
                        }
                        </>
                            
                    )}
                </div>
            </div>
                
            <hr/>
            <div className="detail-info">
                <div className='detail-info-date'>{props.date}</div>
                {props.profile && (
                    <div className='postdetail-writer'>
                    {props.profile.avatarFace ? (
                        <img className="postdetail-writer-img" src={avatarImages[props.profile.avatarFace]} />
                    ) 
                    : (
                        <img src={defaultProfile} className="postdetail-default-profile"/>
                    )}
                    {props.profile.avatarBody && (
                        <img className="postdetail-writer-img" src={avatarImages[props.profile.avatarBody]} />
                    )}
                    {props.profile.avatarEyes && (
                        <img className="postdetail-writer-img" src={avatarImages[props.profile.avatarEyes]} />
                    )}
                    {props.profile.avatarNose && (
                        <img className="postdetail-writer-img" src={avatarImages[props.profile.avatarNose]} />
                    )}
                    {props.profile.avatarMouth && (
                        <img className="postdetail-writer-img" src={avatarImages[props.profile.avatarMouth]} />
                    )}
                    </div>
                )}
                <div className='detail-info-writer'>{props.writer}</div>
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
                        <button onClick={toggleHeart}>
                            <img src={isHeartSelected ? checkHeart : heart} />
                        </button>
                        {likeCount}
                    </div>
                    <div>
                        <button onClick={toggleScrap}>
                            <img src={isScrapSelected ? checkBookmark : bookmark} />
                        </button>
                        {scrapCount}
                    </div>
            </div>
            <div className='detail-bottom'>
                {props.profile && (
                    <div className="bottom-postwriter-avatar">
                    {props.profile.avatarFace ? (
                        <img className="bottom-postwriter-avatar-img" src={avatarImages[props.profile.avatarFace]} />
                    ) 
                    : (
                        <img src={recDefaultProfile} className="bottom-default-profile"/>
                    )}
                    {props.profile.avatarBody && (
                        <img className="bottom-postwriter-avatar-img" src={avatarImages[props.profile.avatarBody]} />
                    )}
                    {props.profile.avatarEyes && (
                        <img className="bottom-postwriter-avatar-img" src={avatarImages[props.profile.avatarEyes]} />
                    )}
                    {props.profile.avatarNose && (
                        <img className="bottom-postwriter-avatar-img" src={avatarImages[props.profile.avatarNose]} />
                    )}
                    {props.profile.avatarMouth && (
                        <img className="bottom-postwriter-avatar-img" src={avatarImages[props.profile.avatarMouth]} />
                    )}
                    </div>
                )}
                <div>
                    <p className='detail-profile-name'>{props.writer}</p>
                    <p className='detail-profile-part'>{props.generation}기 {props.part}</p>
                </div>
            </div>
            <hr/>
        </div>
    );
};

export default PostDetailView;

