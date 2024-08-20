import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios"; // axios를 사용하여 API 호출

import heart from "../images/heart.png";
import view from "../images/View.png";
import bookmark from "../images/bookmark.png";
import checkBookmark from "../images/checkBookmark.png";
import checkHeart from "../images/checkHeart.png";
import defaultProfile from "../images/defaultProfile.png";

import "../style/postPreview.css";
import api from "../api";

type postPreview = {
    id: number;
    title: string;
    content: string;
    date: string;
    writer: string;
    view: number;
    like: number;
    scrap: number;
    picture?: string;
    profile: string;
    handleHeartClick?: () => void;
    selectedHeart?: boolean;
    handleScrapClick?: () => void;
    selectedScrap?: boolean;
};

const PostPreview: React.FC<postPreview> = (props) => {
    const navigate = useNavigate();

    // const [isHeartSelected, setIsHeartSelected] = useState(props.selectedHeart || false);
    // const [isScrapSelected, setIsScrapSelected] = useState(props.selectedScrap || false);
    const [likeCount, setLikeCount] = useState(props.like);
    const [scrapCount, setScrapCount] = useState(props.scrap);
    const [isToken, setIsToken] = useState(false);
    const [token, setToken] = useState<string>();

    useEffect(() => {
        const token = sessionStorage.getItem("token");
        if (token) {
            setIsToken(true);
            setToken(token);
        }

        // api.get(`/scraps`, {
        //     headers: {
        //         'Authorization': `Bearer ${token}` 
        //     }
        // })
        // .then((response) => {
        //     // 응답 데이터에서 dataList 배열을 가져옴
        //     const dataList = response.data.data.dataList;
            
        //     // 각 게시물의 id를 배열로 저장
        //     const scrapIds = dataList.map((item:any) => item.id);
        
        //     // 현재 포스트가 스크랩된 상태인지 확인
        //     const isScrapped = scrapIds.includes(props.id);
        //     setIsScrapSelected(isScrapped);

        // })
        // .catch((error) => {
        //     console.error("스크랩 가져오기 오류:", error);
        // });
        

    },[]);

    const handleTitleClick = () => {
        navigate(`/viewDetailPost/${props.id}`);
    };

    // const toggleHeart = async () => {
    //     try {
    //         if(isToken){
    //             if (isHeartSelected) {
    //                 await api.delete(`/likes/${props.id}`, {
    //                     headers: {
    //                         'Authorization': `Bearer ${token}` 
    //                     }
    //                 });
    //                 setLikeCount(likeCount - 1);
    //             } else {
    //                 await api.post(`/likes/${props.id}`, {
    //                     headers: {
    //                         'Authorization': `Bearer ${token}` // Bearer 토큰 설정
    //                     }
    //                 });
    //                 setLikeCount(likeCount + 1);
    //             }
    //                 setIsHeartSelected(!isHeartSelected);
    //             } 
    //         }catch (error) {
    //             console.error("like API 요청 중 오류가 발생했습니다.", error);
    //             console.log(isScrapSelected);
    //             console.log(isHeartSelected);
    //         }
            

    //     if (props.handleHeartClick) {
    //         props.handleHeartClick();
    //     }
    // };

    // const toggleScrap = async () => {
    //     try {
    //         if(isToken){
    //             if (isScrapSelected) {
    //                 await api.delete(`/scraps/${props.id}`, {
    //                     headers: {
    //                         'Authorization': `Bearer ${token}` 
    //                     }
    //                 });
    //                 setScrapCount(scrapCount - 1);
    //             } else {
    //                 await api.post(`/scraps/${props.id}`, {
    //                     headers: {
    //                         'Authorization': `Bearer ${token}` // Bearer 토큰 설정
    //                     }
    //                 });
    //                 setScrapCount(scrapCount + 1);
    //             }
    //                 setIsScrapSelected(!isScrapSelected);
    //             } 
    //         }catch (error) {
    //             console.error("Scrap API 요청 중 오류가 발생했습니다.", error);
    //             console.log(isScrapSelected);
    //             console.log(isHeartSelected);
    //         }
            

    //     if (props.handleScrapClick) {
    //         props.handleScrapClick();
    //     }
    // };

    return (
        <div className="preview-total">
            <div className="preview-left">
                <div className="preview-title">
                    <a onClick={handleTitleClick}>{props.title}</a>
                </div>
                <div className="preview-content">{props.content}</div>

                <div className="preview-middle">
                    <div>{props.date}</div>
                    <img src={props.profile ? props.profile : defaultProfile} />
                    <div>{props.writer}</div>
                </div>

                <div className="preview-bottom">
                    <div>
                        <img src={view}/>
                        {props.view}
                    </div>
                    <div>
                        <button>
                            <img src={heart} />
                        </button>
                        {likeCount}
                    </div>
                    <div>
                        <button>
                            <img src={bookmark} />
                        </button>
                        {scrapCount}
                    </div>
                </div>
            </div>
            {props.picture && (
                <div className="preview-right">
                    <img src={props.picture} />
                </div>
            )}
        </div>
    );
};

export default PostPreview;
