import React, { useEffect, useState } from "react";
import "../style/Nav.css";
import defaultProfile from "../images/defaultProfile.png";
import logo from "../images/deplogLogo.png";
import searchImg from "../images/search.png";
import insta from "../images/Insta.png";
import writeBtn from "../images/writePostBtn.png";
import devider from "../images/Devider.png";
import { Link, useNavigate } from "react-router-dom";

const Nav: React.FC<{ profile?: string, onSearchClick: () => void }> = (props) => {
  const [istoken, setIsToken] = useState(false);

  useEffect(()=>{
    const token = sessionStorage.getItem("accessToken");
    if(token!=null){
      setIsToken(true);
    }
  }, []);

  const navigate = useNavigate();

  const handleProfileClick = () => {
      navigate(`/logIn`);
  }

  const handleMyPageClick = () => {
    navigate(`/MyPage`);
  }

  const handleWriteClick = () => {
    navigate(`post`);
  }

  return (
    <nav className="navbar">
      {/* 로고 부분 */}

      <div className="navbar-left">
        <Link to="/">
          <img className="logo" src={logo} alt="Logo" />
        </Link>
      </div>

      {/* 검색, 인스타, 글작성, 프로필 부분 */}
      <div className="navbar-right">
      <a onClick={props.onSearchClick}><img className="nav-icon search-icon" src={searchImg} alt="Search" /></a>
        <a href="https://www.instagram.com/depth_mju.co.kr/">
          <img className="nav-icon instagram-icon" src={insta} />
        </a>
        <img className="nav-icon" src={devider} />
        { istoken ? (
        <img className="nav-icon write-button" src={writeBtn} alt="Write Button" onClick={handleWriteClick}/>
        )   : null }
          {istoken ? (
              <img
                  className="profile-icon"
                  src={props.profile? props.profile : defaultProfile}
                  onClick={handleMyPageClick}
              />
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
