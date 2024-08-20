import React, { useEffect, useState } from "react";
import "../style/Nav.css";
import defaultProfile from "../images/defaultProfile.png";
import logo from "../images/deplogLogo.png";
import searchImg from "../images/search.png";
import insta from "../images/Insta.png";
import writeBtn from "../images/writePostBtn.png";
import devider from "../images/Devider.png";
import { Link, useNavigate } from "react-router-dom";

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

type nav = {
  profile?: Avatar;
  onSearchClick: () => void;
};

const Nav: React.FC<nav> = (props) => {
  const [istoken, setIsToken] = useState(false);
  const [token, setToken] = useState<string>();

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    if (token) {
      setIsToken(true);
      setToken(token);
    }
  }, []);

  const navigate = useNavigate();

  const handleProfileClick = () => {
    navigate(`/logIn`);
  };

  const handleMyPageClick = () => {
    navigate(`/MyPage`);
  };

  const handleWriteClick = () => {
    navigate(`/post`);
  };

  // 이미지 매핑을 통해 이미지 URL 반환
  // const getAvatarImage = (imageName?: string) => {
  //   return imageName && avatarImages[imageName] ? avatarImages[imageName] : undefined;
  // };

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <Link to="/">
          <img className="logo" src={logo} alt="Logo" />
        </Link>
      </div>

      <div className="navbar-right">
        <a onClick={props.onSearchClick}>
          <img className="nav-icon search-icon" src={searchImg} alt="Search" />
        </a>
        <a href="https://www.instagram.com/depth_mju.co.kr/">
          <img className="nav-icon instagram-icon" src={insta} />
        </a>
        <img className="nav-icon" src={devider} />
        {token ? (
          <img className="nav-icon write-button" src={writeBtn} alt="Write Button" onClick={handleWriteClick} />
        ) : null}
        {token ? (
          props.profile && (
            <div className="nav-avatar" onClick={handleMyPageClick}>
              {props.profile.avatarFace ? (
                <img className="nav-avatar-img" src={avatarImages[props.profile.avatarFace]} />
              ) 
              : (
                <img src={defaultProfile} className="profile-icon" onClick={handleMyPageClick} />
              )}
              {props.profile.avatarBody && (
                <img className="nav-avatar-img" src={avatarImages[props.profile.avatarBody]} />
              )}
              {props.profile.avatarEyes && (
                <img className="nav-avatar-img" src={avatarImages[props.profile.avatarEyes]} />
              )}
              {props.profile.avatarNose && (
                <img className="nav-avatar-img" src={avatarImages[props.profile.avatarNose]} />
              )}
              {props.profile.avatarMouth && (
                <img className="nav-avatar-img" src={avatarImages[props.profile.avatarMouth]} />
              )}
            </div>
          )
        ) : (
          <img className="profile-icon" src={defaultProfile} onClick={handleProfileClick} />
        )}
      </div>
    </nav>
  );
};

export default Nav;
