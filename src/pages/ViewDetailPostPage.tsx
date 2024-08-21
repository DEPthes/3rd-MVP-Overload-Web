import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Nav from "../components/Nav";
import PostDetailView from "../components/PostDetailView";
import MyComment from "../components/MyComment";
import Comment from "../components/Comment";
import SearchModal from "../components/search/SearchModal";
import defaultProfile from "../images/defaultProfile.png";
import "../style/viewDetailPost.css";
import api from "../api/index";
import { useMember } from "../hooks/useMember";

const ViewDetailPost: React.FC = () => {
  const { postId } = useParams<{ postId: string }>();
  const [isSearchModalOpen, setIsSearchModalOpen] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [post, setPost] = useState<any | null>(null);
  const [member, setMember] = useState<any | null>(null);
  const [comments, setComments] = useState<any[] | null>([]);
  const [isToken, setIsToken] = useState(false);
  const [selectedHeart, setSelectedHeart] = useState<boolean>(false);
  const [selectedScrap, setSelectedScrap] = useState<boolean>(false);

  const fetchComments = async () => {
    try {
      const response = await api.get(`/comments/posts/${postId}`);
      setComments(response.data.data);
    } catch (error) {
      console.error("댓글 목록 가져오기 오류:", error);
    }
  };

  console.log(member);

  useEffect(() => {
    const token = localStorage.getItem("token")
      ? localStorage.getItem("token")
      : sessionStorage.getItem("token");
    if (token) {
      setIsToken(true);
    }

    const numericPostId = Number(postId);

    // 상세 게시글 데이터 가져오기
    api
      .get(`/posts/details/${numericPostId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        const data = response.data.data;
        setPost(data);
        console.log(data);
      })
      .catch((error) => {
        console.error("게시글 데이터 가져오기 오류:", error);
      });
    console.log(post);

    // 멤버 데이터 가져오기
    api
      .get(`/members`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        const member = response.data.data;
        setMember(member);
      })
      .catch((error) => {
        console.error(
          "회원 데이터 가져오기 오류:",
          error.response ? error.response.data : error.message
        );
      });

    // 댓글 데이터 가져오기 호출 추가
    fetchComments();
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
            profile={
              post.writerInfo.avatar ? post.writerInfo.avatar : undefined
            }
            view={post.viewCount}
            like={post.likeCount}
            liked={post.liked}
            scraped={post.scraped}
            mine={post.mine}
            scrap={post.scrapCount}
            generation={post.writerInfo.generation}
            handleHeartClick={isToken ? handleHeartClick : undefined}
            handleScrapClick={isToken ? handleScrapClick : undefined}
            selectedHeart={isToken ? selectedHeart : undefined}
            selectedScrap={isToken ? selectedScrap : undefined}
            tag={post.tagNameList || []}
            avatar={post.writerInfo.avatar}
          />
        </div>

        {
          <div className="detail-mycomment">
            <MyComment
              profile={member?.avatar}
              name={member?.memberName || ""}
              postId={Number(postId)}
              refreshComments={fetchComments}
            />
          </div>
        }
        <div className="detail-comment">
          <ul>
            <Comment
              comments={comments || []}
              myProfile={post.writerInfo.avatar}
              myName={member?.memberName || ""}
              postId={Number(postId)}
              refreshComments={fetchComments}
            />
          </ul>
        </div>
      </div>

      {isSearchModalOpen && (
        <SearchModal
          onClose={() => setIsSearchModalOpen(false)}
          onSearch={handleSearch}
        />
      )}
    </>
  );
};

export default ViewDetailPost;
