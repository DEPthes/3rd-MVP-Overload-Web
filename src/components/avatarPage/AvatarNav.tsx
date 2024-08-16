import { Link } from "react-router-dom";
import logo from "../../images/deplogLogo.png";
import "../../style/avatar/avatarNav.css";

const AvatarNav = () => {
  const handleSubmit = () => {};

  return (
    <nav className="avatarNav">
      <Link to="/">
        <img className="logo" src={logo} alt="Logo" />
      </Link>
      <button className="avatarSubmitButton" onClick={handleSubmit}>
        적용하기
      </button>
    </nav>
  );
};

export default AvatarNav;
