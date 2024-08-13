import "../../style/postPage/savePost.css";

const SavePost = ({
  id,
  title,
  date,
}: {
  id: string;
  title: string;
  date: string;
}) => {
  return (
    <div className="savePostMainContainer">
      <div className="leftContainer">
        <input className="radioButton" type="radio" id={id} name="select" />
        <span className="title">{title}</span>
      </div>
      <div className="rightContainer">
        <span className="date">{date}</span>
      </div>
    </div>
  );
};

export default SavePost;
