import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from '../components/Home'
import Login from '../components/Auth/Login'
import DoctorSignUp from '../components/Auth/DoctorSignUp';
import PatientSignUp from '../components/Auth/PatientSignUp';
import DoctorAppt from '../components/Appt/DoctorAppt'
import PatientAppt from '../components/Appt/PatientAppt'
import PrivateRoute from '../components/PrivateRoute';
import TreatPage from '../components/Treatment/TreatPage';

const AppRoutes = () => {
    const userRole = 'patient'; // 실제 사용자 역할 로직으로 교체 필요

    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/doctorSignUp" element={<DoctorSignUp />} />
            <Route path="/patientSignUp" element={<PatientSignUp />} />
            <Route path="/appointment" element={
                <PrivateRoute>
                    {userRole === 'patient' ? <PatientAppt /> : <DoctorAppt />}
                </PrivateRoute>
            } />
            <Route path='/treatment' element={<TreatPage />} />
        </Routes>
    );
};

export default AppRoutes;
