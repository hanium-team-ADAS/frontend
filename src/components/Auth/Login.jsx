import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../services/api';
import '../../styles/login.css';

const Login = () => {
    const navigate = useNavigate();

    const handleClickforDoctor = () => {
        navigate('/doctorSignUp');
    }

    const handleClickforPatient = () => {
        navigate('/patientSignUp');
    }

    const [user, setUser] = useState({
        email: '',
        password: '',
        type: 'patient'
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser({ ...user, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const endpoint = user.type === 'doctor' ? '/doctor/sign-in' : '/patient/sign-in';
        try {
            const response = await api.post(endpoint, {
                email: user.email,
                password: user.password
            });
            alert(response.data);
        } catch (error) {
            alert('Login failed');
        }
    };

  return (
    <div className='login-component'>
        <div className='header'>
            <div className='text'>로그인</div>
        </div>
        <form className='form-login' onSubmit={handleSubmit}>
            <div className="field-login">
                <div className='field-name'>분류</div>
                <select className="input" name="type" value={user.type} onChange={handleChange}>
                    <option value='patient'>환자</option>
                    <option value='doctor'>의사</option>
                </select>
            </div>
            <div className="field-login">
                <div className='field-name'>이메일</div>
                <input type="email" className="input" name="email" placeholder='Email Id'
                    value={user.email} onChange={handleChange} required/>
            </div>
            <div className="field-login">
                <div className='field-name'>비밀번호</div>
                <input type="password" className="input" name="password" placeholder='Password'
                    value={user.password} onChange={handleChange} required/>
            </div>
            <div className="submit-login">
                <input type='submit' className="submit" value='로그인'/>
            </div>
        </form>
        <div className='signUp'>
            <div className="doctor-signUp" onClick={handleClickforDoctor}>의사 회원가입</div>
            <div className="patient-signUp" onClick={handleClickforPatient}>환자 회원가입</div>
        </div>
    </div>
  );
};

export default Login
