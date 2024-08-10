import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import Nav from "../components/Nav";
import styles from "../style/searchResults.module.css";
import SearchModal from '../components/SearchModal';
import { constants } from "../constants";

const SearchResults: React.FC = () => {
    const location = useLocation();
    const [isSearchModalOpen, setIsSearchModalOpen] = useState<boolean>(false);
    const [searchTerm, setSearchTerm] = useState<string>(location.state?.searchTerm || '');

    const handleSearch = (term: string) => {
        setSearchTerm(term);
        setIsSearchModalOpen(false);
    };

    return (
        <>
            <div className={styles.ResultsContainer}>
                <Nav onSearchClick={() => setIsSearchModalOpen(true)}/>
                <div className={styles.ResultsTitle}>
                    <label>{`“${searchTerm}” 검색 결과`}</label>
                </div>
                <div className={styles.ResultsContent}>
                    <label>{constants.searchResultMent}</label>
                </div>

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
