import logo from "../../images/deplogLogo.png";
import "../../style/avatar/avatarNav.css";

const AvatarNav = () => {
  const handleSubmit = () => {};

  return (
    <nav className="avatarNav">
      <img className="logo" src={logo} alt="Logo" />
      <button className="avatarSubmitButton" onClick={handleSubmit}>
        적용하기
      </button>
    </nav>
  );
};

export default AvatarNav;
