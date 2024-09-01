import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import '../styles/navbar.css';

const Navbar = ({ onHeightChange }) => {
    const navbarRef = useRef(null);
    const navigate = useNavigate();
    const [cookies] = useCookies(['role']);
    const userRole = cookies.role || 'guest'; // 쿠키에서 role 가져오기

    const moveToHome = () => {
        navigate('/');
    };

    const moveToAppointment = () => {
        if (userRole === 'D') {
            navigate('/doctorAppointment'); // 의사의 예약 페이지로 이동
        } else if (userRole === 'P') {
            navigate('/patientAppointment'); // 환자의 예약 페이지로 이동
        } else {
            navigate('/login'); // role이 없는 경우 로그인 페이지로 이동
        }
    };

    const moveToTreatment = () => {
        navigate('/treatment');
    };

    const moveToLogin = () => {
        navigate('/login');
    };

    useEffect(() => {
        const updateNavbarHeight = () => {
            if (navbarRef.current) {
                onHeightChange(navbarRef.current.offsetHeight);
            }
        };

        updateNavbarHeight();
        window.addEventListener('resize', updateNavbarHeight);

        return () => {
            window.removeEventListener('resize', updateNavbarHeight);
        };
    }, [onHeightChange]);

    return (
        <div ref={navbarRef} className='nav'>
            <div className="nav-logo">원격진료시스템 by ADAS</div>
            <ul className="nav-menu">
                <li className="nav-home" onClick={moveToHome}>홈</li>
                <li className="nav-appointment" onClick={moveToAppointment}>예약</li>
                <li className="nav-treatment" onClick={moveToTreatment}>진료</li>
                <li className="nav-login" onClick={moveToLogin}>로그인</li>
            </ul>
        </div>
    );
};

export default Navbar;

