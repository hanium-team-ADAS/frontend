import React, { useState } from 'react';

const TakeTemp = () => {
  const [isReady, setIsReady] = useState(false);
  const [temperature, setTemperature] = useState(null);
  const [error, setError] = useState(null);

  const prepareMeasurement = () => {
    alert('정확한 측정을 위해 마스크와 외투를 벗어주세요')
    setIsReady(true);
    setTemperature(null);
    setError(null);
  };

  const takeTemperature = () => {
    const simulatedTemp = (Math.random() * (50 - 20) + 20).toFixed(1);
    const temp = parseFloat(simulatedTemp);

    if (temp < 30 || temp > 45) {
      alert('유효한 범위(30.0℃~45.0℃)를 벗어났습니다. 재촬영해주세요.');
      setError('');
      setTemperature(null);
    } else {
      setError(null);
      setTemperature(temp);
    }
  };

  return (
    <div style={{ textAlign: 'center', padding: '20px' }}>
      <h3>체온 측정</h3>
      {!isReady && (
        <button onClick={prepareMeasurement}>체온 측정 준비</button>
      )}
      {isReady && (
        <>
          <div style={{ margin: '20px 0', fontSize: '18px' }}>
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
