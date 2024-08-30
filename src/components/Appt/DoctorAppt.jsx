import React, { useState } from 'react';
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css';
import Reservation from './Reservation'
import { format } from 'date-fns';
import 'react-datepicker/dist/react-datepicker.css';
import '../../styles/doctorAppt.css'

const DoctorAppt = () => {
  const [selectedDate, setSelectedDate] = useState(null);

  const handleDateChange = (date) => { 
    setSelectedDate(date);
  };
    
  return (
    <div className="doctorAppt">
      <h2>예약 조회</h2>
      <div className='checkAppt'> 
        <Calendar
            locale="en-US" // 일요일부터 시작
            selected={selectedDate}
            onChange={handleDateChange}
            dateFormat="yyyy-MM-dd"
        />
        <Reservation date={selectedDate ? format(selectedDate, 'yyyy-MM-dd') : null} />
      </div>
    </div>
  );
};

export default DoctorAppt;