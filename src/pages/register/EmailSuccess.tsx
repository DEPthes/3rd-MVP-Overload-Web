import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../../style/passwordReset/resetSuccess.module.css';
import EmailSuccessIcon from '../../images/EmailSuccess.svg';
import { constants } from '../../constants/logIn';

const EmailSuccess: React.FC = () => {
    const navigate = useNavigate();

    const handleLoginRedirect = () => {
        navigate('/'); 
    };

    return (
        <div className={styles.centeredContainer}>
            <div className={styles.completeForm}>
                <div className={styles.iconContainer}>
                    <img src={EmailSuccessIcon} className={styles.icon} alt="Lock Icon" />
                </div>
                <div className={styles.messageContainer}>
                    <label className={styles.message}>{constants.emailSuccessMessage}</label>
                </div>
                <div className={styles.subtitleContainer}>
                    <label className={styles.subtitle}>{constants.emailSuccessMessageSub}</label>
                </div>
                <button type="button" className={styles.loginButton} onClick={handleLoginRedirect}>{constants.goHome}</button>
            </div>
        </div>
    );
};

export default EmailSuccess;
