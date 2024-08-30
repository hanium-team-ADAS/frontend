import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../services/api';
import '../../styles/signUp.css';

const PatientSignUp = () => {
    const navigate = useNavigate();
    const handleClick = () => {
        navigate('/login');
    };

    const [user, setUser] = useState({
        name: '',
        dateOfBirth: '',
        password: '',
        email: '',
        phone: '',
        gender: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser({ ...user, [name]: value });
    };

    // Change Date Format
    const processUserDetails = () => {
        const { dateOfBirth, gender } = user;

        // Process dateOfBirth
        const year = dateOfBirth.slice(0, 2);
        const month = dateOfBirth.slice(2, 4);
        const day = dateOfBirth.slice(4, 6);

        let yearPrefix = '';
        if (gender === '1' || gender === '3') {
            yearPrefix = '19';
        } else if (gender === '2' || gender === '4') {
            yearPrefix = '20';
        }

        const formattedDateOfBirth = `${yearPrefix}${year}-${month}-${day}`;

        // Process gender
        let genderValue = '';
        if (gender === '1' || gender === '3') {
            genderValue = '0';
        } else if (gender === '2' || gender === '4') {
            genderValue = '1';
        }

        return { ...user, dateOfBirth: formattedDateOfBirth, gender: genderValue };
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const processedUser = processUserDetails();

        try {
            const response = await api.post('/patient/sign-up', processedUser);
            alert(response.data);
            alert(user.name + ' 님 환영합니다.\n로그인 페이지로 이동합니다.')
            navigate('/login');
        } catch (error) {
            alert('SignUp failed');
        }
    };

    return (
        <div className='PatientSignUp-component'>
            <div className='header'>
                <div className='text'>회원가입</div>
            </div>
            <form className='form-signUp' onSubmit={handleSubmit}>
                <div className='field-signUp'>
                    <div className='field-name'>이름</div>
                    <input type='text' className='input' placeholder='Name' name='name'
                        value={user.userName} onChange={handleChange} required />
                </div>
                <div className='field-signUp'>
                    <div className='field-name'>주민등록번호</div>
                    <div className='input-rrn'>
                        <input type='text' className='input' placeholder='000000' maxLength='6' pattern='[0-9]{6}' name='dateOfBirth'
                            value={user.dateOfBirth} onChange={handleChange} required />
                        -
                        <input type='text' className='input' placeholder='0******' maxLength='1' pattern='[1-4]{1}' name='gender'
                            value={user.gender} onChange={handleChange} required />
                    </div>
                </div>
                <div className='field-signUp'>
                    <div className='field-name'>이메일</div>
                    <input type='email' className='input' placeholder='Email Id' name='email'
                        value={user.email} onChange={handleChange} required />
                </div>
                <div className='field-signUp'>
                    <div className='field-name'>비밀번호</div>
                    <input type='password' className='input' placeholder='Password' name='password'
                        value={user.password} onChange={handleChange} required />
                </div>
                <div className='field-signUp'>
                    <div className='field-name'>전화번호</div>
                    <input type='text' className='input' placeholder='하이픈 "-"을 제외하고 입력해주세요.' name='phone'
                        value={user.phone} onChange={handleChange} required />
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
