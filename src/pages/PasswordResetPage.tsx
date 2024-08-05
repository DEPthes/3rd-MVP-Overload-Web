import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import styles from './RegisterPage.module.css';

const PasswordResetPage: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [confirmPasswordError, setConfirmPasswordError] = useState('');
    
    const navigate = useNavigate();

    const validateEmail = (email: string) => {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailPattern.test(email);
    };

    const validatePassword = (password: string) => {
        const passwordPattern = /^[A-Za-z0-9]{8,20}$/;
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
        if (e.target.value !== password) {
            setConfirmPasswordError('비밀번호가 일치하지 않습니다.');
        } else {
            setConfirmPasswordError('');
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
            // navigate to some other page or perform further actions
        }
    };

    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
    };

    const toggleConfirmPasswordVisibility = () => {
        setConfirmPasswordVisible(!confirmPasswordVisible);
    };

    return (
        <div className={styles.registerForm}>
            <img src="/path-to-logo.png" alt="DEPth" className={styles.logo} />
            <form onSubmit={handleSubmit}>
                <div className={styles.formGroup}>
                    <label htmlFor="email">이메일 주소</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        placeholder='예)abcd@gmail.com'
                        onChange={handleEmailChange}
                        className={emailError ? styles.error : ''}
                    />
                    <button type="button" className={styles.duplicateCheck}>중복 확인</button>
                    {emailError && <span className={styles.errorMessage}>{emailError}</span>}
                </div>
                <div className={styles.formGroup}>
                    <label htmlFor="password">비밀번호</label>
                    <div className={styles.passwordContainer}>
                        <input
                            type={passwordVisible ? "text" : "password"}
                            id="password"
                            value={password}
                            placeholder='영문, 숫자 포함 (8~20자)'
                            onChange={handlePasswordChange}
                            className={passwordError ? styles.error : ''}
                        />
                        <span onClick={togglePasswordVisibility} className={styles.passwordToggleIcon}>
                            {passwordVisible ? <AiFillEyeInvisible /> : <AiFillEye />}
                        </span>
                    </div>
                    {passwordError && <span className={styles.errorMessage}>{passwordError}</span>}
                </div>
                <div className={styles.formGroup}>
                    <label htmlFor="confirmPassword">비밀번호 확인</label>
                    <div className={styles.passwordContainer}>
                        <input
                            type={confirmPasswordVisible ? "text" : "password"}
                            id="confirmPassword"
                            value={confirmPassword}
                            placeholder='영문, 숫자 포함 (8~20자)'
                            onChange={handleConfirmPasswordChange}
                            className={confirmPasswordError ? styles.error : ''}
                        />
                        <span onClick={toggleConfirmPasswordVisibility} className={styles.passwordToggleIcon}>
                            {confirmPasswordVisible ? <AiFillEyeInvisible /> : <AiFillEye />}
                        </span>
                    </div>
                    {confirmPasswordError && <span className={styles.errorMessage}>{confirmPasswordError}</span>}
                </div>
                <button type="submit" className={styles.registerButton} disabled={!email || !password || !confirmPassword}>
                    다음
                </button>
                <button type="button" className={styles.cancelButton} onClick={() => navigate('/')}>
                    취소
                </button>
            </form>
        </div>
    );
};

export default PasswordResetPage;
