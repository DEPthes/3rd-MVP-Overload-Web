import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { constants } from '../constants'; // 상수 불러오기
import deplogLogo from "../images/deplogLogo.png";
import styles from '../style/passwordResetPage.module.css'; // 기존 CSS 파일 유지
import { sendMail } from '../api/PassReset';

const ResetEmailEnterPage: React.FC = () => {
    const [email, setEmail] = useState<string>('');
    const [emailError, setEmailError] = useState<string>('');
    
    const navigate = useNavigate();

    const validateEmail = (email: string) => {
        return constants.emailPattern.test(email);
    };

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
        setEmailError(validateEmail(e.target.value) ? '' : constants.invalidEmailError);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (validateEmail(email)) {
            try {
                await sendMail(email);
                navigate('/passResetEmailCheck', { state: { email } }); // 이메일을 state로 전달
            } catch (error) {
                console.error("Failed to send email", error);
            }
        } else {
            setEmailError(constants.invalidEmailError);
        }
    };

    return (
        <div className={styles.centeredContainer}>
            <div className={styles.registerForm}>
                <div className={styles.logoContainer}>
                    <img src={deplogLogo} className={styles.logo} alt={constants.logoAltText} />
                </div>
                <div className={styles.titleContainer}>
                    <label className={styles.title}>{constants.sendMailButtonText}</label>
                </div>
                <div className={styles.subtitleContainer}>
                    <label className={styles.subtitle}>{email + constants.verifyEmailSubtitle} <br /> {constants.verifyEmailSubtitle2}</label>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className={styles.formGroup}>
                        <div className={styles.labelContainer}>
                            <label htmlFor="email">{constants.emailLabel}</label>
                        </div>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            placeholder={constants.emailPlaceholder}
                            onChange={handleEmailChange}
                            className={emailError ? styles.error : ''}
                        />
                        <div className={styles.errorMessageContainer}>
                            <span className={styles.errorMessage}>{emailError}</span>
                        </div>
                    </div>
                    <div className={styles.buttonGroup}>
                        <button type="submit" className={styles.nextButton} disabled={!email}>
                            {constants.submitButtonText}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ResetEmailEnterPage;
