import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styles from "../style/emailVerify.module.css";
import deplogLogo from "../images/deplogLogo.png";
import { constants } from "../constants";
import { sendMail, checkMail } from '../api/PassReset';

const ResetEmailCheck: React.FC = () => {
  const location = useLocation();
  const { email } = location.state as { email: string }; 
  const [verificationMessage, setVerificationMessage] = useState("");
  const [resendEnabled, setResendEnabled] = useState(true);
  const [time, setTime] = useState<number>(180);
  const navigate = useNavigate();

  useEffect(() => {
    //JS 타이머 로직
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

  const handleVerify = async () => {
    try {
      const response = await checkMail(email);
      if (response.data.verified) {
        alert(constants.emailSuccessMessage);
        navigate('/changingPassword', { state: { email } }); // 이메일을 state로 전달하고 비밀번호 변경 페이지로 이동
      } else {
        setVerificationMessage(constants.verifyCompleteMessage);
      }
    } catch (error) {
      console.error("Failed to verify email", error);
      alert(constants.emailFailMessage);
    }
  };
  

  const handleResend = async () => {
    setResendEnabled(false);
    setTime(180);
    try {
      await sendMail(email); // 전달받은 이메일로 재전송
    } catch (error) {
      console.error("Failed to resend email", error);
    }
  };

  return (
    <div className={styles.centeredContainer}>
      <div className={styles.verifyForm}>
        <div className={styles.logoContainer}><img src={deplogLogo} className={styles.logo} alt={constants.logoAltText} /></div>
        <div className={styles.titleContainer}><label className={styles.title}>{constants.verifyEmailTitle}</label></div>
        <div className={styles.subtitleContainer}>
          <label className={styles.subtitle}>
            {email + constants.verifyEmailSubtitle} <br/> {constants.verifyEmailSubtitle2}
          </label>
        </div>
        <div className={styles.buttonGroup}>
          <button type="button" className={styles.verifyButton} onClick={handleVerify}>{constants.verifyCompleteButttonText}</button>
          <div className={styles.errorMessageContainer}><span className={styles.errorMessage}>{verificationMessage}</span></div>
          <button type="button" className={resendEnabled ? styles.resendButton : styles.resendButtonDisabled} onClick={handleResend} disabled={!resendEnabled}>
            {resendEnabled ? constants.resendEmailButtonText : formatTime(time)}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResetEmailCheck;
