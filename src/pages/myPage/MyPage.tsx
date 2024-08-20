import { Link, useNavigate } from "react-router-dom";
import CircleAvatarComponent from "../../components/CircleAvatarComponent";
import MyPageNav from "../../components/myPage/MyPageNav";
import { AVATARANIMALLIST } from "../../constants/avatar";
import "../../style/myPage/myPage.css";
import { useGetScraps } from "../../hooks/useGetScraps";
import { useState, useEffect } from "react";
import PostPreview from "../../components/PostPreview";
import { PageNextButton } from "../../assets";
import { LogOutReq } from "../../api/LogInReq";
import AuthModa from "../../components/AuthModa";
import { useMutation } from "@tanstack/react-query";
import { ExitReq } from "../../api/Exit";
import { useMember } from "../../hooks/useMember";

const MyPage = () => {
  const navigate = useNavigate();
  const [page, setPage] = useState<number>(1);
  const [pageList, setPageList] = useState<number[]>([]);
  const { data, refetch } = useGetScraps(page);
  const totalPage = data.data.pageInfo.totalPage;
  const [isLogoutModal, setIsLogoutModal] = useState<boolean>(false);
  const [isExitModal, setIsExitModal] = useState<boolean>(false);
  const memberData = useMember();
  console.log(data.data.dataList);

  const { mutate: logout } = useMutation({
    mutationFn: async () => {
      let accessToken = localStorage.getItem("token");
      let refreshToken = localStorage.getItem("refreshToken");

      if (!accessToken || !refreshToken) {
        accessToken = sessionStorage.getItem("token");
        refreshToken = sessionStorage.getItem("refreshToken");
      }

      if (accessToken && refreshToken) {
        await LogOutReq({ accessToken, refreshToken });
        // 로그아웃 성공 후 토큰 제거
        localStorage.removeItem("token");
        localStorage.removeItem("refreshToken");
        sessionStorage.removeItem("token");
        sessionStorage.removeItem("refreshToken");
      } else {
        throw new Error("토큰이 없습니다.");
      }
    },
    onSuccess: () => {
      navigate("/");
    },
    onError: (error) => {
      console.error("로그아웃 실패:", error);
    },
  });

  const { mutate: exit } = useMutation({
    mutationFn: async () => {
      let accessToken = localStorage.getItem("token");
      let refreshToken = localStorage.getItem("refreshToken");

      if (!accessToken || !refreshToken) {
        accessToken = sessionStorage.getItem("token");
        refreshToken = sessionStorage.getItem("refreshToken");
      }

      if (accessToken && refreshToken) {
        await ExitReq();
        localStorage.removeItem("token");
        localStorage.removeItem("refreshToken");
        sessionStorage.removeItem("token");
        sessionStorage.removeItem("refreshToken");
      }
    },
    onSuccess: () => {
      navigate("/");
    },
    onError: (error) => {
      console.error("회원탈퇴 실패 실패:", error);
    },
  });

  useEffect(() => {
    const pagesToShow = 5; // 표시할 페이지 수
    const startPage = Math.max(1, page - Math.floor(pagesToShow / 2));
    const endPage = Math.min(totalPage, startPage + pagesToShow - 1);

    const newPageList = [];
    for (let i = startPage; i <= endPage; i++) {
      newPageList.push(i);
    }
    setPageList(newPageList);
    refetch();
  }, [page, totalPage]);

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPage) {
      setPage(newPage);
    }
  };

  const handleOpenLogoutModal = () => {
    setIsLogoutModal(true);
  };

  const handleOpenExitModal = () => {
    setIsExitModal(true);
  };

  const handleLogoutModal = (action: string) => {
    if (action === "yes") {
      logout();
    } else {
      setIsLogoutModal(false);
    }
  };

  const handlExitModal = (action: string) => {
    if (action === "yes") {
      exit();
    } else {
      console.log(action);
      setIsExitModal(false);
    }
  };

  return (
    <>
      <MyPageNav />
      {isLogoutModal && <div className="authoverlay" />}
      {isExitModal && <div className="authoverlay" />}
      {isLogoutModal && (
        <AuthModa
          title="로그아웃 하시겠습니까?"
          handleLogoutModal={handleLogoutModal}
        />
      )}
      {isExitModal && (
        <AuthModa
          title="탈퇴 하시겠습니까?"
          text="회원 탈퇴 시 모든 게시글 및 댓글이<br />영구적으로 삭제되며, 계정 복구가 불가능해요."
          handleLogoutModal={handlExitModal}
        />
      )}
      <div className="myPageContainer">
        {/* 내 정보 */}
        <div className="myInfoContainer">
          <div className="myPageLeftOption">
            {/* 아바타 */}
            <CircleAvatarComponent
              width="154px"
              height="154px"
              body={memberData.data.data.avatar.avatarBody}
              eyes={memberData.data.data.avatar.avatarEyes}
              face={memberData.data.data.avatar.avatarFace}
              mouth={memberData.data.data.avatar.avatarMouth}
              nose={memberData.data.data.avatar.avatarNose}
            />
            <div className="myPageInfo">
              <span className="myPageName">
                {memberData.data.data.memberName}
              </span>
              <span className="myPageSpan">{memberData.data.data.part}</span>
              <span className="myPageSpan">{memberData.data.data.email}</span>
            </div>
          </div>
          <Link to="/avatar">
            <button className="newAvatarButton">아바타 새로 만들기</button>
          </Link>
        </div>

        {/* 스크랩 리스트 */}
        <div className="myPageScrabListContainer">
          <div style={{ width: "100%" }}>
            <span className="scrabListSpan">스크랩 리스트</span>
            {data.data.dataList.map((item) => (
              <div key={item.id}>
                <PostPreview
                  id={item.id}
                  title={item.title}
                  content={item.previewContent}
                  date={item.createdDate}
                  writer={item.name}
                  view={item.viewCount}
                  like={item.likeCount}
                  scrap={item.scrapCount}
                  picture={""}
                  profile={{
                    avatarFace: undefined,
                    avatarBody: undefined,
                    avatarEyes: undefined,
                    avatarNose: undefined,
                    avatarMouth: undefined,
                  }}
                />
                <div style={{ borderBottom: "0.5px solid #8C8C8C" }} />
              </div>
            ))}
          </div>
          <div className="scrabPage">
            <PageNextButton
              onClick={() => handlePageChange(page - 1)}
              stroke={page === 1 ? "#B8B8B8" : "#000000"}
              style={{ cursor: "pointer" }}
            />
            {pageList.map((pageNum) => (
              <div
                key={pageNum}
                onClick={() => handlePageChange(pageNum)}
                style={{ cursor: "pointer" }}
                className={`paginationButton ${
                  page === pageNum ? "active" : ""
                }`}
              >
                {pageNum}
              </div>
            ))}
            <PageNextButton
              onClick={() => handlePageChange(page + 1)}
              stroke={page === totalPage ? "#B8B8B8" : "#000000"}
              style={{ transform: "rotate(180deg)", cursor: "pointer" }}
            />
          </div>
        </div>

        {/* 계정 관리 */}
        <div className="manageInfoContainer">
          <span className="manageInfoHeader">계정 관리</span>
          <div className="outContainer">
            <div className="outContainerLeftOption">
              <span className="OptionHeader">로그아웃</span>
              <span className="Optionspan">{memberData.data.data.email}</span>
              <span className="OptionHeader">탈퇴하기</span>
              <span className="Optionspan">
                회원 탈퇴 시 모든 게시글 및 댓글을 영구적으로 수정 불가능하며,
                계정 복구가 불가능합니다.
              </span>
            </div>
            <div className="outContainerRightOption">
              <button className="logoutButton" onClick={handleOpenLogoutModal}>
                로그아웃
              </button>
              <button className="logoutButton" onClick={handleOpenExitModal}>
                탈퇴하기
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MyPage;
