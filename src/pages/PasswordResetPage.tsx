import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import deplogLogo from "../images/deplogLogo.png";
import styles from '../style/passwordResetPage.module.css'; // 새로운 CSS 파일

const PasswordResetPage: React.FC = () => {
    const [email, setEmail] = useState('');
    const [emailError, setEmailError] = useState('');
    
    const navigate = useNavigate();

    const validateEmail = (email: string) => {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailPattern.test(email);
    };

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
        if (validateEmail(e.target.value)) {
            setEmailError('');
        } else {
            setEmailError('이메일 주소 형식이 맞지 않습니다.');
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!validateEmail(email)) {
            setEmailError('이메일 주소 형식이 맞지 않습니다.');
        }

        if (validateEmail(email)) {
            // 이메일 제출 로직 추가
        }
    };

    return (
        <div className={styles.centeredContainer}>
            <div className={styles.registerForm}>
                <div className={styles.logoContainer}>
                    <img src={deplogLogo} className={styles.logo} alt="DEPth" />
                </div>
                <div className={styles.titleContainer}>
                    <label className={styles.title}>인증 메일 전송</label>
                </div>
                <div className={styles.subtitleContainer}>
                    <label className={styles.subtitle}>{email}으로 가입 인증 메일을 전송하였습니다.<br/>이메일을 확인하시고, 인증을 완료해 주세요.</label>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className={styles.formGroup}>
                        <div className={styles.labelContainer}>
                            <label htmlFor="email">이메일 주소</label>
                        </div>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            placeholder='예) abcd@gmail.com'
                            onChange={handleEmailChange}
                            className={emailError ? styles.error : ''}
                        />
                        <div className={styles.errorMessageContainer}>
                            <span className={styles.errorMessage}>{emailError}</span>
                        </div>
                    </div>
                    <div className={styles.buttonGroup}>
                        <button type="submit" className={styles.nextButton} disabled={!email}>인증링크 발송하기</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default PasswordResetPage;
