import React, { useEffect, useState } from 'react';
import '../../styles/reservation.css'

const Reservation = ({ date }) => {
    const [appointments, setAppointments] = useState([]);
    const [selectedApptIndex, setSelectedApptIndex] = useState(-1);
    const [showConfirmModal, setShowConfirmModal] = useState(false);

    useEffect(() => {
        fetch('/data/resList.json')
            .then(response => response.json())
            .then(data => setAppointments(data))
            .catch(error => console.error('Error fetching data:', error));
    }, []);

    // 선택한 날짜와 일치하는 예약 필터링
    const filteredAppointments = appointments.filter(
        (appointment) => appointment.date === date
    );

    const handleCheckboxChange = (index) => {
        setSelectedApptIndex(index);
        setShowConfirmModal(true);
    };

    const handleConfirmDelete = () => {
        const updatedAppointments = appointments.filter((_, index) => index !== selectedApptIndex);
        setAppointments(updatedAppointments);
        setShowConfirmModal(false);
        setSelectedApptIndex(-1);
        // JSON 파일을 서버에 업데이트하려면 추가적인 POST 요청이 필요함
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
                                <th>취소</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredAppointments.map((appointment, index) => (
                                <tr key={index}>
                                    <td>{appointment.name}</td>
                                    <td>{appointment.time}</td>
                                    <td>
                                        <form>
                                            <input type='checkbox' value={index}
                                                checked={selectedApptIndex === index}
                                                onChange={() => handleCheckboxChange(index)}/>
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

export default Reservation;
