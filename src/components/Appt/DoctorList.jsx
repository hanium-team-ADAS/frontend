import React from 'react';
import '../../styles/doctorList.css';

const DoctorList = ({ doctorData, selectedDoctorIndex, setSelectedDoctorIndex }) => {
    
    const handleCheckboxChange = (event) => {
        if (event.target.checked) {
          setSelectedDoctorIndex(parseInt(event.target.value));
        } else {
          setSelectedDoctorIndex(-1);
        }
    };

    return (
        <div className="doctorList">
        <table className="doctorTable">
            <thead>
            <tr>
                <th>교수명</th>
                <th>전공</th>
                <th>예약</th>
            </tr>
            </thead>
            <tbody>
            {doctorData.map((doctor, index) => (
                <tr key={index}>
                    <td>{doctor.name}</td>
                    <td>{doctor.specialization}</td>
                    <td>
                        <form name='doctorListForm'>
                            <input type='checkbox' name="option" value={index}
                                checked={selectedDoctorIndex === index}
                                onChange={handleCheckboxChange}/>  
                        </form>                     
                    </td>
                </tr>
            ))}
            </tbody>
        </table>
        </div>
    );
};

export default DoctorList;