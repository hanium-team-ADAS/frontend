import React, { useEffect, useState } from 'react'
import { getMinMaxDates } from '../../utils/dateUtils';
import '../../styles/apptForm.css'

const ApptForm = ({ doctorData, selectedDoctorIndex, setSelectedDoctorIndex }) => {
  const [minDate, setMinDate] = useState('');
  const [maxDate, setMaxDate] = useState('');

  useEffect(() => {
    const { minDate, maxDate } = getMinMaxDates();
    setMinDate(minDate);
    setMaxDate(maxDate);
  }, []);

  const handleDoctorChange = (event) => {
    setSelectedDoctorIndex(parseInt(event.target.value));
  };

  return (
    <div className='appt-container'>
      <form>
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
              <input type='date' min={minDate} max={maxDate}></input>
            </div>
            <div className="appt-input">
              <input id='appt-time' type='time' name='appt-time' />
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
