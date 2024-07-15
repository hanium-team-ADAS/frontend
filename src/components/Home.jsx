import React from 'react';
import Hero from '../components/Hero'
import DoctorImg from '../images/doctor.png'
import '../styles/home.css'

const Home = () => {
  return (
    <div className='home'>
        <Hero />
        <div className='heroImg'>
            <img src={DoctorImg} className='doctorImg' alt="doctorImg" />
        </div>
    </div>
  );
};

export default Home;
