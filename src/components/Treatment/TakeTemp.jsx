import React, { useState } from 'react';
import api from '../../services/api'
import '../../styles/takeTemp.css'

const TakeTemp = ({className}) => {
  const [isReady, setIsReady] = useState(false);
  const [temperature, setTemperature] = useState(null);
  const [error, setError] = useState(null);
  
  const takeTemperature = async () => {
    try {
        await api.post('/picture/snap');

        const receivedValue = await api.get('/picture/snap');
        //const receivedValue = response.data.bodyTemperature;

        if (receivedValue >= 30 && receivedValue <= 45) {
          setError(null);
          setTemperature(receivedValue);
        } else {
          alert('유효한 범위(30.0℃~45.0℃)를 벗어났습니다. 재촬영해주세요.');
          setError('');
          setTemperature(null);
        }
    } catch (error) {
        alert('failed');
    }
  };

  const prepareMeasurement = () => {
    alert('정확한 측정을 위해 마스크와 외투를 벗어주세요')
    setIsReady(true);
    setTemperature(null);
    setError(null);
  };

  return (
    <div className={`takeTemp-component ${className}`}>
      <h3>체온 측정</h3>
      {!isReady && (
        <button onClick={prepareMeasurement}>체온 측정 준비</button>
      )}
      {isReady && (
        <>
          <div className='showTemp'>
            {temperature !== null ? (
              <div>촬영된 체온: {temperature}°C</div>
            ) : (
              <div>촬영 대기 중...</div>
            )}
          </div>
          <button onClick={takeTemperature}>촬영하기</button>
          {error && {error}}
        </>
      )}
    </div>
  );
};

export default TakeTemp;
