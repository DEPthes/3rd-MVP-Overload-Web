import React from 'react';
import "../style/Nav.css";
import defaultProfile from "../images/defaultProfile.png";
import logo from "../images/deplogLogo.png";
import searchImg from "../images/search.png";
import insta from "../images/Insta.png";
import writeBtn from "../images/writePostBtn.png";
import devider from "../images/Devider.png";

const Nav: React.FC<{ profile?: string }> = (props) => {
  return (
    <nav className="navbar">
        {/* 로고 부분 */}
      <div className="navbar-left">
        <img className="logo" src={logo} alt="Logo" />
      </div>

        {/* 검색, 인스타, 글작성, 프로필 부분 */}
      <div className="navbar-right">
        <a href='#'><img className="nav-icon search-icon" src={ searchImg }/></a>
        <a href='https://www.instagram.com/depth_mju.co.kr/'><img className="nav-icon instagram-icon" src={ insta }/></a>
        <a href='#'><img className="nav-icon" src={ devider }/></a>
        <a href='#'><img className="nav-icon write-button" src={ writeBtn }/></a>
        
        {/* 프로필 부분, 프로필 있을 시 자신의 프로필을, 없을 시 프로필 아이콘 */}
        <img 
          className="profile-icon" 
          src={props.profile ? props.profile : defaultProfile}  
          alt="Profile"
        />
      </div>
    </nav>
  );
}

export default Nav;
