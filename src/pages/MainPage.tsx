
import React, { useEffect, useState } from 'react';
import Nav from "../components/Nav";
import Banner from "../components/Banner";
import PostType from '../components/PostType';
import PostPreview from "../components/PostPreview";
import Footer from '../components/Footer';
import SearchModal from '../components/SearchModal';

import "../style/mainPage.css";
import api from '../api';

// MainPage

const MainPage: React.FC = () => {
    const [selectedCategory, setSelectedCategory] = useState<string>('전체');
    const [selectedPage, setSelectedPage] = useState<number>(1);
    const [isSearchModalOpen, setIsSearchModalOpen] = useState<boolean>(false);
    const [posts, setPosts] = useState<any[]>([]);
    const [searchTerm, setSearchTerm] = useState<string>('');
    const postsPerPage = 10;

    useEffect(() => {
        const endpoint = selectedCategory === 'ALL' ? '/posts/all' : `/posts/${selectedCategory}`;

        api.get(endpoint)
            .then((response) => {
                console.log(response.data);
                const { dataList } = response.data.data;
                setPosts(dataList); 
            })
            .catch(error => {
                console.error("Error", error);
            });
    }, [selectedCategory]);

    const handleCategoryChange = (category: string) => {
        setSelectedCategory(category);
        setSelectedPage(1);
    };

    const handleSearch = (term: string) => {
        setSearchTerm(term);
        setIsSearchModalOpen(false);
    };

    // 카테고리에 따라 필터링된 게시물을 역순으로 배열
    const filteredPosts = posts;

    const startIndex = (selectedPage - 1) * postsPerPage;
    const currentPosts = filteredPosts.slice(startIndex, startIndex + postsPerPage);

    const handlePageChange = (pageNumber: number) => {
        setSelectedPage(pageNumber);
    };

    return (
        <>
            <div className="main-total">
                {/* navbar */}
                <Nav onSearchClick={() => setIsSearchModalOpen(true)}/>


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
                                    content={item.previewContent}
                                    date={item.createdDate}
                                    writer={item.name}
                                    view={item.viewCount}
                                    like={item.likeCount}
                                    scrap={item.scrapCount}
                                    // profile={item.profile}
                                    picture={item.previewImage ? item.previewImage : undefined}
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

                {isSearchModalOpen && (
                    <SearchModal 
                        onClose={() => setIsSearchModalOpen(false)} 
                        onSearch={handleSearch} 
                    />
                )}    

            </div>
        </>
    );
};

export default MainPage;
