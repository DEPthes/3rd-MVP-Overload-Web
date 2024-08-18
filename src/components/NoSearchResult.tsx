import React from 'react';
import styles from "../style/searchResultsPage.module.css";
import { constants } from "../constants";

const NoSearchResults: React.FC = () => {
    return (
            <div className={styles.NoResultsContent}>
                <label>{constants.searchResultMent}</label>
            </div>
    );
};

export default NoSearchResults;
