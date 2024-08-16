import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useMutation } from "react-query";
import styles from "../style/emailVerify.module.css";
import deplogLogo from "../images/deplogLogo.png";
import { constants } from "../constants";
import { RegisterReq } from '../api/RegisterReq';
import { sendMail } from '../api/RegisterReq';

const EmailVerify: React.FC = () => {
  const [verificationMessage, setVerificationMessage] = useState("");
  const [resendEnabled, setResendEnabled] = useState(true);
  const [time, setTime] = useState<number>(180);
  const navigate = useNavigate();
  const location = useLocation();
  const { email, password, name, part, generation } = location.state as { email: string; password: string; name: string; part: string; generation: number }; // Get all necessary data from state

  const { mutate: registerUser } = useMutation(RegisterReq, {
    onSuccess: () => {
      navigate('/emailSuccess'); 
    },
    onError: (error: any) => {
      setVerificationMessage('회원가입 중 오류가 발생했습니다: ' + (error.response?.data?.message || error.message));
    }
  });

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
      registerUser({ email, password, name, part, generation });
    } catch (error) {
      setVerificationMessage('인증 중 오류가 발생했습니다.');
    }
  };

  const handleResend = async () => {
    setResendEnabled(false);
    setTime(180);
    try {
      await sendMail(email);
    } catch (error) {
      setVerificationMessage('메일 재전송 중 오류가 발생했습니다.');
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

export default EmailVerify;
