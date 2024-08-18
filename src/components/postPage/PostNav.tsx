import "../../style/postPage/postNav.css";
import logo from "../../images/deplogLogo.png";
import { SaveFolder } from "../../assets";
import { useState } from "react";
import SaveModal from "./SaveModal";

const PostNav = ({ onClick }: { onClick: () => void }) => {
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);

  const handleOpenModal = () => {
    setIsOpenModal(true);
  };
  const handleCloseModal = () => {
    setIsOpenModal(false);
  };

  return (
    <nav className="navbar">
      {/* 로고 부분 */}
      <div className="navbar-left">
        <img className="logo" src={logo} alt="Logo" />
      </div>

      {/* 검색, 인스타, 글작성, 프로필 부분 */}
      <div className="navbar-right">
        <SaveFolder style={{ cursor: "pointer" }} onClick={handleOpenModal} />
        <div className="border"></div>
        <button className="saveButton">임시저장</button>
        <button className="postButton" onClick={onClick}>
          발행하기
        </button>
      </div>
      {isOpenModal && <SaveModal onClick={handleCloseModal} />}
    </nav>
  );
};

export default PostNav;
