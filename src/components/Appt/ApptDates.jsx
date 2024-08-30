import React, { useEffect, useState } from 'react';
import { handleAcceptReservation, handleRejectReservation } from '../../utils/updateRes';
import api from '../../services/fetch';
import '../../styles/apptDate.css'

const ApptDates = ({ date, patientId }) => {
    const [appointments, setAppointments] = useState([]);
    const [selectedApptId, setSelectedApptId] = useState(null);
    const [showConfirmModal, setShowConfirmModal] = useState(false);

    useEffect(() => {
        const fetchApptData = async () => {
          try {
            //const response = await api.fetch(`/appointment/patient/${patientId}`);
            const response = await fetch('http://localhost:3000/data/apptDates.json')
            const data = await response.json();
            const updatedData = data.map((appointment) => {
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

    const handleCheckboxChange = (id) => {
        setSelectedApptId(id);
        setShowConfirmModal(true);
    };
    const handleCancelDelete = () => {
        setShowConfirmModal(false);
        setSelectedApptId(null);
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
                                <tr key={index} className={appointment.status === 'rejected' ? 'rejected' : ''}>
                                    <td>{appointment.doctor.name}</td>
                                    <td>{appointment.date}</td>
                                    <td>{appointment.time}</td>
                                    {appointment.status === 'newAppt' ? (
                                        <td>
                                            <form>
                                                <input 
                                                    type='checkbox' 
                                                    value={appointment.id}
                                                    checked={selectedApptId === appointment.id}
                                                    onChange={() => handleCheckboxChange(appointment.id)}
                                                />
                                            </form>
                                        </td>
                                    ) : (
                                        <td className='appt_status'>
                                            {appointment.status}
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
                        <button onClick={() => handleRejectReservation(appointments, selectedApptId, setAppointments, setShowConfirmModal, setSelectedApptId)}>확인</button>
                        <button onClick={handleCancelDelete}>취소</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ApptDates;
