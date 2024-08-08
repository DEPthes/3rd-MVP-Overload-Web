import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../style/emailVerify.module.css";
import deplogLogo from "../images/deplogLogo.png";
import { constants } from "../constants";

const EmailVerify: React.FC = () => {
  const [verificationMessage, setVerificationMessage] = useState("");
  const [resendEnabled, setResendEnabled] = useState(true);
  const [time, setTime] = useState<number>(180);
  const navigate = useNavigate();

  useEffect(() => {
    let interval: number | null = null;
    if (!resendEnabled) {
      interval = window.setInterval(() => {
        setTime((prevTime) => prevTime > 0 ? prevTime - 1 : (clearInterval(interval!), setResendEnabled(true), 180));
      }, 1000);
    }
    return () => { interval !== null && clearInterval(interval); };
  }, [resendEnabled]);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const secs = String(seconds % 60).padStart(2, "0");
    return `${minutes}:${secs}`;
  };

  const handleVerify = () => { setVerificationMessage(constants.verifyCompleteMessage); };
  const handleResend = () => { setResendEnabled(false); setTime(180); };
  //aaaaa@gmail.com부분 바꾸기. and 질문
  return (
    <div className={styles.centeredContainer}>
      <div className={styles.verifyForm}>
        <div className={styles.logoContainer}><img src={deplogLogo} className={styles.logo} alt={constants.logoAltText} /></div>
        <div className={styles.titleContainer}><label className={styles.title}>{constants.verifyEmailTitle}</label></div>
        <div className={styles.subtitleContainer}>
          <label className={styles.subtitle}>
            {"aaaaa@gmail.com" + constants.verifyEmailSubtitle} <br/> {constants.verifyEmailSubtitle2}
          </label>
        </div>
        <div className={styles.buttonGroup}>
          <button type="button" className={styles.verifyButton} onClick={handleVerify}>인증완료</button>
          <div className={styles.errorMessageContainer}><span className={styles.errorMessage}>{verificationMessage}</span></div>
          <button type="button" className={resendEnabled ? styles.resendButton : styles.resendButtonDisabled} onClick={handleResend} disabled={!resendEnabled}>
            {resendEnabled ? constants.resendEmailButtonText : formatTime(time)}
          </button>
        </div>
      </div>
    </div>
  );
};

export default EmailVerify;
