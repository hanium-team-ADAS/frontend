import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../../services/api';
import '../../styles/signUp.css'

const DoctorSignUp = () => {
    const navigate = useNavigate();
    const handleClick = () => {
        navigate('/login');
    }

    const [user, setUser] = useState({
        name: '',
        email: '',
        password: '',
        specialization: '',
        phone: '',
        licenseNumber: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser({ ...user, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try {
            const response = await api.post('/doctor/sign-up', user);
            alert(response.data);
            alert(user.name + ' 님 환영합니다.\n로그인 페이지로 이동합니다.')
            navigate('/login');
        } catch (error) {
            alert('SignUp failed');
        }
    };

  return (
    <div className='DoctorSignUp-component'>
        <div className='header'>
            <div className='text'>회원가입</div>
        </div>
        <form className='form-signUp' onSubmit={handleSubmit}>
            <div className="field-signUp">
                <div className='field-name'>이름</div>
                <input type='text' className='input' placeholder='Name' name='name'
                    value={user.userName} onChange={handleChange} required />
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
            <div className="field-signUp">
                <div className='field-name'>전공</div>
                <input type="text" className='input' placeholder='전공 입력' name='specialization'
                    value={user.specialization} onChange={handleChange} required />
            </div>
            <div className="field-signUp">
                <div className='field-name'>면허정보</div>
                <input type="text" className='input' placeholder="면허번호 입력" name='licenseNumber'
                    value={user.licenseNumber} onChange={handleChange} required />
            </div>
            <div className='field-signUp'>
                <div className='field-name'>전화번호</div>
                <input type='text' className='input' placeholder='하이픈 "-"을 제외하고 입력해주세요.' name='phone'
                    value={user.phone} onChange={handleChange} required />
            </div>
            <div className="submit-signUp">
                <input type='submit' className="submit" value='회원가입'/>
                <input type='submit' className='backLogin' onClick={handleClick} value='로그인'/>
            </div>
        </form>
    </div>
  )
}

export default DoctorSignUp
