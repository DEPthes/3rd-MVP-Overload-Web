import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../style/emailVerify.module.css";
import deplogLogo from "../images/deplogLogo.png";

const EmailVerify: React.FC = () => {
  const [verificationMessage, setVerificationMessage] = useState("");
  const [resendEnabled, setResendEnabled] = useState(true);
  const [time, setTime] = useState<number>(180);
  const navigate = useNavigate();

  useEffect(() => {
    let interval: number | null = null;
    if (!resendEnabled) {
      interval = window.setInterval(() => {
        setTime((prevTime) => {
          if (prevTime > 0) {
            return prevTime - 1;
          } else {
            clearInterval(interval!);
            setResendEnabled(true);
            return 180;
          }
        });
      }, 1000);
    }
    return () => {
      if (interval !== null) {
        clearInterval(interval);
      }
    };
  }, [resendEnabled]);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const secs = String(seconds % 60).padStart(2, "0");
    return `${minutes}:${secs}`;
  };

  const handleVerify = () => {
    setVerificationMessage("메일함의 링크 클릭 후 완료 버튼을 눌러주세요.");
  };

  const handleResend = () => {
    setResendEnabled(false);
    setTime(180); // Reset timer to 3 minutes
  };

  return (
    <div className={styles.centeredContainer}>
      <div className={styles.verifyForm}>
        <div className={styles.logoContainer}>
          <img src={deplogLogo} className={styles.logo} alt="Logo" />
        </div>
        <div className={styles.titleContainer}>
          <label className={styles.title}>인증 메일 전송</label>
        </div>
        <div className={styles.subtitleContainer}>
          <label className={styles.subtitle}>
            aaaaa@gmail.com 으로 가입 인증 메일을 전송하였습니다.
            <br />
            메일함을 확인하시고, 인증을 완료해 주세요.
          </label>
        </div>
        <div className={styles.buttonGroup}>
          <button
            type="button"
            className={styles.verifyButton}
            onClick={handleVerify}
          >
            인증완료
          </button>
          <div className={styles.errorMessageContainer}>
            <span className={styles.errorMessage}>{verificationMessage}</span>
          </div>
          <button
            type="button"
            className={
              resendEnabled ? styles.resendButton : styles.resendButtonDisabled
            }
            onClick={handleResend}
            disabled={!resendEnabled}
          >
            {resendEnabled ? "인증 메일 다시 받기" : formatTime(time)}
          </button>
        </div>
      </div>
    </div>
  );
};

export default EmailVerify;
