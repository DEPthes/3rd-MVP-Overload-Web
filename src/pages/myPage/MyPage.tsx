import { Link } from "react-router-dom";
import CircleAvatarComponent from "../../components/CircleAvatarComponent";
import MyPageNav from "../../components/myPage/MyPageNav";
import { AVATARANIMALLIST } from "../../constants/avatar";
import "../../style/myPage/myPage.css";

const MyPage = () => {
  return (
    <>
      <MyPageNav />
      <div className="myPageContainer">
        {/* 내 정보 session */}
        <div className="myInfoContainer">
          <div className="myPageLeftOption">
            {/* 아바타 */}
            <CircleAvatarComponent
              width="154px"
              height="154px"
              body={AVATARANIMALLIST.body[0]}
              eyes={AVATARANIMALLIST.eyes[0]}
              face={AVATARANIMALLIST.face[0]}
              mouth={AVATARANIMALLIST.mouth[0]}
              nose={AVATARANIMALLIST.nose[0]}
            />
            <div className="myPageInfo">
              <span className="myPageName">Name</span>
              <span className="myPageSpan">part</span>
              <span className="myPageSpan">Email</span>
            </div>
          </div>
          <Link to="/avatar">
            <button className="newAvatarButton">아바타 새로 만들기</button>
          </Link>
        </div>

        {/* 스크랩 리스트 */}
        {/* 계정 관리 */}

        <div className="manageInfoContainer">
          <span className="manageInfoHeader">계정 관리</span>
          <div className="outContainer">
            <div className="outContainerLeftOption">
              <span className="OptionHeader">로그아웃</span>
              <span className="Optionspan">abce@gmail.com</span>
              <span className="OptionHeader">탈퇴하기</span>
              <span className="Optionspan">
                회원 탈퇴 시 모든 게시글 및 댓글을 영구적으로 수정 불가능하며,
                계정 복구가 불가능합니다.
              </span>
            </div>
            <div className="outContainerRightOption">
              <button className="logoutButton">로그아웃</button>
              <button className="logoutButton">탈퇴하기</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MyPage;
