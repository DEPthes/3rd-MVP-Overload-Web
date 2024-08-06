import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../style/RegisterPage.module.css';
import deplogLogo from '../images/deplogLogo.png';
import eyeimg from '../images/eyecon.png';
import eyeimgslash from '../images/eyeconslash.png';


const RegisterPage: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [confirmPasswordError, setConfirmPasswordError] = useState('');
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);

    const navigate = useNavigate();

    const validateEmail = (email: string) => {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailPattern.test(email);
    };

    const validatePassword = (password: string) => {
        const passwordPattern = /^[A-Za-z0-9@]{8,20}$/;
        return passwordPattern.test(password);
    };

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
        if (validateEmail(e.target.value)) {
            setEmailError('');
        } else {
            setEmailError('이메일 주소 형식이 맞지 않습니다.');
        }
    };

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
        if (validatePassword(e.target.value)) {
            setPasswordError('');
        } else {
            setPasswordError('영문, 숫자 포함 (8~20자)로 작성해주세요.');
        }
    };

    const handleConfirmPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setConfirmPassword(e.target.value);
        if (password === e.target.value) {
            setConfirmPasswordError('');
        } else {
            setConfirmPasswordError('비밀번호가 일치하지 않습니다.');
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!validateEmail(email)) {
            setEmailError('이메일 주소 형식이 맞지 않습니다.');
        }
        if (!validatePassword(password)) {
            setPasswordError('영문, 숫자 포함 (8~20자)로 작성해주세요.');
        }
        if (password !== confirmPassword) {
            setConfirmPasswordError('비밀번호가 일치하지 않습니다.');
        }
        if (validateEmail(email) && validatePassword(password) && password === confirmPassword) {
            alert('회원가입 성공!');
            // 회원가입 성공 로직 추가
        }
    };

    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
    };

    const toggleConfirmPasswordVisibility = () => {
        setConfirmPasswordVisible(!confirmPasswordVisible);
    };

    const handleNextClick = () => {
        navigate('/register2');
    }

    const handleCancel = () => {
        navigate('/');
    };

    return (
        <div className={styles.centeredContainer}>
            <div className={styles.registerForm}>
                <div className={styles.logoContainer}>
                    <img src={deplogLogo} className={styles.logo} alt="Logo" />
                </div>
                <div className={styles.titleContainer}>
                    <label className={styles.title}>회원가입</label>
                </div>
                <div className={styles.subtitleContainer}>
                    <label className={styles.subtitle}>매일 계정 인증 및 승인 이후 추가 회원가입이 완료됩니다.</label>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className={styles.formGroup}>
                        <div className={styles.labelContainer}>
                            <label htmlFor="email">이메일 주소</label>
                        </div>
                        <div className={styles.inputWithButton}>
                            <input
                                type="email"
                                id="email"
                                value={email}
                                placeholder='예)abcd@gmail.com'
                                onChange={handleEmailChange}
                                className={emailError ? styles.error : ''}
                            />
                            <button
                                type="button"
                                className={`${styles.checkButton} ${validateEmail(email) ? styles.enabled : ''}`}
                                disabled={!validateEmail(email)}
                            >
                                중복 확인
                            </button>
                        </div>
                        <div className={styles.errorMessageContainer}>
                            <span className={styles.errorMessage}>{emailError}</span>
                        </div>
                    </div>
                    <div className={styles.formGroup}>
                        <div className={styles.labelContainer}>
                            <label htmlFor="password">비밀번호</label>
                        </div>
                        <div className={styles.passwordContainer}>
                            <input
                                type={passwordVisible ? "text" : "password"}
                                id="password"
                                value={password}
                                placeholder='영문, 숫자(8~20자)'
                                onChange={handlePasswordChange}
                                className={passwordError ? styles.error : ''}
                            />
                            <span onClick={togglePasswordVisibility} className={styles.passwordToggleIcon}>
                                <img src={passwordVisible ? eyeimgslash : eyeimg} alt="Toggle visibility" />
                            </span>
                        </div>
                    </div>
                    <div className={styles.formGroup}>
                        <div className={styles.labelContainer}>
                            <label htmlFor="confirmPassword">비밀번호 확인</label>
                        </div>
                        <div className={styles.passwordContainer}>
                            <input
                                type={confirmPasswordVisible ? "text" : "password"}
                                id="confirmPassword"
                                value={confirmPassword}
                                placeholder='영문, 숫자(8~20자)'
                                onChange={handleConfirmPasswordChange}
                                className={confirmPasswordError ? styles.error : ''}
                            />
                            <span onClick={toggleConfirmPasswordVisibility} className={styles.passwordToggleIcon}>
                                <img src={confirmPasswordVisible ? eyeimgslash : eyeimg} alt="Toggle visibility" />
                            </span>
                        </div>
                        <div className={styles.errorMessageContainer}>
                            <span className={styles.errorMessage}>{confirmPasswordError}</span>
                        </div>
                    </div>
                    <div className={styles.buttonGroup}>
                        <button type="button" className={styles.cancelButton} onClick={handleCancel}>취소</button>
                        <button type="submit" onClick={handleNextClick} className={styles.nextButton} disabled={!email || !password || !confirmPassword || !!emailError || !!passwordError || !!confirmPasswordError}>
                            다음
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default RegisterPage;
