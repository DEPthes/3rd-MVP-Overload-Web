import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import styles from '../style/changingPassword.module.css';
import deplogLogo from '../images/deplogLogo.png';
import eyeimg from '../images/eyecon.png';
import eyeimgslash from '../images/eyeconslash.png';
import { constants } from '../constants';
import { PassReset } from '../api/PassReset';       //이메일전송=>인증완료버튼(인증했는지 여부 판단안됨) 질문하기

const ChangePasswordPage: React.FC = () => {
    const location = useLocation();
    const { email } = location.state as { email: string }; // 전달된 이메일 받기
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

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (validatePassword(password) && password === confirmPassword) {
            try {
                await PassReset({ email, password }); // 전달받은 이메일과 함께 비밀번호 전송
                navigate('/passResetSuccess');
            } catch (error) {
                console.error("Failed to reset password", error);
                alert('비밀번호 변경에 실패했습니다.'); //alert 처리 어떻게 할지 질문
            }
        } else {
            !validatePassword(password) && setPasswordError(constants.passwordError);
            password !== confirmPassword && setConfirmPasswordError(constants.confirmPasswordError);
        }
    };

    const togglePasswordVisibility = () => setPasswordVisible(!passwordVisible);
    const toggleConfirmPasswordVisibility = () => setConfirmPasswordVisible(!confirmPasswordVisible);

    const handleCancel = () => navigate('/');

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
