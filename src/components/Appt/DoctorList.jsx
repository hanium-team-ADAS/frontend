import React, { useEffect, useState } from 'react';
import '../../styles/doctorList.css';

const DoctorList = () => {
    const [doctorData, setDoctorData] = useState([]);

    useEffect(() => {
        fetch('/data/doctor.json')
            .then(response => response.json())
            .then(data => setDoctorData(data))
            .catch(error => console.error('Error fetching data:', error));
    }, []);

    return (
        <div className="doctorList">
        <table className="doctorTable">
            <thead>
            <tr>
                <th>의사 이름</th>
                <th>전공</th>
            </tr>
            </thead>
            <tbody>
            {doctorData.map((doctor, index) => (
                <tr key={index}>
                <td>{doctor.name}</td>
                <td>{doctor.major}</td>
                </tr>
            ))}
            </tbody>
        </table>
        </div>
    );
};

export default DoctorList;