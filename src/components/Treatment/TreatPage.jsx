import React, { useEffect, useRef, useState } from 'react';
import Peer from 'simple-peer';
import TakeTemp from './TakeTemp';
import '../../styles/treatPage.css';
import styled from 'styled-components';
import oppDelayImg from '../../images/oppDelayImg.png';
import myDelayImg from '../../images/myDelayImg.png';

// 순환 참조 탐지
import { stringify } from 'flatted';

const StyledTakeTemp = styled(TakeTemp)`
    height: 30vh;
    width: 50vh;
`;

const TreatPage = () => {
    const userVideo = useRef(null);
    const partnerVideo = useRef(null);
    const socket = useRef(null);
    const peer = useRef(null);
    const [peerId, setPeerId] = useState(null);
    const [isCallActive, setIsCallActive] = useState(false);
    const [socketOpen, setSocketOpen] = useState(false);

    const userId = getUserId("id");

    function getUserId(name) {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop().split(';').shift();
    }

    useEffect(() => {
        socket.current = new WebSocket('ws://localhost:8080/signal');

        socket.current.onopen = () => {
            console.log('WebSocket 서버에 연결되었습니다.');
            setSocketOpen(true);
        };

        socket.current.onmessage = (message) => {
            const data = JSON.parse(message.data);
            console.log('받은 메시지:', data);

            switch (data.type) {
                case 'offer':
                    handleOffer(data);
                    break;
                case 'answer':
                    handleAnswer(data);
                    break;
                case 'candidate':
                    handleCandidate(data);
                    break;
                case 'all_users':
                    handleAllUsers(data);
                    break;
                case 'leave':
                    handleLeave(data);
                    break;
                default:
                    console.log('알 수 없는 메시지 타입:', data.type);
            }
        };

        return () => {
                socket.current?.close();
        };
    }, []);

    const handleOffer = (data) => {
        peer.current = new Peer({
            initiator: false,
            trickle: false,
        });

        peer.current.on('signal', (signalData) => {
            console.log('Send signal:', signalData); // Debug log for signal data
            if (socketOpen) {
                socket.current.send(JSON.stringify({
                    type: 'answer',
                    sender: userId,
                    receiver: data.sender,
                    roomId: 1234,
                    answer: {
                        type: signalData.type,
                        sdp: signalData.sdp,
                    }
                }));
            } else {
                console.log('웹소켓이 아직 열리지 않았습니다.');
            }
        });

        peer.current.on('stream', (stream) => {
            console.log('Received stream:', stream); // Debug log for stream
            partnerVideo.current.srcObject = stream;
        });

        peer.current.signal(data.offer);
    };

    const handleAnswer = (data) => {
        peer.current.signal(data.answer);
    };

    const handleCandidate = (data) => {
        if (peer.current) {
            console.log('Received candidate:', data.candidate); // Debug log for candidate
            peer.current.signal(data.candidate);
        }
    };

    const handleAllUsers = (data) => {
        // Handle the 'all_users' type message if needed
    };

    const handleLeave = (data) => {
        if (partnerVideo.current.srcObject) {
            partnerVideo.current.srcObject.getTracks().forEach(track => track.stop());
            partnerVideo.current.srcObject = null;
        }
        if (peer.current) {
            peer.current.destroy();
            peer.current = null;
        }
        setIsCallActive(false);
    };

    const startCall = (remotePeerId) => {
        if (socketOpen) {
            navigator.mediaDevices.getUserMedia({ video: true, audio: true })
                .then(stream => {
                    userVideo.current.srcObject = stream;

                    peer.current = new Peer({
                        initiator: true,
                        trickle: false,
                        stream: stream,
                    });

                    peer.current.on('signal', (signalData) => {
                        console.log('Generated signal:', signalData); // Debug log for signal data

                        const message = {
                            type: 'offer',
                            sender: userId,
                            receiver: remotePeerId,
                            roomId: 1234,
                            offer: {
                                type: signalData.type,
                                sdp: signalData.sdp,
                            }
                        };

                        try {
                            const jsonString = stringify(message);
                            socket.current.send(jsonString);
                        } catch (error) {
                            console.error("JSON 변환 오류:", error);
                        }
                    });

                    peer.current.on('stream', (partnerStream) => {
                        console.log('Received partner stream:', partnerStream); // Debug log for partner stream
                        partnerVideo.current.srcObject = partnerStream;
                    });

                    setIsCallActive(true);
                })
                .catch(err => console.error('미디어 장치 접근 오류:', err));
        } else {
            console.log('웹소켓이 아직 열리지 않았습니다.');
        }
    };

    const endCall = () => {
        if (userVideo.current.srcObject) {
            userVideo.current.srcObject.getTracks().forEach(track => track.stop());
            userVideo.current.srcObject = null;
        }
        if (partnerVideo.current.srcObject) {
            partnerVideo.current.srcObject = null;
        }
        if (peer.current) {
            peer.current.destroy();
            peer.current = null;
        }

        setIsCallActive(false);
    };

    return (
        <div className="treatPage">
            <div className='warnning-text'>화면이 너무 작습니다.<br/>전체화면으로 변경하세요.</div>
            <div className='leftSide'>
                <video className='oppVideo' playsInline ref={partnerVideo} autoPlay
                       poster={oppDelayImg} />
                <div className="buttons">
                    <button onClick={() => startCall(peerId)} disabled={isCallActive}>통화 시작</button>
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
