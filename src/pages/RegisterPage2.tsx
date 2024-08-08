import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../style/RegisterPage2.module.css';
import deplogLogo from '../images/deplogLogo.png';
import particon from '../images/particon.png';
import { constants } from '../constants';

const RegisterPage2: React.FC = () => {
    const [name, setName] = useState('');
    const [part, setPart] = useState('');
    const [count, setCount] = useState('');
    const [nameError, setNameError] = useState('');
    const [partError, setPartError] = useState('');
    const [countError, setCountError] = useState('');
    const [isPartDropdownOpen, setIsPartDropdownOpen] = useState(false);

    const navigate = useNavigate();

    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value);
        setNameError('');
    };

    const handlePartChange = (part: string) => {
        setPart(part);
        setPartError('');
        setIsPartDropdownOpen(false);
    };

    const handleCountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCount(e.target.value);
        setCountError('');
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        name && part && count && navigate('/emailVerify');
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
                            <input type="text" id="part" value={part} placeholder={constants.partPlaceholder} readOnly />
                            <img src={particon} alt="Part Icon" className={styles.partIcon} onClick={() => setIsPartDropdownOpen(!isPartDropdownOpen)} />
                        </div>
                        {isPartDropdownOpen && (
                            <div className={styles.dropdown}>
                                {constants.partOptions.map(option => (
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
                        <button type="submit" className={styles.nextButton} disabled={!name || !part || !count || !!nameError || !!partError || !!countError}>{constants.nextButtonText}</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default RegisterPage2;
