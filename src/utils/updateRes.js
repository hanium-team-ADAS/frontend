// 상태 업데이트 및 서버에 요청을 보내는 공통 함수
const updateAppointmentStatus = async (appointments, selectedApptIndex, newStatus) => {
    const updatedAppointments = appointments.map((appointment, index) => {
        if (index === selectedApptIndex) {
            return { ...appointment, status: newStatus };
        }
        return appointment;
    });

    try {
        await fetch('/api/updateAppointment', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedAppointments[selectedApptIndex]),
        });
    } catch (error) {
        console.error('Error updating appointment:', error);
    }

    return updatedAppointments;
};

// 예약 수락 함수
const handleAcceptReservation = async (appointments, selectedApptIndex, setAppointments, setShowConfirmModal, setSelectedApptIndex) => {
    const updatedAppointments = await updateAppointmentStatus(appointments, selectedApptIndex, 'accepted');
    setAppointments(updatedAppointments);
    setShowConfirmModal(false);
    setSelectedApptIndex(-1);
};

// 예약 거절 함수
const handleRejectReservation = async (appointments, selectedApptIndex, setAppointments, setShowConfirmModal, setSelectedApptIndex) => {
    const updatedAppointments = await updateAppointmentStatus(appointments, selectedApptIndex, 'rejected');
    setAppointments(updatedAppointments);
    setShowConfirmModal(false);
    setSelectedApptIndex(-1);
};