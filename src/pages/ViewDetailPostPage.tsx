
import { useParams } from "react-router-dom";
import Nav from "../components/Nav";
import PostDetailView from "../components/PostDetailView";
import MyComment from "../components/MyComment";
import Comment from "../components/Comment";
import dummy from "../assets/soyeon-dummydata.json";
import dummyProfile from "../assets/profileInfo-dummydata.json";
import dummyComment from "../assets/comment-dummydata.json";

import "../style/viewDetailPost.css";

// 상세 게시글 페이지

const ViewDetailPost: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const post = dummy.find(item => item.id === id);


    if (!post) {
        return <div>Post not found</div>;
    }

    return (
        <>
            <Nav />

            <div className="total">
                <div className="detail-post">
                    <PostDetailView
                        title={post.title}
                        content={post.content}
                        date={post.date}
                        writer={post.writer}
                        part={post.part}
                        profile={post.profile}

                        view={post.view}
                        like={post.like}
                        scrap={post.scrap}
                        tag={["기획 스터디", "재미있어요", "짱", "hello", "hi~~"]}
                        picture={post.picture}
                    />
                </div>
                <div className="detail-mycomment">
                    <MyComment
                        profile={dummyProfile.profile}
                        name={dummyProfile.name}
                    />
                </div>
                <div className="detail-comment">
                    <ul>
                    {dummyComment.map((c, index) => (
                        <li key={index}>
                            <Comment
                                id={c.commentid}
                                profile={c.profile}
                                nickname={c.nickname}
                                date={c.date}
                                comment={c.comment}
                                myProfile={dummyProfile.profile}
                                myName={dummyProfile.name}
                            />
                        </li>
                    ))}
                    </ul>
                </div>
            </div>

        </>
    );
};

export default ViewDetailPost;
