import React from 'react';
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css';
import ApptDates from './ApptDates'
import '../../styles/patientAppt.css'

const DoctorAppt = () => {
    
  return (
    <div className="doctorAppt">
      <div className='calendar'>
        <h2>예약 조회</h2>
        <Calendar
            locale="en-US" // 일요일부터 시작
        />
        <ApptDates />
      </div>
    </div>
  );
};

export default DoctorAppt;