import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../style/resetSuccess.module.css';
import jwamulswaeIcon from '../images/jwamulswaeIcon.png';

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
                    <label className={styles.message}>비밀번호 변경 완료</label>
                </div>
                <button 
                    type="button" 
                    className={styles.loginButton} 
                    onClick={handleLoginRedirect}
                >
                    로그인 화면으로 이동
                </button>
            </div>
        </div>
    );
};

export default ResetSuccess;
