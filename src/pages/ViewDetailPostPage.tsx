import React, { useState } from "react";
import { useParams } from "react-router-dom";
import Nav from "../components/Nav";
import PostDetailView from "../components/PostDetailView";
import SearchModal from '../components/SearchModal';
import dummy from "../assets/soyeon-dummydata.json";
import "../style/viewDetailPost.css";

// 상세 게시글 페이지

const ViewDetailPost: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [isSearchModalOpen, setIsSearchModalOpen] = useState<boolean>(false);
    const [searchTerm, setSearchTerm] = useState<string>('');
    const post = dummy.find(item => item.id === id);

    const handleSearch = (term: string) => {
        setSearchTerm(term);
        setIsSearchModalOpen(false);
    };

    if (!post) {
        return <div>Post not found</div>;
    }

    return (
        <>
            <Nav onSearchClick={() => setIsSearchModalOpen(true)} />
            <div className="total">
                <div className="detail-post">
                    <PostDetailView
                        title={post.title}
                        content={post.content}
                        date={post.date}
                        writer={post.writer}
                        view={post.view}
                        like={post.like}
                        scrap={post.scrap}
                        tag={["기획 스터디", "재미있어요", "짱", "hello", "hi~~"]}
                        picture={post.picture}
                    />
                </div>
                <div>
                    {/* <댓글/> */}
                </div>
            </div>

            {isSearchModalOpen && <SearchModal onClose={() => setIsSearchModalOpen(false)} onSearch={handleSearch}/>}
        </>
    );
};

export default ViewDetailPost;
