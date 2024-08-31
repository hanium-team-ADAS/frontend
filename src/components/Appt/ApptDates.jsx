import React, { useEffect, useState } from 'react';
import { handleAcceptReservation, handleRejectReservation } from '../../utils/updateRes';
import api from '../../services/fetch';
import '../../styles/apptDate.css'

const ApptDates = ({ date, patientId }) => {
    const [appointments, setAppointments] = useState([]);
    const [selectedApptIndex, setSelectedApptIndex] = useState(-1); // selectedApptIndex로 변경
    const [showConfirmModal, setShowConfirmModal] = useState(false);

    useEffect(() => {
        const fetchApptData = async () => {
          try {
            const response = await api.fetch(`/appointment/patient/${patientId}`);
            const updatedData = response.data.map((appointment) => {
                if (appointment.status === 0) {
                    return { ...appointment, status: 'newAppt' };
                } else if (appointment.status === 1) {
                    return { ...appointment, status: 'accepted' };
                } else if (appointment.status === 2) {
                    return { ...appointment, status: 'rejected' };
                }
                return appointment;
            });
            setAppointments(updatedData);
          } catch (error) {
            console.error(error);
          }
        };
    
        fetchApptData();
      }, []);

    // 선택한 날짜와 일치하는 예약 필터링
    const filteredAppointments = appointments.filter(
        (appointment) => appointment.date === date
    );

    const handleCheckboxChange = (index) => {
        setSelectedApptIndex(index); // 인덱스를 상태로 설정
        setShowConfirmModal(true);
    };

    const handleCancelDelete = () => {
        setShowConfirmModal(false);
        setSelectedApptIndex(-1);
    };


    return (
        <div className="apptDates">
            {date ? (
                filteredAppointments.length > 0 ? (
                    <table className="apptTable">
                        <thead>
                            <tr>
                                <th>교수 성함</th>
                                <th>날짜</th>
                                <th>시간</th>
                                <th>취소</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredAppointments.map((appointment, index) => (
                                <tr key={index} className={appointment.status === 2 ? 'rejected' : ''}>
                                    <td>{appointment.doctor.name}</td>
                                    <td>{appointment.date}</td>
                                    <td>{appointment.time}</td>
                                    {appointment.status === 'newAppt' ? (
                                        <td>
                                            <form>
                                                <input 
                                                    type='checkbox' 
                                                    value={index}
                                                    checked={selectedApptIndex === index}
                                                    onChange={() => handleCheckboxChange(index)}
                                                />
                                            </form>
                                        </td>
                                    ) : (
                                        <td className='appt_status'>
                                            {appointment.status === 1 ? '수락' :
                                            appointment.status === 2 ? '거절' : ''} 
                                        </td>
                                    )}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <p>선택한 날짜에 예약이 없습니다.</p>
                )
            ) : (
                <p>조회를 원하는 날짜를 선택하세요.</p>
            )}

            {showConfirmModal && (
                <div className="modal">
                    <div className="modal-content">
                        <span className="close" onClick={handleCancelDelete}>&times;</span>
                        <p>정말 예약을 취소하시겠습니까?</p>
                        <button onClick={() => handleRejectReservation(filteredAppointments, selectedApptIndex, setAppointments, setShowConfirmModal, setSelectedApptIndex)}>거절</button>
                        <button onClick={handleCancelDelete}>취소</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ApptDates;
