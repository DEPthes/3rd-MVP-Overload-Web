import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import styles from '../../style/register/RegisterPage2.module.css';
import deplogLogo from '../../images/deplogLogo.png';
import particon from '../../images/particon.png';
import { constants } from '../../constants/logIn';
import { sendMail } from '../../api/RegisterReq';

const RegisterPage2: React.FC = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [part, setPart] = useState('');
    const [count, setCount] = useState('');
    const [nameError, setNameError] = useState('');
    const [partError, setPartError] = useState('');
    const [countError, setCountError] = useState('');
    const [isPartDropdownOpen, setIsPartDropdownOpen] = useState(false);
    const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);

    const partMapping: { [key: string]: string } = {
        "기획": "PLAN",
        "서버": "SERVER",
        "웹": "WEB",
        "디자인": "DESIGN",
        "안드로이드": "ANDROID"
    };

    useEffect(() => {
        if (!name || !part || !count || nameError || partError || countError) {
            setIsSubmitDisabled(true);
        } else {
            setIsSubmitDisabled(false);
        }
    }, [name, part, count, nameError, partError, countError]);

    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value);
        setNameError('');
    };

    const handlePartChange = (part: string) => {
        const mappedPart = partMapping[part];
        setPart(mappedPart || '');
        setPartError('');
        setIsPartDropdownOpen(false);
    };

    const handleCountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setCount(value);
        if (parseInt(value) > 3) {
            setCountError(constants.countError);
        } else {
            setCountError('');
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const { email, password } = location.state as { email: string; password: string };
        if (name && part && count && !nameError && !partError && !countError) {
            try {
                await sendMail(email);
                navigate('/registerEmailVerify', { state: { email, password, name, part, generation: count } });
            } catch (error) {
                alert(constants.sendMailError);
            }
        } else {
            if (!name) setNameError(constants.noName);
            if (!part) setPartError(constants.noPart);
            if (!count) setCountError(constants.noCount);
        }
    };

    const handleCancel = () => navigate('/');

    return (
        <div className={styles.centeredContainer}>
            <div className={styles.registerForm}>
                <div className={styles.logoContainer}><img src={deplogLogo} className={styles.logo} alt={constants.logoAltText} /></div>
                <div className={styles.titleContainer}><label className={styles.title}>{constants.registerTitle}</label></div>
                <div className={styles.subtitleContainer}><label className={styles.subtitle}>{constants.registerSubtitle}</label></div>
                <form onSubmit={handleSubmit}>
                    <div className={styles.formGroup}>
                        <div className={styles.labelContainer}><label htmlFor="name">{constants.nameLabel}</label></div>
                        <div className={styles.inputWithButton}><input type="text" id="name" value={name} placeholder={constants.namePlaceholder} onChange={handleNameChange} /></div>
                        <div className={styles.errorMessageContainer}><span className={styles.errorMessage}>{nameError}</span></div>
                    </div>
                    <div className={styles.formGroup}>
                        <div className={styles.labelContainer}><label htmlFor="part">{constants.partLabel}</label></div>
                        <div className={styles.inputWithButton}>
                            <input type="text" id="part" value={Object.keys(partMapping).find(key => partMapping[key] === part) || ''} placeholder={constants.partPlaceholder} readOnly />
                            <img src={particon} alt="Part Icon" className={styles.partIcon} onClick={() => setIsPartDropdownOpen(!isPartDropdownOpen)} />
                        </div>
                        {isPartDropdownOpen && (
                            <div className={styles.dropdown}>
                                {Object.keys(partMapping).map(option => (
                                    <div key={option} onClick={() => handlePartChange(option)}>{option}</div>
                                ))}
                            </div>
                        )}
                    </div>
                    <div className={styles.formGroup}>
                        <div className={styles.labelContainer2}><label htmlFor="count">{constants.countLabel}</label></div>
                        <div className={styles.inputWithButton}><input type="number" id="count" value={count} placeholder={constants.countPlaceholder} onChange={handleCountChange} /></div>
                        <div className={styles.errorMessageContainer}><span className={styles.errorMessage}>{countError}</span></div>
                    </div>
                    <div className={styles.buttonGroup}>
                        <button type="button" className={styles.cancelButton} onClick={handleCancel}>{constants.previousButtonText}</button>
                        <button type="submit" className={styles.nextButton} disabled={isSubmitDisabled}>{constants.nextButtonText}</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default RegisterPage2;
