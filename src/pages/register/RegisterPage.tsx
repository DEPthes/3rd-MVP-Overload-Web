import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMutation } from 'react-query';
import styles from '../../style/register/RegisterPage.module.css';
import deplogLogo from '../../images/deplogLogo.png';
import eyeimg from '../../images/eyecon.png';
import eyeimgslash from '../../images/eyeconslash.png';
import { constants } from '../../constants/logIn';
import { checkEmailDuplicate } from '../../api/RegisterReq'; 

const RegisterPage: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [confirmPasswordError, setConfirmPasswordError] = useState('');
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
    const [isEmailChecked, setIsEmailChecked] = useState(false);
    const [isEmailAvailable, setIsEmailAvailable] = useState(false); 

    const navigate = useNavigate();

    const validateEmail = (email: string) => {
        return constants.emailPattern.test(email);
    };

    const validatePassword = (password: string) => {
        return constants.passwordPattern.test(password);
    };

    const { mutate: checkEmail, isLoading: isCheckingEmail } = useMutation(checkEmailDuplicate, {
        onSuccess: (isAvailable: any) => {
            console.log('isAvailable:', isAvailable);
            if (isAvailable) {
                alert(constants.emailAvailableMessage);
                setIsEmailAvailable(true);
            } else {
                setEmailError(constants.emailNotAvailableMessage);
                setIsEmailAvailable(false);
            }
            setIsEmailChecked(true);
        },
        onError: () => {
            setEmailError(constants.emailCheckErrorMessage);
            setIsEmailAvailable(false);
            setIsEmailChecked(false);
        }
    });

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const emailValue = e.target.value;
        setEmail(emailValue);
        setIsEmailAvailable(false);
        setIsEmailChecked(false);
        
        if (emailValue === '') {
            setEmailError(''); 
        } else if (!validateEmail(emailValue)) {
            setEmailError(constants.invalidEmailError);
        } else {
            setEmailError('');
        }
    
        console.log('Email Change:', {
            email: emailValue,
            emailError,
            isEmailChecked,
            isEmailAvailable
        });
    };
    
    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const passwordValue = e.target.value;
        setPassword(passwordValue);
        
        if (passwordValue === '') {
            setPasswordError(''); 
        }
        else if (!validatePassword(passwordValue)) {
            setPasswordError(constants.passwordError);
        } else {
            setPasswordError('');
        }
    
        console.log('Password Change:', {
            password: passwordValue,
            passwordError,
        });
    };

    const handleConfirmPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const confirmPasswordValue = e.target.value;
        setConfirmPassword(confirmPasswordValue);
    
        const trimmedPassword = password.trim(); //공백제거
        const trimmedConfirmPassword = confirmPasswordValue.trim();
    
        console.log('Password:', trimmedPassword);      //디버깅용
        console.log('Confirm Password:', trimmedConfirmPassword);
        
        if (trimmedConfirmPassword === '') {
            setConfirmPasswordError('');
        }
        else if (trimmedPassword === trimmedConfirmPassword) {
            setConfirmPasswordError('');
        } else {
            setConfirmPasswordError(constants.confirmPasswordError);
        }
    
        console.log('Confirm Password Change:', {
            confirmPassword: trimmedConfirmPassword,
            confirmPasswordError,
        });
    };
    
    
    const handleCheckEmail = () => {
        if (validateEmail(email)) {
            checkEmail(email);
        } else {
            setEmailError(constants.invalidEmailError);
        }
    
        console.log('Check Email:', {
            email,
            emailError,
            isEmailChecked,
            isEmailAvailable
        });
    };
    
    const handleNextClick = (e: React.FormEvent) => {
        e.preventDefault();
        if (validateEmail(email) && validatePassword(password) && password === confirmPassword && isEmailAvailable && isEmailChecked) {
            navigate('/register2', { state: { email, password } });
        } else {
            if (!isEmailChecked) {
                setEmailError(constants.emailCheckRequiredMessage);
            }
        }
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
                    <label className={styles.title}>{constants.registerTitle}</label>
                </div>
                <div className={styles.subtitleContainer}>
                    <label className={styles.subtitle}>{constants.registerSubtitle}</label>
                </div>
                <form onSubmit={handleNextClick}>
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
                                disabled={isCheckingEmail}
                            />
                            <button
                                type="button"
                                onClick={handleCheckEmail}
                                className={`${styles.checkButton} ${validateEmail(email) ? styles.enabled : ''}`}
                                disabled={!validateEmail(email) || isCheckingEmail}
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
                                <img src={passwordVisible ? eyeimg : eyeimgslash} alt="Toggle visibility" />
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
                                <img src={confirmPasswordVisible ? eyeimg : eyeimgslash} alt="Toggle visibility" />
                            </span>
                        </div>
                        <div className={styles.errorMessageContainer}>
                            <span className={styles.errorMessage}>{confirmPasswordError}</span>
                        </div>
                    </div>
                    <div className={styles.buttonGroup}>
                        <button type="button" className={styles.cancelButton} onClick={handleCancel}>
                            {constants.cancelButtonText}
                        </button>
                        <button
                            type="submit"
                            className={styles.nextButton}
                            disabled={
                                !email || 
                                !password || 
                                !confirmPassword || 
                                password !== confirmPassword || 
                                !!emailError || 
                                !!passwordError || 
                                !!confirmPasswordError || 
                                !isEmailAvailable
                            }
                        >
                            {constants.nextButtonText}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default RegisterPage;
