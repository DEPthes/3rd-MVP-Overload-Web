
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {marked} from 'marked';

import heart from "../images/heart.png";
import view from "../images/View.png";
import bookmark from "../images/bookmark.png";
import checkBookmark from "../images/checkBookmark.png";
import checkHeart from "../images/checkHeart.png";
import menu from "../images/menu.png";

import "../style/postDetailView.css";
import api from '../api';

type post = {
    id:number;
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
    handleHeartClick?: ()=>void
    selectedHeart?: boolean;
    handleScrapClick?: ()=>void
    selectedScrap?: boolean;
};

// 상세 게시글 페이지에서 본문 부분 Component

const PostDetailView: React.FC<post> = (props) => {
    const navigate = useNavigate();
    const htmlContent = marked(props.content)

    const [isHeartSelected, setIsHeartSelected] = useState(props.selectedHeart || false);
    const [isScrapSelected, setIsScrapSelected] = useState(props.selectedScrap || false);
    const [likeCount, setLikeCount] = useState(props.like);
    const [scrapCount, setScrapCount] = useState(props.scrap);
    const [selecteMenu, setSelecteMenu] = useState<boolean>(false);
    const [isToken, setIsToken] = useState(false);
    const [token, setToken] = useState<string>();

    useEffect(()=>{
        // setIsScrapSelected(props.selectedScrap || false);

        const token = sessionStorage.getItem("token");
        if (token) {
            setIsToken(true);
            setToken(token);
        }

        api.get(`/scraps`, {
            headers: {
                'Authorization': `Bearer ${token}` 
            }
        })
        .then((response) => {
            // 응답 데이터에서 dataList 배열을 가져옴
            const dataList = response.data.data.dataList;
            
            // 각 게시물의 id를 배열로 저장
            const scrapIds = dataList.map((item:any) => item.id);
        
            // 현재 포스트가 스크랩된 상태인지 확인
            const isScrapped = scrapIds.includes(props.id);
            setIsScrapSelected(isScrapped);
            console.log(scrapIds[0], props.id);
        })
        .catch((error) => {
            console.error("스크랩 가져오기 오류:", error);
        });

    }, [props.selectedScrap]);

    const handleMenuClick = () => {
        setSelecteMenu(!selecteMenu);
    }

    const toggleHeart = () => {
        if (isHeartSelected) {
            setLikeCount(likeCount - 1);
        } else {
            setLikeCount(likeCount + 1);
        }
        setIsHeartSelected(!isHeartSelected);

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

