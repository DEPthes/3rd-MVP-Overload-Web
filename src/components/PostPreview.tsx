
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import heart from "../images/heart.png";
import view from "../images/View.png";
import bookmark from "../images/bookmark.png";
import defaultProfile from "../images/defaultProfile.png";

import "../style/postPreview.css";

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
import api from "../api";

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
    profile: Avatar;
    handleHeartClick?: () => void;
    selectedHeart?: boolean;
    handleScrapClick?: () => void;
    selectedScrap?: boolean;
};

const PostPreview: React.FC<postPreview> = (props) => {
    const navigate = useNavigate();

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
        
        console.log(props.id);//여러개나옴

    },[]);

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
                    {props.profile && (
                    <div className='postpre-writer'>
                    {props.profile.avatarFace ? (
                        <img className="postpre-writer-img" src={avatarImages[props.profile.avatarFace]} />
                    ) 
                    : (
                        <img src={defaultProfile} className="postpre-default-profile"/>
                    )}
                    {props.profile.avatarBody && (
                        <img className="postpre-writer-img" src={avatarImages[props.profile.avatarBody]} />
                    )}
                    {props.profile.avatarEyes && (
                        <img className="postpre-writer-img" src={avatarImages[props.profile.avatarEyes]} />
                    )}
                    {props.profile.avatarNose && (
                        <img className="postpre-writer-img" src={avatarImages[props.profile.avatarNose]} />
                    )}
                    {props.profile.avatarMouth && (
                        <img className="postpre-writer-img" src={avatarImages[props.profile.avatarMouth]} />
                    )}
                    </div>
                )}
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
