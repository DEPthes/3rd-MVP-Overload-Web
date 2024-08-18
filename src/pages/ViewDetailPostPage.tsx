import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Nav from "../components/Nav";
import PostDetailView from "../components/PostDetailView";
import MyComment from "../components/MyComment";
import Comment from "../components/Comment";
import SearchModal from '../components/SearchModal';
import "../style/viewDetailPost.css";
import api from "../api";

// 상세 게시글 페이지

const ViewDetailPost: React.FC = () => {
    const { postId } = useParams<{ postId: string }>();
    const [isSearchModalOpen, setIsSearchModalOpen] = useState<boolean>(false);
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [post, setPost] = useState<any | null>(null);
    const [profile, setProfile] = useState<any | null>(null);
    const [comments, setComments] = useState<any[]>([]);

    useEffect(() => {

        // 상세 게시글 데이터 가져오기
        api.get(`/posts/details/${postId}`)
            .then((response) => {
                const data = response.data.data;
                console.log(data);
                setPost(data.post || {});
                setProfile(data.profile || {});
                setComments(data.comments || []);
            })
            .catch((error) => {
                console.log(postId)
                console.error("Error fetching post data:", error);
            });
    }, [postId]);

    const handleSearch = (term: string) => {
        setSearchTerm(term);
        setIsSearchModalOpen(false);
    };

    if (!post) {
        return <div>Post not found</div>;
    }

    return (
        <>
            <Nav onSearchClick={() => setIsSearchModalOpen(true)}/>

            <div className="total">
                <div className="detail-post">
                    <PostDetailView
                        title={post.title}
                        content={post.content}
                        date={post.createDate}
                        writer={post.name}
                        part={post.part}
                        profile={post.writerInfo.avatar}

                        view={post.viewCount}
                        like={post.likeCount}
                        scrap={post.scrapCount}
                        tag={post.tagNameList || []}
                        // 수정필요
                        picture={post.writerInfo.avatar}
                    />
                </div>
                {profile && (
                    <div className="detail-mycomment">
                        <MyComment
                            profile={profile.profile}
                            name={profile.name}
                        />
                    </div>
                )}
                <div className="detail-comment">
                    <ul>
                        {comments.map((c, index) => (
                            <li key={index}>
                                <Comment
                                    id={c.commentid}
                                    profile={c.profile}
                                    nickname={c.nickname}
                                    date={c.date}
                                    comment={c.comment}
                                    myProfile={profile?.profile}
                                    myName={profile?.name}
                                />
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
            
            {isSearchModalOpen && <SearchModal onClose={() => setIsSearchModalOpen(false)} onSearch={handleSearch}/>}
        </>
    );
};

export default ViewDetailPost;
