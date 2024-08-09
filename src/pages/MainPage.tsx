import React, { useState } from 'react';
import Nav from '../components/Nav';
import Banner from '../components/Banner';
import SearchModal from '../components/SearchModal';
import PostType from '../components/PostType';
import PostPreview from '../components/PostPreview';
import Footer from '../components/Footer';
import dummy from '../assets/soyeon-dummydata.json';
import '../style/mainPage.css';

const MainPage: React.FC = () => {
    const [selectedCategory, setSelectedCategory] = useState<string>('전체');
    const [selectedPage, setSelectedPage] = useState<number>(1);
    const [isSearchModalOpen, setIsSearchModalOpen] = useState<boolean>(false);

    const postsPerPage = 10;

    const handleCategoryChange = (category: string) => {
        setSelectedCategory(category);
        setSelectedPage(1);
    };

    const filteredPosts = dummy
        .filter((item) => {
            return selectedCategory === '전체' || item.category === selectedCategory;
        })
        .reverse();

    const startIndex = (selectedPage - 1) * postsPerPage;
    const currentPosts = filteredPosts.slice(startIndex, startIndex + postsPerPage);

    const handlePageChange = (pageNumber: number) => {
        setSelectedPage(pageNumber);
    };

    return (
        <>
            <div className="main-total">
                <Nav onSearchClick={() => setIsSearchModalOpen(true)} />
                <Banner />

                <div>
                    <PostType category={selectedCategory} onCategoryChange={handleCategoryChange} />
                </div>

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
                                    picture={item.picture ? item.picture : undefined}
                                />
                            </li>
                        ))}
                    </ul>
                </div>

                <Footer 
                    totalPosts={filteredPosts.length} 
                    postsPerPage={postsPerPage} 
                    selectedPage={selectedPage} 
                    onPageChange={handlePageChange}
                />

                {isSearchModalOpen && <SearchModal onClose={() => setIsSearchModalOpen(false)} />}
            </div>
        </>
    );
};

export default MainPage;
