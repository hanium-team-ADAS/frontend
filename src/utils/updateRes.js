import api from '../services/api'

const updateAppointmentStatus = async (appointmentId, newStatus) => {
    try {
        await api.put('/appointment/update-status', null, {
            params: {
                appointmentId: appointmentId,
                status: newStatus
            }
        });
    } catch (error) {
        console.error('Error updating appointment:', error);
        throw error;
    }
};

// 예약 수락 함수
export const handleAcceptReservation = async (appointments, selectedApptIndex, setAppointments, setShowConfirmModal, setSelectedApptIndex) => {
    const selectedAppointment = appointments[selectedApptIndex];

    try {
        await updateAppointmentStatus(selectedApptIndex, 1);
        
        // 로컬 상태 업데이트
        const updatedAppointments = appointments.map((appointment, id) => 
            id === selectedApptIndex ? { ...appointment, status: 1 } : appointment
        );
        setAppointments(updatedAppointments);
    } catch (error) {
        console.error('Failed to accept reservation:', error);
    } finally {
        setShowConfirmModal(false);
        setSelectedApptIndex(-1);
    }
};

// 예약 거절 함수
export const handleRejectReservation = async (appointments, selectedApptIndex, setAppointments, setShowConfirmModal, setSelectedApptIndex) => {
    const selectedAppointment = appointments[selectedApptIndex];
    await api.post(`/appointment/cancel`, selectedApptIndex);

    try {
        await updateAppointmentStatus(selectedApptIndex, 2);
        
        // 로컬 상태 업데이트
        const updatedAppointments = appointments.map((appointment, id) => 
            id === selectedApptIndex ? { ...appointment, status: 2 } : appointment
        );
        setAppointments(updatedAppointments);
    } catch (error) {
        console.error('Failed to reject reservation:', error);
    } finally {
        setShowConfirmModal(false);
        setSelectedApptIndex(-1);
    }
};
