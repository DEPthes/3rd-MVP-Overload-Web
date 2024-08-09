import React from 'react';
import styles from '../style/searchModal.module.css';
import searchImg from '../images/search.png';
import closeIcon from '../images/Vector.svg';

type SearchModalProps = {
    onClose: () => void;
};

const SearchModal: React.FC<SearchModalProps> = ({ onClose }) => {
    return (
        <div className={styles.modalOverlay}>
            <div className={styles.modalContent}>
                <div className={styles.searchBar}>
                    <img src={searchImg} className={styles.searchIcon} alt="Search" />
                    <input type="text" placeholder="검색어를 입력해주세요." className={styles.searchInput} />
                    <button className={styles.closeButton} onClick={onClose}>
                        <img src={closeIcon} alt="Close" />
                    </button>
                </div>
                <div className={styles.results}>
                    {/* Search results will be rendered here */}
                </div>
            </div>
        </div>
    );
};

export default SearchModal;
