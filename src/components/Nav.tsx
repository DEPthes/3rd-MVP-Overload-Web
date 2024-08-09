import React from 'react';
import "../style/Nav.css";
import defaultProfile from "../images/defaultProfile.png";
import logo from "../images/deplogLogo.png";
import searchImg from "../images/search.png";
import insta from "../images/Insta.png";
import writeBtn from "../images/writePostBtn.png";
import devider from "../images/Devider.png";
import { Link } from 'react-router-dom';

const Nav: React.FC<{ profile?: string, onSearchClick: () => void }> = (props) => {
  return (
    <nav className="navbar">
      <div className="navbar-left">
        <Link to="/mainPage">
          <img className="logo" src={logo} alt="Logo" />
        </Link>
      </div>
      <div className="navbar-right">
        <a onClick={props.onSearchClick}><img className="nav-icon search-icon" src={searchImg} alt="Search" /></a>
        <a href='https://www.instagram.com/depth_mju.co.kr/'><img className="nav-icon instagram-icon" src={insta} alt="Instagram" /></a>
        <img className="nav-icon" src={devider} alt="Divider" />
        <a href='#'><img className="nav-icon write-button" src={writeBtn} alt="Write" /></a>
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
