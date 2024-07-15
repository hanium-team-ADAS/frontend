import React from 'react'
import { useNavigate } from 'react-router-dom'
import '../../styles/login.css'

const Login = () => {
    const navigate = useNavigate();

    const handleClickforDoctor = () => {
        navigate('/doctorSignUp');
    }

    const handleClickforPatient = () => {
        navigate('/patientSignUp');
    }

  return (
    <div className='login-component'>
        <div className='header'>
            <div className='text'>로그인</div>
        </div>
        <form className='form-login'>
            <div className="field-login">
                <div className='field-name'>분류</div>
                <select className="input" defaultValue='patient'>
                    <option value='patient'>환자</option>
                    <option value='doctor'>의사</option>
                </select>
            </div>
            <div className="field-login">
                <div className='field-name'>이메일</div>
                <input type="email" className="input" name="email" placeholder='Email Id' required/>
            </div>
            <div className="field-login">
                <div className='field-name'>비밀번호</div>
                <input type="password" className="input" name="password" placeholder='Password' required/>
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
