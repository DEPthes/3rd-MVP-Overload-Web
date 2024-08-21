import { useState } from "react";
import {
  AVATARANIMALLIST,
  AVATARANIMALLISTSTRING,
  AVATARHEADER,
  AVATARRANDOMBUTTONSPAN,
  ITEMS_PER_PAGE,
} from "../../constants/avatar";
import ".././../style/avatar/avatarPage.css";
import matchAvatarHeader from "../../util/matchAvatarHeader";
import AvatarCard from "../../components/avatarPage/AvatarCard";
import AvatarComponent from "../../components/avatarPage/AvatarComponent";
import AvatarNav from "../../components/avatarPage/AvatarNav";
import { NextButton } from "../../assets";
import { putAvatar } from "../../api/avatar";
import { useNavigate } from "react-router-dom";
import { getImageByString } from "../../util/getImageByString";

const AvatarPage = () => {
  const navigate = useNavigate();
  const [avatarHeader, setAvatarHeader] = useState<string>(AVATARHEADER[0]);
  const [avatar, setAvatar] = useState({
    body: AVATARANIMALLISTSTRING.body[0],
    eyes: AVATARANIMALLISTSTRING.eyes[0],
    face: AVATARANIMALLISTSTRING.face[0],
    mouth: AVATARANIMALLISTSTRING.mouth[0],
    nose: AVATARANIMALLISTSTRING.nose[0],
  });
  const [currentPage, setCurrentPage] = useState<number>(0);

  const handleHeaderChange = (header: string) => {
    setAvatarHeader(header);
    setCurrentPage(0); // Reset to first page when header changes
  };

  //무작위
  const handleRandomAvatar = () => {
    setAvatar({
      body: AVATARANIMALLISTSTRING.body[
        Math.floor(Math.random() * AVATARANIMALLIST.body.length)
      ],
      eyes: AVATARANIMALLISTSTRING.eyes[
        Math.floor(Math.random() * AVATARANIMALLIST.eyes.length)
      ],
      face: AVATARANIMALLISTSTRING.face[
        Math.floor(Math.random() * AVATARANIMALLIST.face.length)
      ],
      mouth:
        AVATARANIMALLISTSTRING.mouth[
          Math.floor(Math.random() * AVATARANIMALLIST.mouth.length)
        ],
      nose: AVATARANIMALLISTSTRING.nose[
        Math.floor(Math.random() * AVATARANIMALLIST.nose.length)
      ],
    });
    console.log(avatar);
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

  console.log("avatar", avatar);

  const selectedImages =
    AVATARANIMALLISTSTRING[matchAvatarHeader(avatarHeader)];
  const maxPage = Math.ceil(selectedImages.length / ITEMS_PER_PAGE) - 1;
  const startIndex = currentPage * ITEMS_PER_PAGE;
  const currentImages = selectedImages.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );

  const isImageSelected = (image: string): boolean => {
    return Object.values(avatar).includes(image);
  };

  const handleSubmitAvatar = async () => {
    try {
      const response = await putAvatar({
        avatarFace: avatar.face,
        avatarBody: avatar.body,
        avatarEyes: avatar.eyes,
        avatarNose: avatar.nose,
        avatarMouth: avatar.mouth,
      });
      navigate("/MyPage");
    } catch (error) {
      // 업로드 실패 시 에러 출력
      console.error("Error uploading image:", error);
    }
  };

  console.log(avatar);
  return (
    <>
      <AvatarNav onClick={handleSubmitAvatar} />
      <div className="avatarMainContainer">
        <AvatarComponent
          width="270px"
          height="270px"
          face={getImageByString(avatar.face)}
          body={getImageByString(avatar.body)}
          eyes={getImageByString(avatar.eyes)}
          nose={getImageByString(avatar.nose)}
          mouth={getImageByString(avatar.mouth)}
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
            <span className="avatarRandomButton" onClick={handleRandomAvatar}>
              {AVATARRANDOMBUTTONSPAN}
            </span>
          </div>
          {/* 아바타 */}
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
                image={getImageByString(image)}
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
    </>
  );
};

export default AvatarPage;
function useMember() {
  throw new Error("Function not implemented.");
}
