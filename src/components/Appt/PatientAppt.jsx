import React, { useEffect, useState } from 'react';
import DoctorList from './DoctorList'
import ApptForm from './ApptForm'
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css';
import ApptDates from './ApptDates'
import { format } from 'date-fns';
import 'react-datepicker/dist/react-datepicker.css';
import '../../styles/patientAppt.css'
import api from '../../services/fetch';

const PatientAppt = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [doctorData, setDoctorData] = useState([]);
  const [selectedDoctorIndex, setSelectedDoctorIndex] = useState(-1);

  const handleDateChange = (date) => { 
    setSelectedDate(date);
  };

  useEffect(() => {
    const fetchDoctorData = async () => {
      try {
        const response = await api.fetch('/appointment/doctors');
        setDoctorData(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchDoctorData();
  }, []);

  return (
    <div className="patientAppt">
      <div className='makeAppt'>
        <h2>진료 예약</h2>
        <DoctorList
          doctorData={doctorData}
          selectedDoctorIndex={selectedDoctorIndex}
          setSelectedDoctorIndex={setSelectedDoctorIndex}
        />
        <ApptForm
          doctorData={doctorData}
          selectedDoctorIndex={selectedDoctorIndex}
          setSelectedDoctorIndex={setSelectedDoctorIndex}
        />
      </div>
      <div className='calendar'>
        <h2>예약 조회</h2>
        <Calendar
            locale="en-US" // 일요일부터 시작
            value={selectedDate}
            onChange={handleDateChange}
        />
        <ApptDates date={selectedDate ? format(selectedDate, 'yyyy-MM-dd') : null} />
      </div>
    </div>
  );
};

export default PatientAppt;