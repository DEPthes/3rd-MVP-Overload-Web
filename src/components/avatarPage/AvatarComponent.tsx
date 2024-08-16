import { AvatarComponentProps } from "../../types/avatar";
import "../../style/avatar/avatarComponent.css";

const AvatarComponent: React.FC<AvatarComponentProps> = ({
  width,
  height,
  face,
  body,
  eyes,
  nose,
  mouth,
}) => {
  return (
    <div
      className="avatarComponentContainer"
      style={{ position: "relative", width, height }}
    >
      <img
        src={body}
        style={{
          position: "absolute",
          top: 1.2,
          left: 0,
          width: "100%",
          height: "100%",
        }}
        alt="body"
      />
      <img
        src={face}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
        }}
        alt="face"
      />
      <img
        src={eyes}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
        }}
        alt="eyes"
      />
      <img
        src={nose}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
        }}
        alt="nose"
      />
      <img
        src={mouth}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
        }}
        alt="mouth"
      />
    </div>
  );
};

export default AvatarComponent;
