import SavePost from "./SavePost";
import "../../style/postPage/saveModal.css";
import { Temp } from "../../types/temps";
import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";

const SaveModal = ({
  onClick,
  temps,
  setTemp,
}: {
  onClick: () => void;
  temps: Temp[];
  setTemp: () => void;
}) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const id = searchParams.get("id");

  useEffect(() => {
    if (!id) {
      searchParams.set("id", decodeURIComponent("1"));
      setSearchParams(searchParams);
    }
  }, [searchParams, setSearchParams, id]);

  const handleLoadClick = () => {
    setTemp();

    onClick();
  };

  const handleGetSelectedId = (selectedId: any) => {
    searchParams.set("id", decodeURIComponent(selectedId));
    setSearchParams(searchParams);
  };

  return (
    <div className="saveModalContainer">
      <span className="header">임시저장 게시글</span>
      <div className="savePostContainer">
        {temps.map((post, index) => (
          <SavePost
            key={index}
            id={post.id.toString()}
            title={post.title}
            date={post.createdDate.toString()}
            setSelectedId={handleGetSelectedId}
          />
        ))}
      </div>
      <div className="saveModalFooter">
        <span className="saveModalOpenButton" onClick={handleLoadClick}>
          불러오기
        </span>
        <span className="saveModalCloseButton" onClick={onClick}>
          닫기
        </span>
      </div>
    </div>
  );
};

export default SaveModal;
