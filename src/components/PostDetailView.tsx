import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { marked } from "marked";

import heart from "../images/heart.png";
import view from "../images/View.png";
import bookmark from "../images/bookmark.png";
import checkBookmark from "../images/checkBookmark.png";
import checkHeart from "../images/checkHeart.png";
import menu from "../images/menu.png";
import recDefaultProfile from "../images/rectangleDefaultProfile.png";
import defaultProfile from "../images/defaultProfile.png";

import "../style/postDetailView.css";
import api from "../api";

import CircleAvatarComponent from "./CircleAvatarComponent";
import AvatarCard from "./avatarPage/AvatarCard";
import AvatarComponent from "./avatarPage/AvatarComponent";
import { getImageByString } from "../util/getImageByString";

type Avatar = {
  avatarFace?: string;
  avatarBody?: string;
  avatarEyes?: string;
  avatarNose?: string;
  avatarMouth?: string;
};

type post = {
  id: number;
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
  handleHeartClick?: () => void;
  selectedHeart?: boolean;
  handleScrapClick?: () => void;
  selectedScrap?: boolean;
  avatar: Avatar;
};

// 상세 게시글 페이지에서 본문 부분 Component

const PostDetailView: React.FC<post> = (props) => {
  const navigate = useNavigate();
  const htmlContent = marked(props.content);

  const [isHeartSelected, setIsHeartSelected] = useState(props.liked || false);
  const [isScrapSelected, setIsScrapSelected] = useState(
    props.scraped || false
  );
  const [likeCount, setLikeCount] = useState(props.like);
  const [scrapCount, setScrapCount] = useState(props.scrap);
  const [selecteMenu, setSelecteMenu] = useState<boolean>(false);
  const [isToken, setIsToken] = useState(false);
  const [token, setToken] = useState<string>();

  useEffect(() => {
    // setIsScrapSelected(props.selectedScrap || false);

    const token = localStorage.getItem("token")
      ? localStorage.getItem("token")
      : sessionStorage.getItem("token");
    if (token) {
      setIsToken(true);
      setToken(token);
    }
  }, [props.selectedScrap]);

  const handleMenuClick = () => {
    setSelecteMenu(!selecteMenu);
  };

  const toggleHeart = async () => {
    try {
      if (isToken) {
        if (isHeartSelected) {
          await api.delete(`/likes/${props.id}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          setLikeCount(likeCount - 1);
        } else {
          await api.post(`/likes/${props.id}`, {
            headers: {
              Authorization: `Bearer ${token}`, // Bearer 토큰 설정
            },
          });
          setLikeCount(likeCount + 1);
        }
        setIsHeartSelected(!isHeartSelected);
      }
    } catch (error) {
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
      if (isToken) {
        if (isScrapSelected) {
          await api.delete(`/scraps/${props.id}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          setScrapCount(scrapCount - 1);
        } else {
          await api.post(`/scraps/${props.id}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
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
    navigate("/searchResults", {
      state: { searchTerm: tag, isTagSearch: true },
    });
  };
  const handleDeletePost = async () => {
    try {
      await api.delete(`/posts/${props.id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      navigate("/");
    } catch (error) {
      console.error("게시글 삭제 중 오류가 발생했습니다.", error);
    }
  };

  const handleEditPost = () => {
    navigate(`/editPage/${props.id}`);
  };

  return (
    <div className="detail-total">
      <div className="detail-title">
        {props.title}
        <div className="detail-menu-container">
          {props.mine && (
            <>
              <button className="detail-menu" onClick={handleMenuClick}>
                <img src={menu} />
              </button>
              {selecteMenu && (
                <div className="detail-menu-options">
                  <button
                    className="detail-menu-option"
                    onClick={handleEditPost}
                  >
                    게시글 수정
                  </button>
                  <button
                    className="detail-menu-option"
                    onClick={handleDeletePost}
                  >
                    게시글 삭제
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>

      <hr />
      <div className="detail-info">
        <div className="detail-info-date">{props.date}</div>
        {props.avatar.avatarBody !== null ? (
          <div style={{ marginLeft: "19px", marginRight: "4px" }}>
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
            src={defaultProfile}
            style={{ width: "25px", height: "25px", marginLeft: "19px" }}
          />
        )}
        <div className="detail-info-writer">{props.writer}</div>
      </div>
      <div
        className="detail-content"
        dangerouslySetInnerHTML={{ __html: htmlContent }}
      ></div>

      <div className="detail-tags">
        {props.tag.map((t, index) => (
          <button key={index} onClick={() => handleTagClick(t)}>
            #{t}
          </button>
        ))}
      </div>
      <div className="interaction">
        <div>
          <img src={view} alt="Views" />
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
      <div className="detail-bottom">
        {props.avatar.avatarBody !== null ? (
          <div style={{ marginRight: "20px" }}>
            <AvatarComponent
              height="112px"
              width="112px"
              face={getImageByString(props.avatar.avatarFace)}
              body={getImageByString(props.avatar.avatarBody)}
              eyes={getImageByString(props.avatar.avatarEyes)}
              nose={getImageByString(props.avatar.avatarNose)}
              mouth={getImageByString(props.avatar.avatarMouth)}
            />
          </div>
        ) : (
          <img
            className="profile-icon"
            src={defaultProfile}
            style={{ width: "112px", height: "112px", marginRight: "20px" }}
          />
        )}
        <div>
          <p className="detail-profile-name">{props.writer}</p>
          <p className="detail-profile-part">
            {props.generation}기 {props.part}
          </p>
        </div>
      </div>
      <hr />
    </div>
  );
};

export default PostDetailView;
