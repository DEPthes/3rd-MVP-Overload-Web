import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Nav from "../components/Nav";
import PostDetailView from "../components/PostDetailView";
import MyComment from "../components/MyComment";
import Comment from "../components/Comment";
import SearchModal from '../components/SearchModal';
import defaultProfile from "../images/defaultProfile.png";
import "../style/viewDetailPost.css";
import api from "../api";

// 상세 게시글 페이지

const ViewDetailPost: React.FC = () => {
    const { postId } = useParams<{ postId: string }>();
    const [isSearchModalOpen, setIsSearchModalOpen] = useState<boolean>(false);
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [post, setPost] = useState<any | null>(null);
    const [member, setMember] = useState<any | null>(null);
    const [comments, setComments] = useState<any[]>([]);
    const [isToken, setIsToken] = useState(false);

    useEffect(() => {
        const token = sessionStorage.getItem("accessToken");
        if(token){
            setIsToken(!isToken);
        }
        
        const numericPostId = Number(postId);
        // 상세 게시글 데이터 가져오기
        api.get(`/posts/details/${numericPostId}`)
            .then((response) => {
                const data = response.data.data;
                console.log(data);
                setPost(data);
            })
            .catch((error) => {
                console.log(typeof(numericPostId))
                console.log(sessionStorage.getItem("token"));
                console.error("Error fetching post data:", error);
            });

        // api.get(`/members`)
        //     .then((response)=>{
        //         const member = response.data;
        //         console.log(member);
        //         setMember(member);
        //     })
        //     .catch((error)=>{
        //         console.error("Error fetching post data:", error);
        //     })

        api.get(`/comments/posts/${numericPostId}`)
            .then((response3)=>{
                const comment = response3.data.data;
                console.log(comment);
                setComments(comment);
            }).catch((error)=>{
                console.log("Error")
            }
        )
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
                    date={post.createdDate} 
                    writer={post.writerInfo.name}
                    part={post.writerInfo.part} 
                    profile={post.writerInfo.avatar?.avatarFace ? post.writerInfo.avatar.avatarFace : undefined}
                    view={post.viewCount}
                    like={post.likeCount}
                    scrap={post.scrapCount}
                    tag={post.tagNameList || []}
                />

                </div>
                {/* {isToken && (
                    <div className="detail-mycomment">
                        <MyComment
                            profile={member.avatar || []? member.avatar || []:defaultProfile}
                            name={member.memberName}
                        />
                    </div>
                )} */}
                {/* <div className="detail-comment">
                    <ul>
                        {comments.map((c, index) => (
                            <li key={index}>
                                <Comment
                                    id={comments.commentid}
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
                </div> */}
            </div>
            
            {isSearchModalOpen && <SearchModal onClose={() => setIsSearchModalOpen(false)} onSearch={handleSearch}/>}
        </>
    );
};

export default ViewDetailPost;
