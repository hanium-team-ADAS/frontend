import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from '../components/Home'
import Login from '../components/Auth/Login'
import DoctorSignUp from '../components/Auth/DoctorSignUp';
import PatientSignUp from '../components/Auth/PatientSignUp';
import DoctorAppt from '../components/Appt/DoctorAppt'
import PatientAppt from '../components/Appt/PatientAppt'
import PrivateRoute from '../components/PrivateRoute';

const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/doctorSignUp" element={<DoctorSignUp />} />
            <Route path="/patientSignUp" element={<PatientSignUp />} />
            <Route path="/patientAppt" element={
                <PrivateRoute>
                    <PatientAppt />
                </PrivateRoute>
            } />
            <Route path="/doctorAppt" element={
                <PrivateRoute>
                    <DoctorAppt />
                </PrivateRoute>
            } />
        </Routes>
    );
};

export default AppRoutes;
