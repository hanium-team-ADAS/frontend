import React, { useState } from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import DoctorList from './DoctorList'
import ApptForm from './ApptForm'
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css';
import ApptDates from './ApptDates'
import { format } from 'date-fns';
import '../../styles/patientAppt.css'

const PatientAppt = () => {
    const [selectedDate, setSelectedDate] = useState(null);

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  return (
    <div className="patientAppt">
      <div className='makeAppt'>
        <h2>진료 예약</h2>
        <DoctorList />
        <ApptForm />
      </div>
      <div className='calendar'>
        <h2>예약 조회</h2>
        <Calendar
            locale="en-US" // 일요일부터 시작
            selected={selectedDate}
            onChange={handleDateChange}
            dateFormat="yyyy-MM-dd"
        />
        {selectedDate && (
          <ApptDates date={format(selectedDate, 'yyyy-MM-dd')} />
        )}
      </div>
    </div>
  );
};

export default PatientAppt;