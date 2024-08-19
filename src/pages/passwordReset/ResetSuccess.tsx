import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../../style/passwordReset/resetSuccess.module.css';
import jwamulswaeIcon from '../../images/jwamulswaeIcon.png';
import { constants } from '../../constants/logIn';

const ResetSuccess: React.FC = () => {
    const navigate = useNavigate();

    const handleLoginRedirect = () => {
        navigate('/login');
    };

    return (
        <div className={styles.centeredContainer}>
            <div className={styles.completeForm}>
                <div className={styles.iconContainer}>
                    <img src={jwamulswaeIcon} className={styles.icon} alt="Lock Icon" />
                </div>
                <div className={styles.messageContainer}>
                    <label className={styles.message}>{constants.resetSuccessMessage}</label>
                </div>
                <button type="button" className={styles.loginButton} onClick={handleLoginRedirect}>{constants.loginRedirectButtonText}</button>
            </div>
        </div>
    );
};

export default ResetSuccess;
