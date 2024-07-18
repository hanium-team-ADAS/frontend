import React, { useEffect, useState } from 'react';
import '../../styles/doctorList.css';

const DoctorList = () => {
    const [doctorData, setDoctorData] = useState([]);
    const [selectedOption, setSelectedOption] = useState('');

    useEffect(() => {
        fetch('/data/doctor.json')
            .then(response => response.json())
            .then(data => setDoctorData(data))
            .catch(error => console.error('Error fetching data:', error));
    }, []);

    const handleOptionChange = (event) => {
        setSelectedOption(event.target.value);
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
                    <td>{doctor.major}</td>
                    <td>
                        <form name='doctorListForm'>
                            <input type='checkbox' name="option" value={index}
                                checked={selectedOption === String(index)}
                                onChange={handleOptionChange}/>
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