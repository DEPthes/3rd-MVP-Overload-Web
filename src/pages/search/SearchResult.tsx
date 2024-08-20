import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Nav from "../../components/Nav";
import Footer from "../../components/Footer";
import PostPreview from "../../components/PostPreview";
import SearchModal from "../../components/search/SearchModal";
import { SearchPosts, TagSearchPosts } from "../../api/Search";
import NoSearchResult from "../../components/search/NoSearchResult"; // 새로 만든 컴포넌트 가져오기
import styles from "../../style/search/searchResultsPage.module.css";

const SearchResults: React.FC = () => {
  const location = useLocation();
  const [isSearchModalOpen, setIsSearchModalOpen] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>(
    location.state?.searchTerm || ""
  );
  const [results, setResults] = useState<any[]>([]);
  const [totalPosts, setTotalPosts] = useState<number>(0);
  const [totalPage, setTotalPage] = useState<number>(1); // totalPage 상태 추가
  const [selectedPage, setSelectedPage] = useState<number>(1);
  const postsPerPage = 10;

  useEffect(() => {
    const fetchResults = async () => {
      try {
        let response;
        if (location.state?.isTagSearch) {
          response = await TagSearchPosts(
            searchTerm,
            selectedPage,
            postsPerPage
          );
        } else {
          response = await SearchPosts(searchTerm, selectedPage, postsPerPage);
        }

        if (
          response.data &&
          response.data.pageInfo &&
          response.data.dataList &&
          response.data.dataList.length > 0
        ) {
          setResults(response.data.dataList);
          setTotalPosts(response.data.pageInfo.totalPage * postsPerPage); // 총 게시물 수 설정
          setTotalPage(response.data.pageInfo.totalPage); // 총 페이지 수 설정
        } else {
          setResults([]);
          setTotalPosts(0);
          setTotalPage(1); // 검색 결과가 없을 경우 totalPage를 1로 설정
        }
      } catch (error) {
        console.error("검색 결과를 가져오는 데 실패했습니다.", error);
        setResults([]);
        setTotalPosts(0);
        setTotalPage(1); // 오류 발생 시 totalPage를 1로 설정
      }
    };

    if (searchTerm) {
      fetchResults();
    }
  }, [searchTerm, selectedPage, location.state?.isTagSearch]);

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    setIsSearchModalOpen(false);
    setSelectedPage(1);
  };

  const handlePageChange = (pageNumber: number) => {
    setSelectedPage(pageNumber);
  };

  return (
    <>
      <div className={styles.ResultsContainer}>
        <Nav onSearchClick={() => setIsSearchModalOpen(true)} />
        <div className={styles.ResultsTitle}>
          <label>{`“${searchTerm}” 검색 결과`}</label>
        </div>
        {results.length > 0 ? (
          <div className={styles.ResultsContent}>
            <div className="post-preview">
              <ul>
                {results.map((item, index) => (
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
                      profile={item.profile}
                      picture={item.picture ? item.picture : undefined}
                      avatar={item.avatar}
                    />
                  </li>
                ))}
              </ul>
            </div>

            <Footer
              totalPosts={totalPosts}
              postsPerPage={postsPerPage}
              selectedPage={selectedPage}
              totalPages={totalPage} // 총 페이지 수 전달
              onPageChange={handlePageChange}
            />
          </div>
        ) : (
          <NoSearchResult />
        )}

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

export default SearchResults;
