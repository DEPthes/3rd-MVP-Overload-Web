import { useState } from "react";
import {
  AVATARANIMALLIST,
  AVATARHEADER,
  AVATARRANDOMBUTTONSPAN,
  ITEMS_PER_PAGE,
} from "../../constants/avatar";
import ".././../style/avatar/avatarPage.css";
import matchAvatarHeader from "../../util/matchAvatarHeader";
import { NextButton } from "../../assets";
import AvatarCard from "../../components/avatarPage/AvatarCard";
import AvatarComponent from "../../components/avatarPage/AvatarComponent";

const AvatarPage = () => {
  const [avatarHeader, setAvatarHeader] = useState<string>(AVATARHEADER[0]);
  const [avatar, setAvatar] = useState({
    body: AVATARANIMALLIST.body[0],
    eyes: AVATARANIMALLIST.eyes[0],
    face: AVATARANIMALLIST.face[0],
    mouth: AVATARANIMALLIST.mouth[0],
    nose: AVATARANIMALLIST.nose[0],
  });
  const [currentPage, setCurrentPage] = useState<number>(0);

  const handleHeaderChange = (header: string) => {
    setAvatarHeader(header);
    setCurrentPage(0); // Reset to first page when header changes
  };

  const handleSelectAvatar = (value: string) => {
    setAvatar((prevAvatar) => ({
      ...prevAvatar,
      [matchAvatarHeader(avatarHeader)]: value,
    }));
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, maxPage));
  };

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 0));
  };

  const selectedImages = AVATARANIMALLIST[matchAvatarHeader(avatarHeader)];
  const maxPage = Math.ceil(selectedImages.length / ITEMS_PER_PAGE) - 1;
  const startIndex = currentPage * ITEMS_PER_PAGE;
  const currentImages = selectedImages.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );

  const isImageSelected = (image: string): boolean => {
    return Object.values(avatar).includes(image);
  };

  return (
    <div className="avatarMainContainer">
      <AvatarComponent
        width="270px"
        height="270px"
        face={avatar.face}
        body={avatar.body}
        eyes={avatar.eyes}
        nose={avatar.nose}
        mouth={avatar.mouth}
      />
      <div className="avatarSelectContainer">
        <div className="avatarHeader">
          <div className="avatarHeaderLeftOption">
            {AVATARHEADER.map((header, index) => (
              <div
                className={`menu ${
                  avatarHeader === header ? "activate" : "inactivate"
                }`}
                key={index}
                onClick={() => handleHeaderChange(header)}
              >
                {header}
              </div>
            ))}
          </div>
          <span className="avatarRandomButton">{AVATARRANDOMBUTTONSPAN}</span>
        </div>
        <div
          className={`avatarCardWrap ${
            currentPage === 0 && "avatarSecondPage"
          }`}
        >
          {currentPage !== 0 && (
            <NextButton
              className="avatarPrevButton"
              onClick={handlePrevPage}
              style={{
                cursor: "pointer",
              }}
            />
          )}

          {currentImages.map((image, index) => (
            <AvatarCard
              key={index}
              image={image}
              onclick={handleSelectAvatar}
              selected={isImageSelected(image)}
            />
          ))}
          {currentPage !== maxPage && (
            <NextButton
              className="avatarPrevButton"
              style={{
                transform: "rotate(180deg)", // Inline style to rotate 180 degrees
                cursor: "pointer",
              }}
              onClick={handleNextPage}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default AvatarPage;
