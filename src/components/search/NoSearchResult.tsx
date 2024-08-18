import React from 'react';
import styles from "../../style/search/searchResultsPage.module.css";
import { constants } from "../../constants/logIn";

const NoSearchResults: React.FC = () => {
    return (
            <div className={styles.NoResultsContent}>
                <label>{constants.searchResultMent}</label>
            </div>
    );
};

export default NoSearchResults;
