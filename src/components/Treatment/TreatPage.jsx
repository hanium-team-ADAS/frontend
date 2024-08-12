import React, { useEffect, useRef, useState } from 'react';
import io from 'socket.io-client';
import Peer from 'simple-peer';
import TakeTemp from './TakeTemp';
import '../../styles/treatPage.css';
import styled from 'styled-components';
import oppDelayImg from '../../images/oppDelayImg.png'
import myDelayImg from '../../images/myDelayImg.png'

const StyledTakeTemp = styled(TakeTemp)`
    height: 30vh;
    width: 50vh;
`;

const TreatPage = () => {
    const userVideo = useRef(); // 사용자 비디오 요소를 참조하는 변수
    const partnerVideo = useRef();  // 상대방 비디오 요소를 참조하는 변수
    const socket = useRef(); // 소켓 연결을 참조하는 변수
    const [peerId, setPeerId] = useState(null); // 현재 피어 ID 상태
    const [isCallActive, setIsCallActive] = useState(false); // 통화 상태 관리
    
    useEffect(() => {
		 // 소켓 연결 설정
         socket.current = io.connect('http://ec2-52-78-187-152.ap-northeast-2.compute.amazonaws.com:8080');

         // 서버로부터 'peerId' 이벤트 수신
         socket.current.on('peerId', id => {
             setPeerId(id);
         });
 
         // 서버와의 연결 종료 시 소켓 해제
         return () => socket.current.disconnect();
	}, []);

    const startCall = (remotePeerId) => {
        // 사용자의 비디오 및 오디오 스트림 가져오기
        navigator.mediaDevices.getUserMedia({ video: true, audio: true })
            .then(stream => {
                userVideo.current.srcObject = stream;   // 사용자 비디오 요소에 스트림을 할당
                
                // Peer 객체를 생성하여 통화 시작
                const peer = new Peer({
                    initiator: true,
                    trickle: false,
                    stream: stream,
                });

                // 생성된 신호 데이터를 서버로 전송
                peer.on('signal', data => {
                    socket.current.emit('signal', { to: remotePeerId, data });
                });

                // 상대방의 스트림을 받아 partnerVideo.current.srcObject에 할당
                peer.on('stream', partnerStream => {
                    partnerVideo.current.srcObject = partnerStream;
                });

                // 소켓을 통해 신호 데이터가 수신되면 peer.signal(data)를 호출하여 피어의 신호를 처리
                socket.current.on('signal', ({ from, data }) => {
                    if (from === remotePeerId) {
                        peer.signal(data);
                    }
                });

                // 통화 상태 활성화
                setIsCallActive(true);
            })
            .catch(err => console.error(err));
    };

    const endCall = () => {
        // 현재 스트림 정리
        if (userVideo.current.srcObject) {
            userVideo.current.srcObject.getTracks().forEach(track => track.stop()); // 모든 미디어 트랙 중지
            userVideo.current.srcObject = null; // 스트림 제거
        }
        if (partnerVideo.current.srcObject) {
            partnerVideo.current.srcObject = null; // 스트림 제거
        }

        // 통화 상태 비활성화
        setIsCallActive(false);
    };

    return (
        <div className="treatPage">
            <div className='warnning-text'>화면이 너무 작습니다.<br/>전체화면으로 변경하세요.</div>
            <div className='leftSide'>
                <video className='oppVideo' playsInline ref={partnerVideo} autoPlay 
                    poster={oppDelayImg} />
                <div className="buttons">
                    <button onClick={() => startCall('remotePeerId')} disabled={isCallActive}>통화 시작</button>
                    <button onClick={endCall} disabled={!isCallActive}>통화 종료</button>
                </div>
            </div>
            <div className='rightSide'>
                <StyledTakeTemp />
                <video className='myVideo' playsInline muted ref={userVideo} autoPlay
                    poster={myDelayImg} />
            </div>
        </div>
    );
};

export default TreatPage;
