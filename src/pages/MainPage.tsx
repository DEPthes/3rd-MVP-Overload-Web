
import React, { useState } from 'react';
import Nav from "../components/Nav";
import Banner from "../components/Banner";
import PostType from '../components/PostType';
import PostPreview from "../components/PostPreview";
import Footer from '../components/Footer';

import dummy from "../assets/soyeon-dummydata.json";
import "../style/mainPage.css";

// MainPage

const MainPage: React.FC = () => {
    const [selectedCategory, setSelectedCategory] = useState<string>('전체');
    const [selectedPage, setSelectedPage] = useState<number>(1);

    const postsPerPage = 10;

    const handleCategoryChange = (category: string) => {
        setSelectedCategory(category);
        setSelectedPage(1);
    };

    // 카테고리에 따라 필터링된 게시물을 역순으로 배열
    const filteredPosts = dummy
        .filter((item) => {
            return selectedCategory === '전체' || item.category === selectedCategory;
        })
        .reverse(); // 게시물의 순서를 반대로 정렬

    const startIndex = (selectedPage - 1) * postsPerPage;
    const currentPosts = filteredPosts.slice(startIndex, startIndex + postsPerPage);

    const handlePageChange = (pageNumber: number) => {
        setSelectedPage(pageNumber);
    };

    return (
        <>
            <div className="main-total">
                {/* navbar */}
                <Nav />


                {/* banner */}
                <Banner />

                <div>
                    <PostType 
                        category={selectedCategory} 
                        onCategoryChange={handleCategoryChange} 
                    />
                </div>

                {/* preview 영역 */}
                <div className="post-preview">
                    <ul>
                        {currentPosts.map((item, index) => (
                            <li key={index} className="post-preview-item">
                                <PostPreview 
                                    id={item.id}
                                    title={item.title}
                                    content={item.content}
                                    date={item.date}
                                    writer={item.writer}
                                    view={item.view}
                                    like={item.like}
                                    scrap={item.scrap}
                                    profile={item.profile}
                                    picture={item.picture ? item.picture : undefined}
                                />
                            </li>
                        ))}
                    </ul>
                </div>

                {/* 페이지 이동 영역 */}
                <Footer 
                    totalPosts={filteredPosts.length} 
                    postsPerPage={postsPerPage} 
                    selectedPage={selectedPage} 
                    onPageChange={handlePageChange}
                />

            </div>
        </>
    );
};

export default MainPage;
