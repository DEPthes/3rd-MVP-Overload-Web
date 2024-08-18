import SavePost from "./SavePost";
import "../../style/postPage/saveModal.css";
import { useGetTemps } from "../../hooks/post/useGetTemps";

const SaveModal = ({ onClick }: { onClick: () => void }) => {
  const { data } = useGetTemps();

  return (
    <div className="saveModalContainer">
      <span className="header">임시저장 게시글</span>
      <div className="savePostContainer">
        {data.data.map((post, index) => (
          <SavePost
            key={index}
            id={post.id.toString()}
            title={post.title}
            date={post.createdDate.toString()}
          />
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
