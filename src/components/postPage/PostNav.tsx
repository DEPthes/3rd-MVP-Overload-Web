import "../../style/postPage/postNav.css";
import logo from "../../images/deplogLogo.png";
import { SaveFolder } from "../../assets";
import { useState } from "react";
import SaveModal from "./SaveModal";
import { Temp } from "../../types/temps";

interface PostNavProp {
  onClick: () => void;
  onSave: () => void;
  temps: Temp[];
  isClear: boolean;
  setTemp: () => void;
}

const PostNav = ({ onClick, onSave, temps, isClear, setTemp }: PostNavProp) => {
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
        <button className="saveButton" onClick={onSave}>
          임시저장
        </button>
        <button
          className={isClear ? "postButton" : "defaultPostButton"}
          onClick={onClick}
          disabled={!isClear}
        >
          발행하기
        </button>
      </div>
      {isOpenModal && (
        <SaveModal onClick={handleCloseModal} temps={temps} setTemp={setTemp} />
      )}
    </nav>
  );
};

export default PostNav;
