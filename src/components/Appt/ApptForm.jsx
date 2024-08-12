import React, { useEffect, useState } from 'react'
import { getMinMaxDates } from '../../utils/dateUtils';
import { timeOptions } from '../../utils/timeOptions';
import api from '../../services/api';
import '../../styles/apptForm.css'

const ApptForm = ({ doctorData, selectedDoctorIndex, setSelectedDoctorIndex }) => {
  // 예약 가능한 날짜 범위
  const [minDate, setMinDate] = useState('');
  const [maxDate, setMaxDate] = useState('');

  useEffect(() => {
    const { minDate, maxDate } = getMinMaxDates();
    setMinDate(minDate);
    setMaxDate(maxDate);
  }, []);

  // 의사 선택 변경 시 호출되는 핸들러
  const handleDoctorChange = (event) => {
    setSelectedDoctorIndex(parseInt(event.target.value));
  };

  const [newAppt, setNewAppt] = useState({
    doctor: '',
    date:'',
    time:''
  });

  const handleChange = (e) => {
    const {name, value} = e.target;
    setNewAppt({ ...newAppt, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
        const response = await api.post('/', {
            doctor: newAppt.doctor,
            date: newAppt.date,
            time: newAppt.time
        });
        alert(response.data);
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
                    <option key={index} value={index}>{doctor.name}</option>
                  ))}
              </select>
            </div>
            <div className="appt-input">
              <input type='text' value={selectedDoctorIndex !== -1 ? doctorData[selectedDoctorIndex].major : ''} readOnly />
            </div>
            <div className="appt-input">
              <input type='date' name='date' onChange={handleChange} min={minDate} max={maxDate}></input>
            </div>
            <div className="appt-input">
              <select required id="appt-time" name="appt-time">
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
            <textarea>증상을 작성해주세요.</textarea>
          </div>
          <div className='appt-buttons'>
            <div className='appt-submit'>예약</div>
            <div className="appt-reset">취소</div>
          </div>
      </form>
    </div>
  )
}

export default ApptForm;
