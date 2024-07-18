import React, { useEffect, useState } from 'react'
import { getMinMaxDates } from '../../utils/dateUtils';
import '../../styles/apptForm.css'

const ApptForm = () => {
  const [minDate, setMinDate] = useState('');
  const [maxDate, setMaxDate] = useState('');

  useEffect(() => {
    const { minDate, maxDate } = getMinMaxDates();
    setMinDate(minDate);
    setMaxDate(maxDate);
  }, []);

  return (
    <div className='appt-container'>
      <div className='appt-inputs'>
        <div className="appt-input">
          <form>
            <select>
              <option>김교수</option>
              <option>이교수</option>
            </select>
          </form>
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
    </div>
  )
}

export default ApptForm;
