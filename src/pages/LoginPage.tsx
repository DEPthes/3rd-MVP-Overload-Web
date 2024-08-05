import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./LoginForm.module.css";
import checkboxChecked from "../images/checkbox.png";
import checkboxUnchecked from "../images/checkboxempty.png";
import deplogLogo from "../images/deplogLogo.png";
import eyeimg from "../images/eyecon.png";
import eyeimgslash from "../images/eyeconslash.png";

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
      setEmailError("");
    } else {
      setEmailError("이메일 주소 형식이 맞지 않습니다.");
    }
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    if (validatePassword(e.target.value)) {
      setPasswordError("");
    } else {
      setPasswordError("영문, 숫자 포함 (8~20자)로 작성해주세요.");
    }
  };

  const handleCapsLock = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.getModifierState("CapsLock")) {
      setCapsLockOn(true);
    } else {
      setCapsLockOn(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateEmail(email)) {
      setEmailError("이메일 주소 형식이 맞지 않습니다.");
    }
    if (!validatePassword(password)) {
      setPasswordError("영문, 숫자 포함 (8~20자)로 작성해주세요.");
    }
    if (validateEmail(email) && validatePassword(password)) {
      alert("로그인 성공!");
    }
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handlePasswordReset = () => {
    navigate("/passwordReset");
  };

  const handleRegisterClick = () => {
    navigate("/register");
  };

  const toggleAutoLogin = () => {
    setAutoLogin(!autoLogin);
  };

  return (
    <div className={styles.centeredContainer}>
      <div className={styles.loginForm}>
        <div className={styles.logoContainer}>
          <img src={deplogLogo} className={styles.logo} alt="Logo" />
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
              placeholder="예)abcd@gmail.com"
              onChange={handleEmailChange}
              className={emailError ? styles.error : ""}
            />
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
                placeholder="영문, 숫자(8~20자)"
                onChange={handlePasswordChange}
                onKeyUp={handleCapsLock}
                className={passwordError ? styles.error : ""}
              />
              <span
                onClick={togglePasswordVisibility}
                className={styles.passwordToggleIcon}
              >
                <img
                  src={passwordVisible ? eyeimgslash : eyeimg}
                  alt="Toggle visibility"
                />
              </span>
            </div>
            <div className={styles.errorMessageContainer}>
              <span className={styles.errorMessage}>{passwordError}</span>
            </div>
          </div>
          <div
            className={`${styles.autoLoginContainer} ${
              capsLockOn ? styles.noPaddingBottom : ""
            }`}
          >
            <img
              src={autoLogin ? checkboxChecked : checkboxUnchecked}
              alt="auto login checkbox"
              className={styles.checkbox}
              onClick={toggleAutoLogin}
            />
            <span onClick={toggleAutoLogin} className={styles.autoLoginLabel}>
              자동로그인
            </span>
          </div>
          {capsLockOn && (
            <div className={styles.capslockWarningContainer}>
              <div className={styles.capslockWarningTextContainer}>
                <span className={styles.capslockWarning}>
                  CapsLock이 켜져 있어요.
                </span>
              </div>
            </div>
          )}
          <button
            type="submit"
            className={styles.loginButton}
            disabled={!email || !password}
          >
            로그인
          </button>
        </form>
        <div className={styles.links}>
          <span onClick={handlePasswordReset}>비밀번호 재설정</span>
          <span onClick={handleRegisterClick} className={styles.registerLink}>
            회원가입
          </span>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
