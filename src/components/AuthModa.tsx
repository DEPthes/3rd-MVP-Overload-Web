import React from "react";
import "../style/authModal.css";

interface AuthModalProps {
  title: string;
  text?: string;
  handleLogoutModal?: (action: string) => void;
}

const AuthModa = ({ title, text, handleLogoutModal }: AuthModalProps) => {
  return (
    <div className="authModalComponent">
      <span className="authModalTitle">{title}</span>
      {text && (
        <span
          className="authModalText"
          dangerouslySetInnerHTML={{ __html: text }}
        />
      )}
      <div className="authModalButton">
        <span
          className="yes"
          onClick={() => handleLogoutModal && handleLogoutModal("yes")}
        >
          네
        </span>
        <span
          className="no"
          onClick={() => handleLogoutModal && handleLogoutModal("no")}
        >
          아니요
        </span>
      </div>
    </div>
  );
};

export default AuthModa;
