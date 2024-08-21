import React, { useEffect, useState } from "react";
import "../style/Nav.css";
import defaultProfile from "../images/defaultProfile.png";
import logo from "../images/deplogLogo.png";
import searchImg from "../images/search.png";
import insta from "../images/Insta.png";
import writeBtn from "../images/writePostBtn.png";
import devider from "../images/Devider.png";
import { Link, useNavigate } from "react-router-dom";
import CircleAvatarComponent from "./CircleAvatarComponent";

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
    const token = localStorage.getItem("token")
      ? localStorage.getItem("token")
      : sessionStorage.getItem("token");
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
          <img
            className="nav-icon write-button"
            src={writeBtn}
            alt="Write Button"
            onClick={handleWriteClick}
          />
        ) : null}
        {token ? (
          props.profile?.avatarBody ? (
            <div style={{ cursor: "pointer" }} onClick={handleMyPageClick}>
              <CircleAvatarComponent
                width={"40px"}
                height={"40px"}
                face={props.profile.avatarFace}
                body={props.profile.avatarBody}
                eyes={props.profile.avatarEyes}
                nose={props.profile.avatarNose}
                mouth={props.profile.avatarMouth}
              />
            </div>
          ) : (
            <img
              src={defaultProfile}
              style={{
                width: "40px",
                height: "40px",
                cursor: "pointer",
              }}
              onClick={handleMyPageClick}
            />
          )
        ) : (
          <img
            className="profile-icon"
            src={defaultProfile}
            onClick={handleProfileClick}
          />
        )}
      </div>
    </nav>
  );
};

export default Nav;
