
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Nav from "../components/Nav";
import PostDetailView from "../components/PostDetailView";
import MyComment from "../components/MyComment";
import Comment from "../components/Comment";
import SearchModal from '../components/search/SearchModal';
import defaultProfile from "../images/defaultProfile.png";
import "../style/viewDetailPost.css";
import api from "../api/index";

type viewDetail = {
  handleHeartClick:()=>void;
  selectedHeart:boolean;
}
// 상세 게시글 페이지
const ViewDetailPost: React.FC<viewDetail> = (props) => {
    const { postId } = useParams<{ postId: string }>();
    const [isSearchModalOpen, setIsSearchModalOpen] = useState<boolean>(false);
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [post, setPost] = useState<any | null>(null);
    const [member, setMember] = useState<any | null>(null);
    const [comments, setComments] = useState<any[] | null>([]);
    const [isToken, setIsToken] = useState(false);
    const [selectedHeart, setSelectedHeart] = useState<boolean>(false);
    const [selectedScrap, setSelectedScrap] = useState<boolean>(false);

    useEffect(() => {
        const token = sessionStorage.getItem("token");
        if (token) {
            setIsToken(true);
        }

        const numericPostId = Number(postId);

        // 상세 게시글 데이터 가져오기
        api.get(`/posts/details/${numericPostId}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
            })
            .then((response) => {
                const data = response.data.data;
                setPost(data);
                console.log(data);
            })
            .catch((error) => {
                console.error("게시글 데이터 가져오기 오류:", error);
            });
            
        // 멤버 데이터 가져오기
        api.get(`/members`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            .then((response) => {
                const member = response.data.data;
                setMember(member);
                console.log(member)
            })
            .catch((error) => {
                console.error("회원 데이터 가져오기 오류:", error.response ? error.response.data : error.message);
                console.log(member)
            });

        // 댓글 데이터 가져오기
        api.get(`/comments/posts/${numericPostId}`)
            .then((response) => {
                const comment = response.data.data;
                setComments(comment);
            })
            .catch((error) => {
                console.error("댓글 데이터 가져오기 오류:", error);
            });

    }, [postId]);

    const handleSearch = (term: string) => {
        setSearchTerm(term);
        setIsSearchModalOpen(false);
    };

    const handleHeartClick = () => {
      setSelectedHeart(!selectedHeart);
    };

    const handleScrapClick = () => {
        setSelectedScrap(!selectedScrap);
    };

    if (!post) {
        return <div>게시글을 찾을 수 없습니다</div>;
    }

    return (
        <>
            <Nav 
                onSearchClick={() => setIsSearchModalOpen(true)} 
                profile={member?.avatar || undefined}
            />

            <div className="total">
                <div className="detail-post">
                    <PostDetailView
                        id={Number(postId)}
                        title={post.title}
                        content={post.content}
                        date={post.createdDate}
                        writer={post.writerInfo.name}
                        part={post.writerInfo.part}
                        profile={post.writerInfo.avatar? post.writerInfo.avatar : undefined}
                        view={post.viewCount}
                        like={post.likeCount}
                        liked={post.liked}
                        mine={post.mine}
                        scrap={post.scrapCount}
                        handleHeartClick={isToken ? handleHeartClick : undefined}
                        handleScrapClick={isToken ? handleScrapClick : undefined}
                        selectedHeart={isToken ? selectedHeart : undefined}
                        selectedScrap={isToken ? selectedScrap : undefined}
                        tag={post.tagNameList || []}
                        
                    />
                </div>

                {isToken && (
                    <div className="detail-mycomment">
                        <MyComment
                            profile={member?.avatar || undefined}
                            name={member?.memberName || ""}
                            postId={Number(postId)} // postId 전달
                        />
                    </div>
                )}

                <div className="detail-comment">
                    <ul>
                        <Comment
                            comments={comments || []}
                            myProfile={member?.avatar || defaultProfile}
                            myName={member?.memberName || ""}
                            postId={Number(postId)}
                        />
                    </ul>
                </div>
            </div>

            {isSearchModalOpen && <SearchModal onClose={() => setIsSearchModalOpen(false)} onSearch={handleSearch} />}
        </>
    );
};

export default ViewDetailPost;
