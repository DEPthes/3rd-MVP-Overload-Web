import { Link } from "react-router-dom";
import logo from "../../images/deplogLogo.png";
import "../../style/avatar/avatarNav.css";

const AvatarNav = ({ onClick }: { onClick: () => void }) => {
  return (
    <nav className="avatarNav">
      <Link to="/">
        <img className="logo" src={logo} alt="Logo" />
      </Link>
      <button className="avatarSubmitButton" onClick={onClick}>
        적용하기
      </button>
    </nav>
  );
};

export default AvatarNav;
