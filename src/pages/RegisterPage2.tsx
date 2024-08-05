import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './RegisterPage2.module.css';
import deplogLogo from '../images/deplogLogo.png';
import particon from '../images/particon.png';

const RegisterPage: React.FC = () => {
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
        if (name && part && count) {
            navigate('/emailVerify');
        }
    };

    const handleCancel = () => {
        navigate('/');
    };

    return (
        <div className={styles.centeredContainer}>
            <div className={styles.registerForm}>
                <div className={styles.logoContainer}>
                    <img src={deplogLogo} className={styles.logo} alt="Logo" />
                </div>
                <div className={styles.titleContainer}>
                    <label className={styles.title}>회원가입</label>
                </div>
                <div className={styles.subtitleContainer}>
                    <label className={styles.subtitle}>매일 계정 인증 및 승인 이후 추가 회원가입이 완료됩니다.</label>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className={styles.formGroup}>
                        <div className={styles.labelContainer}>
                            <label htmlFor="name">이름</label>
                        </div>
                        <div className={styles.inputWithButton}>
                            <input
                                type="text"
                                id="name"
                                value={name}
                                placeholder='본명을 입력해주세요.'
                                onChange={handleNameChange}
                            />
                        </div>
                        <div className={styles.errorMessageContainer}>
                            <span className={styles.errorMessage}>{nameError}</span>
                        </div>
                    </div>
                    <div className={styles.formGroup}>
                        <div className={styles.labelContainer}>
                            <label htmlFor="part">파트</label>
                        </div>
                        <div className={styles.inputWithButton}>
                            <input
                                type="text"
                                id="part"
                                value={part}
                                placeholder='파트를 선택해주세요.'
                                readOnly
                            />
                            <img src={particon} alt="Part Icon" className={styles.partIcon} onClick={() => setIsPartDropdownOpen(!isPartDropdownOpen)} />
                        </div>
                        {isPartDropdownOpen && (
                            <div className={styles.dropdown}>
                                <div onClick={() => handlePartChange('기획')}>기획</div>
                                <div onClick={() => handlePartChange('디자인')}>디자인</div>
                                <div onClick={() => handlePartChange('웹')}>웹</div>
                                <div onClick={() => handlePartChange('안드로이드')}>안드로이드</div>
                                <div className={styles.divlast} onClick={() => handlePartChange('서버')}>서버</div>
                            </div>
                        )}
                    </div>
                    <div className={styles.formGroup}>
                        <div className={styles.labelContainer2}>
                            <label htmlFor="count">기수</label>
                        </div>
                        <div className={styles.inputWithButton}>
                            <input
                                type="number"
                                id="count"
                                value={count}
                                placeholder='0'
                                onChange={handleCountChange}
                            />
                        </div>
                        <div className={styles.errorMessageContainer}>
                            <span className={styles.errorMessage}>{countError}</span>
                        </div>
                    </div>
                    <div className={styles.buttonGroup}>
                        <button type="button" className={styles.cancelButton} onClick={handleCancel}>이전</button>
                        <button type="submit" className={styles.nextButton} disabled={!name || !part || !count || !!nameError || !!partError || !!countError}>
                            다음
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default RegisterPage;
