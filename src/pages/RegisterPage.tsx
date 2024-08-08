import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../style/RegisterPage.module.css';
import deplogLogo from '../images/deplogLogo.png';
import eyeimg from '../images/eyecon.png';
import eyeimgslash from '../images/eyeconslash.png';
import { constants } from '../constants';

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
        return constants.emailPattern.test(email);
    };

    const validatePassword = (password: string) => {
        return constants.passwordPattern.test(password);
    };

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
        if (validateEmail(e.target.value)) {
            setEmailError('');
        } else {
            setEmailError(constants.invalidEmailError);
        }
    };

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
        if (validatePassword(e.target.value)) {
            setPasswordError('');
        } else {
            setPasswordError(constants.passwordError);
        }
    };

    const handleConfirmPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setConfirmPassword(e.target.value);
        if (password === e.target.value) {
            setConfirmPasswordError('');
        } else {
            setConfirmPasswordError(constants.confirmPasswordError);
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!validateEmail(email)) {
            setEmailError(constants.invalidEmailError);
        }
        if (!validatePassword(password)) {
            setPasswordError(constants.passwordError);
        }
        if (password !== confirmPassword) {
            setConfirmPasswordError(constants.confirmPasswordError);
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
                    <img src={deplogLogo} className={styles.logo} alt={constants.logoAltText} />
                </div>
                <div className={styles.titleContainer}>
                    <label className={styles.title}>{constants.registerTitle}</label>
                </div>
                <div className={styles.subtitleContainer}>
                    <label className={styles.subtitle}>{constants.registerSubtitle}</label>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className={styles.formGroup}>
                        <div className={styles.labelContainer}>
                            <label htmlFor="email">{constants.emailLabel}</label>
                        </div>
                        <div className={styles.inputWithButton}>
                            <input
                                type="email"
                                id="email"
                                value={email}
                                placeholder={constants.emailPlaceholder}
                                onChange={handleEmailChange}
                                className={emailError ? styles.error : ''}
                            />
                            <button
                                type="button"
                                className={`${styles.checkButton} ${validateEmail(email) ? styles.enabled : ''}`}
                                disabled={!validateEmail(email)}
                            >
                                {constants.emailCheckButtonText}
                            </button>
                        </div>
                        <div className={styles.errorMessageContainer}>
                            <span className={styles.errorMessage}>{emailError}</span>
                        </div>
                    </div>
                    <div className={styles.formGroup}>
                        <div className={styles.labelContainer}>
                            <label htmlFor="password">{constants.passwordLabel}</label>
                        </div>
                        <div className={styles.passwordContainer}>
                            <input
                                type={passwordVisible ? "text" : "password"}
                                id="password"
                                value={password}
                                placeholder={constants.passwordPlaceholder}
                                onChange={handlePasswordChange}
                                className={passwordError ? styles.error : ''}
                            />
                            <span onClick={togglePasswordVisibility} className={styles.passwordToggleIcon}>
                                <img src={passwordVisible ? eyeimgslash : eyeimg} alt="Toggle visibility" />
                            </span>
                        </div>
                        <div className={styles.errorMessageContainer}>
                            <span className={styles.errorMessage}>{passwordError}</span>
                        </div>
                    </div>
                    <div className={styles.formGroup}>
                        <div className={styles.labelContainer}>
                            <label htmlFor="confirmPassword">{constants.confirmPasswordLabel}</label>
                        </div>
                        <div className={styles.passwordContainer}>
                            <input
                                type={confirmPasswordVisible ? "text" : "password"}
                                id="confirmPassword"
                                value={confirmPassword}
                                placeholder={constants.passwordPlaceholder}
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
                        <button type="button" className={styles.cancelButton} onClick={handleCancel}>{constants.cancelButtonText}</button>
                        <button type="submit" onClick={handleNextClick} className={styles.nextButton} disabled={!email || !password || !confirmPassword || !!emailError || !!passwordError || !!confirmPasswordError}>
                            {constants.nextButtonText}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default RegisterPage;
