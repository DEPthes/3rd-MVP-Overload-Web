import React, { useEffect, useState } from "react";
import Nav from "../components/Nav";
import Banner from "../components/Banner";
import PostType from "../components/PostType";
import PostPreview from "../components/PostPreview";
import Footer from "../components/Footer";
import SearchModal from "../components/search/SearchModal";

import "../style/mainPage.css";
import api from "../api";
import ViewDetailPost from "./ViewDetailPostPage";

// MainPage
const MainPage: React.FC = () => {

    const [selectedCategory, setSelectedCategory] = useState<string>('전체');
    const [selectedPage, setSelectedPage] = useState<number>(1);
    const [isSearchModalOpen, setIsSearchModalOpen] = useState<boolean>(false);
    const [posts, setPosts] = useState<any[]>([]);
    const [totalPage, setTotalPage] = useState<number>(1);
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [selectedHeart, setSelectedHeart] = useState<boolean>(false);
    const [selectedScrap, setSelectedScrap] = useState<boolean>(false);
    const [isToken, setIsToken] = useState<boolean>(false);
    const [member, setMember] = useState<any|null>(null);
    const postsPerPage = 10;

    useEffect(() => {
        const endpoint = 
            selectedCategory === '전체' ? '/posts/all' :
            selectedCategory === '디자인' ? '/posts/DESIGN' :
            selectedCategory === '기획' ? '/posts/PLAN' :
            selectedCategory === '개발' ? `/posts/SERVER` && `/posts/WEB`&& `/posts/ANDROID` : '';

        const token = sessionStorage.getItem("token");
        if (token) {
            setIsToken(true);
        }

        api.get(endpoint, {
            params: {
                page: selectedPage,  // 현재 페이지 번호를 API 요청에 포함
                size: postsPerPage   // 페이지당 아이템 수를 API 요청에 포함
            }
        })
        .then((response) => {
            const { pageInfo, dataList } = response.data.data;
            setPosts(dataList);
            setTotalPage(pageInfo.totalPage);  // 총 페이지 수 업데이트
        })
        .catch(error => {
            console.error("Error fetching posts:", error);
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
        })
        .catch((error) => {
            console.error("회원 데이터 가져오기 오류:", error.response ? error.response.data : error.message);
        });

    }, [selectedCategory, selectedPage]);

    const handleCategoryChange = (category: string) => {
        setSelectedCategory(category);
        setSelectedPage(1);  // 카테고리 변경 시 페이지를 1로 초기화
    };

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

    const handlePageChange = (pageNumber: number) => {
        setSelectedPage(pageNumber);
    };

    return (
        <>
            <div className="main-total">
                {/* Navbar */}
                <Nav 
                    onSearchClick={() => setIsSearchModalOpen(true)} 
                    profile={member?.avatar || undefined}
                />

                {/* Banner */}
                <Banner />

                {/* Category Selection */}
                <PostType 
                    category={selectedCategory} 
                    onCategoryChange={handleCategoryChange} 
                />
              </li>
            ))}
          </ul>
        </div>

        {/* Pagination Area */}
        <Footer
          totalPosts={posts.length}
          postsPerPage={postsPerPage}
          selectedPage={selectedPage}
          totalPages={totalPage} // 총 페이지 수 전달
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
