import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styles from "../style/emailVerify.module.css";
import deplogLogo from "../images/deplogLogo.png";
import { constants } from "../constants";
import { sendMail, checkMail } from '../api/PassReset';

const ResetEmailCheck: React.FC = () => {
  const location = useLocation();
  const { email } = location.state as { email: string }; // 전달된 이메일 받기
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

  const handleVerify = async () => {
    try {
      const response = await checkMail(email);
      if (response.verified) {
        alert('이메일 인증 성공!');
        navigate('/changingPassword', { state: { email } }); // 이메일을 state로 전달하여 비밀번호 변경 페이지로 이동
      } else {
        setVerificationMessage(constants.verifyCompleteMessage);
      }
    } catch (error) {
      console.error("Failed to verify email", error);
      alert('이메일 인증에 실패했습니다. 다시 시도하세요.');
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

export default ResetEmailCheck;
