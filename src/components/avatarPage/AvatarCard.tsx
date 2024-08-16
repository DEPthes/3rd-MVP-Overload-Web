import React from "react";
import "../../style/avatar/avatarCard.css";

// AvatarCardProps 인터페이스 정의
interface AvatarCardProps {
  image: string;
  onclick: (value: string) => void; // 클릭 시 문자열을 인자로 받는 함수
  selected: boolean; // 선택된 상태를 나타내는 boolean
}

const AvatarCard: React.FC<AvatarCardProps> = ({
  image,
  onclick,
  selected,
}) => {
  return (
    <div
      className={`avatarCardContainer ${selected ? "selected" : ""}`} // 선택된 상태에 따라 클래스 추가
      onClick={() => onclick(image)}
    >
      <img src={image} alt="Avatar" />
    </div>
  );
};

export default AvatarCard;
