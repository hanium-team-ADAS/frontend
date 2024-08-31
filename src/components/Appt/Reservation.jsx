import React, { useEffect, useState } from 'react';
import { handleAcceptReservation, handleRejectReservation } from '../../utils/updateRes';
import '../../styles/reservation.css';
import api from '../../services/fetch';

const Reservation = ({ date }) => {
    const [appointments, setAppointments] = useState([]);
    const [selectedApptIndex, setSelectedApptIndex] = useState(-1); // selectedApptIndex로 변경
    const [showConfirmModal, setShowConfirmModal] = useState(false);

    const doctorId = 1; // 임시

    useEffect(() => {
        const fetchResData = async () => {
            try {
                const response = await api.fetch(`/appointment/doctor/${doctorId}`);
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
                console.error('Error fetching data:', error);
            }
        };

        fetchResData();
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
        <div className="resDates">
            {date ? (
                filteredAppointments.length > 0 ? (
                    <table className="resTable">
                        <thead>
                            <tr>
                                <th>이름</th>
                                <th>시간</th>
                                <th>예약 상태</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredAppointments.map((appointment, index) => (
                                <tr key={index} className={appointment.status === 2 ? 'rejected' : ''}>
                                    <td>{appointment.patientName}</td>
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
                        <p>예약을 수락하시겠습니까?</p>
                        <button onClick={() => handleAcceptReservation(filteredAppointments, selectedApptIndex, setAppointments, setShowConfirmModal, setSelectedApptIndex)}>수락</button>
                        <button onClick={() => handleRejectReservation(filteredAppointments, selectedApptIndex, setAppointments, setShowConfirmModal, setSelectedApptIndex)}>거절</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Reservation;
