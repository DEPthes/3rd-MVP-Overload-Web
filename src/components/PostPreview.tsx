import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import heart from "../images/heart.png";
import view from "../images/View.png";
import bookmark from "../images/bookmark.png";
import defaultProfile from "../images/defaultProfile.png";

import "../style/postPreview.css";
import CircleAvatarComponent from "./CircleAvatarComponent";

type Avatar = {
  avatarFace: string;
  avatarBody: string;
  avatarEyes: string;
  avatarNose: string;
  avatarMouth: string;
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
  profile?: Avatar;
  handleHeartClick?: () => void;
  selectedHeart?: boolean;
  handleScrapClick?: () => void;
  selectedScrap?: boolean;
  avatar: Avatar;
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
  }, []);

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
          {props.avatar.avatarBody ? (
            <div style={{ marginLeft: "19px" }}>
              <CircleAvatarComponent
                width={"25px"}
                height={"25px"}
                face={props.avatar.avatarFace}
                body={props.avatar.avatarBody}
                eyes={props.avatar.avatarEyes}
                nose={props.avatar.avatarNose}
                mouth={props.avatar.avatarMouth}
              />
            </div>
          ) : (
            <img
              className="profile-icon"
              src={defaultProfile}
              style={{ marginLeft: "19px" }}
            />
          )}
          <div className="preview-middle-writer" style={{ marginLeft: "5px" }}>
            {props.writer}
          </div>
        </div>

        <div className="preview-bottom">
          <div>
            <img src={view} />
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
