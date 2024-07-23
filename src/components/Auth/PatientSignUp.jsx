import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../../styles/signUp.css';

const PatientSignUp = () => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate('/login');
    };

    return (
        <div className='PatientSignUp-component'>
            <div className='header'>
                <div className='text'>회원가입</div>
            </div>
            <form className='form-signUp'>
                <div className='field-signUp'>
                    <div className='field-name'>이름</div>
                    <input type='text' className='input' placeholder='Name' name='name' required />
                </div>
                <div className='field-signUp'>
                    <div className='field-name'>주민등록번호</div>
                    <div className='input-phone'>
                        <input type='text' className='input' placeholder='000000' maxLength='6' pattern='[0-9]{6}' name='residentID1' required />
                        -
                        <input type='text' className='input' placeholder='0******' maxLength='1' pattern='[1-4]{1}' name='residentID2' required />
                    </div>
                </div>
                <div className='field-signUp'>
                    <div className='field-name'>이메일</div>
                    <input type='email' className='input' placeholder='Email Id' name='email' required />
                </div>
                <div className='field-signUp'>
                    <div className='field-name'>비밀번호</div>
                    <input type='password' className='input' placeholder='Password' name='password' required />
                </div>
                <div className='field-signUp'>
                    <div className='field-name'>전화번호</div>
                    <div className='input-phone'>
                        <input type='text' className='input' placeholder='000' maxLength='3' pattern='[0-1]{3}' name='phone1' required />
                        -
                        <input type='text' className='input' placeholder='0000' maxLength='4' pattern='[0-9]{4}' name='phone2' required />
                        -
                        <input type='text' className='input' placeholder='0000' maxLength='4' pattern='[0-9]{4}' name='phone3' required />
                    </div>
                </div>
                <div className='submit-signUp'>
                    <input type='submit' className='submit' value='회원가입' />
                    <input type='button' className='backLogin' onClick={handleClick} value='로그인' />
                </div>
            </form>
        </div>
    );
};

export default PatientSignUp;
