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
            <div className={styles.goBackComponent}>
                <button className={styles.closeButton} onClick={onClose}>
                    <img src={closeIcon} alt="Close" />
                </button>
            </div>
            <div className={styles.searchBar}>
                <input type="text" placeholder="검색어를 입력해주세요." className={styles.searchInput} />
                <img src={searchImg} className={styles.searchIcon} alt="Search" />
            </div>
        </div>
    );
};

export default SearchModal;
