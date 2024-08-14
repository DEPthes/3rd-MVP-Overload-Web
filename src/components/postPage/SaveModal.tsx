import SavePost from "./SavePost";
import "../../style/postPage/saveModal.css";

const SaveModal = ({ onClick }: { onClick: () => void }) => {
  const dummyDate = [
    { id: "1", title: "게시글 제목", date: "20243.08.07" },
    { id: "2", title: "게시글 제목", date: "20243.08.07" },
    { id: "3", title: "게시글 제목", date: "20243.08.07" },
  ];

  return (
    <div className="saveModalContainer">
      <span className="header">임시저장 게시글</span>
      <div className="savePostContainer">
        {dummyDate.map((post) => (
          <SavePost id={post.id} title={post.title} date={post.date} />
        ))}
      </div>
      <div className="saveModalFooter">
        <span className="saveModalOpenButton">불러오기</span>
        <span className="saveModalCloseButton" onClick={onClick}>
          닫기
        </span>
      </div>
    </div>
  );
};

export default SaveModal;
