import React, { useEffect, useState } from 'react';
import api from '../../services/fetch';
import '../../styles/apptDate.css'

const ApptDates = ({ date, patientId }) => {
    const [appointments, setAppointments] = useState([]);
    const [selectedApptId, setSelectedApptId] = useState(null);
    const [showConfirmModal, setShowConfirmModal] = useState(false);

    useEffect(() => {
        const fetchApptData = async () => {
          try {
            const response = await api.fetch(`/appointment/patient/${patientId}`);
            setAppointments(response.data);
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

    const handleConfirmDelete = () => {
        const updatedAppointments = appointments.filter(
            appointment => appointment.id !== selectedApptId
        );
        setAppointments(updatedAppointments);
        setShowConfirmModal(false);
        setSelectedApptId(null);
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
                                <tr key={index}>
                                    <td>{appointment.doctor.name}</td>
                                    <td>{appointment.date}</td>
                                    <td>{appointment.time}</td>
                                    <td>
                                        <form>
                                            <input
                                                type='checkbox'
                                                checked={selectedApptId === appointment.id}
                                                onChange={() => handleCheckboxChange(appointment.id)}
                                            />
                                        </form>
                                    </td>
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
                        <button onClick={handleConfirmDelete}>확인</button>
                        <button onClick={handleCancelDelete}>취소</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ApptDates;
