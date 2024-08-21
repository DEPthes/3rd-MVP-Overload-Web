import { useState } from "react";
import {
  AVATARANIMALLIST,
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

const AvatarPage = () => {
  const navigate = useNavigate();
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

  //무작위
  const handleRandomAvatar = () => {
    setAvatar({
      body: AVATARANIMALLIST.body[
        Math.floor(Math.random() * AVATARANIMALLIST.body.length)
      ],
      eyes: AVATARANIMALLIST.eyes[
        Math.floor(Math.random() * AVATARANIMALLIST.eyes.length)
      ],
      face: AVATARANIMALLIST.face[
        Math.floor(Math.random() * AVATARANIMALLIST.face.length)
      ],
      mouth:
        AVATARANIMALLIST.mouth[
          Math.floor(Math.random() * AVATARANIMALLIST.mouth.length)
        ],
      nose: AVATARANIMALLIST.nose[
        Math.floor(Math.random() * AVATARANIMALLIST.nose.length)
      ],
    });
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

  console.log(currentImages, maxPage, currentPage);

  const isImageSelected = (image: string): boolean => {
    return Object.values(avatar).includes(image);
  };

  const handleSubmitAvatar = async () => {
    try {
      const response = await putAvatar({
        avatarFace: avatar.face.toString(),
        avatarBody: avatar.body.toString(),
        avatarEyes: avatar.eyes.toString(),
        avatarNose: avatar.nose.toString(),
        avatarMouth: avatar.mouth.toString(),
      });
      navigate("/MyPage");
    } catch (error) {
      // 업로드 실패 시 에러 출력
      console.error("Error uploading image:", error);
    }
  };

  return (
    <>
      <AvatarNav onClick={handleSubmitAvatar} />
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
    </>
  );
};

export default AvatarPage;
function useMember() {
  throw new Error("Function not implemented.");
}
