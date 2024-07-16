import React, { useEffect, useState } from 'react'
import '../../styles/apptForm.css'

const ApptForm = () => {
  const [minDate, setMinDate] = useState('');
  const [maxDate, setMaxDate] = useState('');

  useEffect(() => {
    // 오늘 날짜 가져오기
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, '0'); // 월은 0부터 시작하므로 +1
    const dd = String(today.getDate()).padStart(2, '0');
    const todayStr = `${yyyy}-${mm}-${dd}`;

    // 4주(28일) 후 날짜 계산
    const fourWeeksLater = new Date(today);
    fourWeeksLater.setDate(today.getDate() + 28);

    const fourWeeksYyyy = fourWeeksLater.getFullYear();
    const fourWeeksMm = String(fourWeeksLater.getMonth() + 1).padStart(2, '0');
    const fourWeeksDd = String(fourWeeksLater.getDate()).padStart(2, '0');
    const fourWeeksStr = `${fourWeeksYyyy}-${fourWeeksMm}-${fourWeeksDd}`;

    setMinDate(todayStr);
    setMaxDate(fourWeeksStr);
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
