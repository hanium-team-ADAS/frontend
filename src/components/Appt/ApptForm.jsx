import React, { useEffect, useState } from 'react'
import { getMinMaxDates } from '../../utils/dateUtils';
import { timeOptions } from '../../utils/timeOptions';
import api from '../../services/api';
import '../../styles/apptForm.css'

const ApptForm = ({ doctorData, selectedDoctorIndex, setSelectedDoctorIndex, patientId, setPatientId }) => {
  const [minDate, setMinDate] = useState('');
  const [maxDate, setMaxDate] = useState('');
  const [newAppt, setNewAppt] = useState({
    doctorId: null,
    date: '',
    time: '',
    symptoms: ''
  });

  useEffect(() => {
    const { minDate, maxDate } = getMinMaxDates();
    setMinDate(minDate);
    setMaxDate(maxDate);
  }, []);

  useEffect(() => {
    if (selectedDoctorIndex >= 0 && selectedDoctorIndex < doctorData.length) {
      setNewAppt(prevState => ({
        ...prevState,
        doctorId: doctorData[selectedDoctorIndex].id // 고유 ID 사용
      }));
    }
  }, [selectedDoctorIndex, doctorData]);

  const handleDoctorChange = (event) => {
    setSelectedDoctorIndex(parseInt(event.target.value));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewAppt({ ...newAppt, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (newAppt.doctorId === null || newAppt.date === '' || newAppt.time === '') {
      alert('Please complete all required fields.');
      return;
    }
    
    try {
        const response = await api.post(`/appointment/create?patientId=${patientId}`, newAppt);
        alert('Appointment successfully created!');
      } catch (error) {
        alert('Submit failed');
      }
  };

  return (
    <div className='appt-container'>
      <form className='appt-form' onSubmit={handleSubmit}>
        <div className='appt-inputs'>
            <div className="appt-input">
              <select value={selectedDoctorIndex} onChange={handleDoctorChange}>
                <option value="-1">의사 선택</option>
                  {doctorData.map((doctor, index) => (
                    <option key={doctor.id} value={index}>
                      {doctor.name}
                    </option>
                  ))}
              </select>
            </div>
            <div className="appt-input">
              <input type='text' value={selectedDoctorIndex !== -1 ? doctorData[selectedDoctorIndex].specialization : ''} readOnly />
            </div>
            <div className="appt-input">
              <input
                type='date'
                name='date'
                onChange={handleChange}
                value={newAppt.date}
                min={minDate}
                max={maxDate}
              />
            </div>
            <div className="appt-input">
              <select required id="time" name="time" onChange={handleChange} value={newAppt.time}>
                <option value="-1">시간 선택</option>
                  {timeOptions.map((time, index) => (
                      <option key={index} value={time}>
                          {time}
                      </option>
                  ))}
              </select>
            </div>
          </div>
          <div className='appt-textarea'>
            <textarea
              name='symptoms'
              onChange={handleChange}
              value={newAppt.symptoms}
              placeholder='증상을 작성해주세요.'
            />
          </div>
          <div className='appt-buttons'>
            <button type='submit' className='appt-submit'>예약</button>
            <button type='button' className='appt-reset' onClick={() => setNewAppt({ doctorId: null, date: '', time: '', symptoms: '' })}>취소</button>
          </div>
      </form>
    </div>
  )
}

export default ApptForm;
