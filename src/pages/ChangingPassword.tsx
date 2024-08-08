import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../style/changingPassword.module.css';
import deplogLogo from '../images/deplogLogo.png';
import eyeimg from '../images/eyecon.png';
import eyeimgslash from '../images/eyeconslash.png';
import { constants } from '../constants';

const ChangePasswordPage: React.FC = () => {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [confirmPasswordError, setConfirmPasswordError] = useState('');
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);

    const navigate = useNavigate();

    const validatePassword = (password: string) => {
        return constants.passwordPattern.test(password);
    };

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
        setPasswordError(validatePassword(e.target.value) ? '' : constants.passwordError);
    };

    const handleConfirmPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setConfirmPassword(e.target.value);
        setConfirmPasswordError(password === e.target.value ? '' : constants.confirmPasswordError);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        !validatePassword(password) && setPasswordError(constants.passwordError);
        password !== confirmPassword && setConfirmPasswordError(constants.confirmPasswordError);
        validatePassword(password) && password === confirmPassword && navigate('/PasswordResetSuccess');
        // api 연결하기
    };

    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
    };

    const toggleConfirmPasswordVisibility = () => {
        setConfirmPasswordVisible(!confirmPasswordVisible);
    };

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
                    <label className={styles.title}>{constants.changePasswordTitle}</label>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className={styles.formGroup}>
                        <div className={styles.labelContainer}>
                            <label htmlFor="password">{constants.newPasswordLabel}</label>
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
                            <label htmlFor="confirmPassword">{constants.newPasswordConfirmLabel}</label>
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
                        <button type="submit" className={styles.nextButton} disabled={!password || !confirmPassword || !!passwordError || !!confirmPasswordError}>
                            {constants.changePasswordTitle}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ChangePasswordPage;
