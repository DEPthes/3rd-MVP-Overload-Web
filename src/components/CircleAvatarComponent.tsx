import React from "react";
import AvatarComponent from "./avatarPage/AvatarComponent";
import { AvatarComponentProps } from "../types/avatar";
import "../style/circleAvatarComponent.css";
import { getImageByString } from "../util/getImageByString";

const CircleAvatarComponent: React.FC<AvatarComponentProps> = ({
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
      className="circleAvatarComponent"
      style={{
        width: width,
        height: height,
      }}
    >
      <div
        style={{
          width: "100%",
          height: "100%",
          transform: "scale(1.05)", // 요소를 1.2배 확대
        }}
      >
        <AvatarComponent
          width={width}
          height={height}
          face={getImageByString(face)}
          body={getImageByString(body)}
          eyes={getImageByString(eyes)}
          nose={getImageByString(nose)}
          mouth={getImageByString(mouth)}
        />
      </div>
    </div>
  );
};

export default CircleAvatarComponent;
