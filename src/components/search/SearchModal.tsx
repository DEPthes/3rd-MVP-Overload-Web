import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../../style/search/searchModal.module.css';
import searchImg from '../../images/search.png';
import closeIcon from '../../images/Vector.svg';
import { constants } from "../../constants/logIn";

type SearchModalProps = {
    onClose: () => void;
    onSearch: (searchTerm: string) => void;
};

const SearchModal: React.FC<SearchModalProps> = ({ onClose, onSearch }) => {
    const [searchTerm, setSearchTerm] = useState<string>('');
    const navigate = useNavigate();

    const handleSearch = () => {
        if (searchTerm.trim() === '') {
            return; // 검색어가 없으면 검색을 실행하지 않음
        }
        onSearch(searchTerm);
        onClose(); // Close the modal after searching
        navigate('/searchResults', { state: { searchTerm } }); // Navigate to search results page with search term
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            handleSearch(); // 엔터 키를 누르면 검색 실행
        }
    };

    return (
        <div className={styles.modalOverlay}>
            <div className={styles.modalPosition}>    
                <div className={styles.goBackComponent}>
                    <button className={styles.closeButton} onClick={onClose}>
                        <img src={closeIcon} alt="Close" />
                    </button>
                </div>
                <div className={styles.searchBar}>
                    <input 
                        type="text" 
                        placeholder={constants.searchMent}
                        className={styles.searchInput} 
                        value={searchTerm} 
                        onChange={(e) => setSearchTerm(e.target.value)} 
                        onKeyDown={handleKeyDown} // 엔터 키 이벤트 처리
                    />
                    <img 
                        src={searchImg} 
                        className={styles.searchIcon} 
                        alt="Search" 
                        onClick={handleSearch} 
                    />
                </div>
            </div>
        </div>
    );
};

export default SearchModal;
