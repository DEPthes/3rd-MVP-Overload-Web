import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation } from "react-query";
import styles from "../style/LoginForm.module.css";
import checkboxChecked from "../images/checkbox.png";
import checkboxUnchecked from "../images/checkboxempty.png";
import deplogLogo from "../images/deplogLogo.png";
import eyeimg from "../images/eyecon.png";
import eyeimgslash from "../images/eyeconslash.png";
import { constants } from "../constants";
import { LogInReq } from "../api/LogInReq"; // 로그인 API 호출을 위한 함수

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [autoLogin, setAutoLogin] = useState(false);
  const [capsLockOn, setCapsLockOn] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);

  const navigate = useNavigate();

  const validateEmail = (email: string) => {
    return constants.emailPattern.test(email);
  };

  const validatePassword = (password: string) => {
    return constants.passwordPattern.test(password);
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    setEmailError(validateEmail(e.target.value) ? "" : constants.invalidEmailError);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    setPasswordError(validatePassword(e.target.value) ? "" : constants.passwordError);
  };

  const handleCapsLock = (e: React.KeyboardEvent<HTMLInputElement>) => {
    setCapsLockOn(e.getModifierState("CapsLock"));
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const toggleAutoLogin = () => {
    setAutoLogin(!autoLogin);
  };

  const { mutate: logIn, isLoading } = useMutation(LogInReq, {
    onSuccess: (data) => {
      // JWT 토큰 처리
      const token = data.accessToken;
      if (token) {
        if (autoLogin) {
          localStorage.setItem("token", token); //자동로그인일때 계속 토큰보관(로컬스토리지)  ...토큰 어떻게 처리할지 질문
        } else {
          sessionStorage.setItem("token", token); //자동로그인 아니면 일시보관(세션처리)
        }
        alert(constants.loginSuccessMessage);
        navigate("/"); 
      }
    },
    onError: (error: any) => {
      setPasswordError(constants.IdOrPasswordError);
      console.error("로그인 에러:", error);
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateEmail(email) && validatePassword(password)) {
      logIn({ email, password });
    } else {
      if (!validateEmail(email)) setEmailError(constants.invalidEmailError);
      if (!validatePassword(password)) setPasswordError(constants.passwordError);
    }
  };

  const handlePasswordReset = () => {
    navigate("/passResetEmail");
  };

  const handleRegisterClick = () => {
    navigate("/register");
  };

  return (
    <div className={styles.centeredContainer}>
      <div className={styles.loginForm}>
        <div className={styles.logoContainer}>
          <img src={deplogLogo} className={styles.logo} alt={constants.logoAltText} />
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
              className={emailError ? styles.error : ""}
            />
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
                onKeyUp={handleCapsLock}
                className={passwordError ? styles.error : ""}
              />
              <span onClick={togglePasswordVisibility} className={styles.passwordToggleIcon}>
                <img src={passwordVisible ? eyeimgslash : eyeimg} alt={constants.eyeAltText} />
              </span>
            </div>
            <div className={styles.errorMessageContainer}>
              <span className={styles.errorMessage}>{passwordError}</span>
            </div>
          </div>
          <div className={`${styles.autoLoginContainer} ${capsLockOn ? styles.noPaddingBottom : ""}`}>
            <img
              src={autoLogin ? checkboxChecked : checkboxUnchecked}
              alt={constants.autoLoginBoxAltText}
              className={styles.checkbox}
              onClick={toggleAutoLogin}
            />
            <span onClick={toggleAutoLogin} className={styles.autoLoginLabel}>{constants.autoLoginText}</span>
          </div>
          {capsLockOn && (
            <div className={styles.capslockWarningContainer}>
              <div className={styles.capslockWarningTextContainer}>
                <span className={styles.capslockWarning}>{constants.capsLockWarning}</span>
              </div>
            </div>
          )}
          <button type="submit" className={styles.loginButton} disabled={isLoading || !email || !password}>
            {constants.loginTitle}
          </button>
        </form>
        <div className={styles.links}>
          <span onClick={handlePasswordReset}>{constants.passwordResetLinkText}</span>
          <span onClick={handleRegisterClick} className={styles.registerLink}>{constants.registerLinkText}</span>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
