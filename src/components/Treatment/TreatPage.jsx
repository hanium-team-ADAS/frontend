import React, { useEffect, useRef, useState } from 'react';
import Peer from 'simple-peer';
import TakeTemp from './TakeTemp';
import '../../styles/treatPage.css';
import styled from 'styled-components';
import oppDelayImg from '../../images/oppDelayImg.png';
import myDelayImg from '../../images/myDelayImg.png';

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
    const [socketOpen, setSocketOpen] = useState(true);

    const userId = getUserId("id");

    function getUserId(name) {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop().split(';').shift();
    }

    // 메시지를 청크로 나누어 전송하는 함수
    const sendInChunks = (message, chunkSize) => {
        let offset = 0;
        let chunkNumber = 0;

        const sendNextChunk = () => {
            if (offset < message.length) {
                const chunk = message.slice(offset, offset + chunkSize);
                socket.current.send(JSON.stringify(chunk)); // 메시지를 JSON 형식으로 변환하여 전송
                //console.log(`청크 ${chunkNumber} 전송 중:`, chunk);

                offset += chunkSize;
                chunkNumber++;

                // 다음 청크를 10ms 후에 보내도록 지연을 추가
                setTimeout(sendNextChunk, 10);
            } else {
                console.log(`총 ${chunkNumber}개의 청크 전송이 완료되었습니다.`);
                console.log('WebSocket 연결 상태:', socketOpen);
            }
        };

        sendNextChunk();
    };

    useEffect(() => {
        if (!socket.current) {
            console.log('WebSocket 연결을 시도합니다...');
            socket.current = new WebSocket('');

            socket.current.onopen = () => {
                console.log('WebSocket 서버에 성공적으로 연결되었습니다.');

                setSocketOpen(true);
                console.log('WebSocket 연결 상태:', socketOpen);
            };

            socket.current.onmessage = (message) => {
                const data = JSON.parse(message.data);
                console.log('서버로부터 받은 메시지:', data);
                console.log('WebSocket 연결 상태:', socketOpen);
                setSocketOpen(true);

                switch (data.type) {
                    case 'offer':
                        console.log('서버로부터 CASE:offer 메시지 수신');
                        console.log('WebSocket 연결 상태:', socketOpen);
                        handleOffer(data);
                        break;
                    case 'answer':
                        console.log('서버로부터 CASE:answer 메시지 수신');
                        console.log('WebSocket 연결 상태:', socketOpen);
                        handleAnswer(data);
                        break;
                    case 'candidate':
                        console.log('서버로부터 CASE:candidate 메시지 수신');
                        console.log('WebSocket 연결 상태:', socketOpen);
                        handleCandidate(data);
                        break;
                    case 'all_users':
                        console.log('서버로부터 CASE:all_users 메시지 수신');
                        console.log('WebSocket 연결 상태:', socketOpen);
                        handleAllUsers(data);
                        break;
                    case 'leave':
                        console.log('서버로부터 CASE:leave 메시지 수신');
                        console.log('WebSocket 연결 상태:', socketOpen);
                        handleLeave(data);
                        break;
                    default:
                        console.log('알 수 없는 메시지 타입:', data.type);
                        console.log('WebSocket 연결 상태:', socketOpen);
                }
            };

            socket.current.onclose = (event) => {
                console.log('WebSocket 연결이 해제되었습니다.', event);
                console.log('Close Code:', event.code); // 종료 코드 출력
                console.log('Was Clean:', event.wasClean); // 연결 종료가 정상적으로 이루어졌는지 여부 출력
                setSocketOpen(false);
            };

            socket.current.onerror = (error) => {
                console.error('WebSocket에서 오류가 발생했습니다:', error);
            };
        }

        return () => {
            if (socket.current) {
                console.log('컴포넌트가 언마운트 되어 WebSocket 연결을 종료합니다.');
                socket.current.close();
            }
        };
        
    }, []);


    const handleOffer = (data) => {
        console.log('HandleOffer 함수 시작:', data);
        peer.current = new Peer({
            initiator: false,
            trickle: false,
        });

        peer.current.on('signal', (signalData) => {
            console.log('Offer에 대한 신호(signal) 생성:', signalData);
            if (socketOpen) {
                const message = {
                    type: 'answer',
                    sender: userId,
                    receiver: data.sender,
                    roomId: 1234,
                    answer: signalData,
                };
                sendInChunks(JSON.stringify(message), 1024); // 청크로 메시지 전송
            } else {
                console.log('웹소켓이 아직 열리지 않았습니다.');
            }
        });

        peer.current.on('stream', (stream) => {
            console.log('상대방의 스트림을 받았습니다:', stream);
            partnerVideo.current.srcObject = stream;
        });

        peer.current.signal(data.offer);
    };

    const handleAnswer = (data) => {
        console.log('HandleAnswer 함수 시작:', data);
        if (peer.current) {
            console.log('Answer 신호를 수신하여 처리 중...');
            peer.current.signal(data.answer);
        }
    };

    const handleCandidate = (data) => {
        console.log('HandleCandidate 함수 시작:', data);
        if (peer.current) {
            console.log('Candidate 신호를 수신하여 처리 중:', data.candidate);
            peer.current.signal(data.candidate);
        }
    };

    const handleAllUsers = (data) => {
        console.log('HandleAllUsers 함수 시작:', data);
        console.log('모든 사용자 목록:', data.allUsers || []);
        
        if (data.allUsers.length > 0) {
            setPeerId(data.allUsers[1]); // 첫 번째 사용자 ID로 peerId 설정
        }
    };

    const handleLeave = (data) => {
        console.log('HandleLeave 함수 시작:', data);
        if (partnerVideo.current.srcObject) {
            console.log('상대방의 비디오 트랙을 중지합니다.');
            partnerVideo.current.srcObject.getTracks().forEach(track => track.stop());
            partnerVideo.current.srcObject = null;
        }
        if (peer.current) {
            console.log('현재 Peer를 파기합니다.');
            peer.current.destroy();
            peer.current = null;
        }
        setIsCallActive(false);
        console.log('통화가 종료되었습니다.');
    };

    const startCall = (remotePeerId) => {
        console.log('StartCall 함수 시작. 상대방 Peer ID:', remotePeerId);
        console.log('WebSocket 연결 상태:', socketOpen);

        if (socketOpen) {
            const joinRoomMessage = {
                type: 'join_room',
                sender: userId,
                roomId: 1234,
                receiver: remotePeerId
            };

            try {
                sendInChunks(JSON.stringify(joinRoomMessage), 1024); // 청크로 방 참여 메시지 전송
                console.log('방 참여 메시지를 전송했습니다:', joinRoomMessage);
            } catch (error) {
                console.error("방 참여 메시지 전송 중 오류 발생:", error);
            }

            navigator.mediaDevices.getUserMedia({ video: true, audio: true })
                .then(stream => {
                    console.log('사용자 미디어 스트림을 성공적으로 가져왔습니다:', stream);
                    console.log('WebSocket 연결 상태:', socketOpen);
                    userVideo.current.srcObject = stream;

                    peer.current = new Peer({
                        initiator: true,
                        trickle: false,
                        stream: stream,
                    });

                    peer.current.on('signal', (signalData) => {

                        const message = {
                            type: 'offer',
                            sender: userId,
                            receiver: remotePeerId,
                            roomId: 1234,
                            offer: signalData,
                        };

                        try {
                            console.log('Offer 신호 생성 및 전송 준비 중:', signalData);
                            console.log('WebSocket 연결 상태:', socketOpen);
                            sendInChunks(JSON.stringify(message), 1024); // 청크로 메시지 전송
                        } catch (error) {
                            console.error("JSON 변환 오류:", error);
                        }
                    });

                    peer.current.on('stream', (partnerStream) => {
                        console.log('상대방의 스트림을 수신했습니다:', partnerStream);
                        console.log('WebSocket 연결 상태:', socketOpen);
                        partnerVideo.current.srcObject = partnerStream;
                    });

                    setIsCallActive(true);
                    console.log('통화가 시작되었습니다.');
                    console.log('WebSocket 연결 상태:', socketOpen);
                })
                .catch(err => console.error('미디어 장치 접근 오류:', err));
        } else {
            console.log('웹소켓이 아직 열리지 않았습니다.');
        }
    };

    const endCall = () => {
        console.log('EndCall 함수 시작');
        if (userVideo.current.srcObject) {
            console.log('사용자 비디오 트랙을 중지합니다.');
            userVideo.current.srcObject.getTracks().forEach(track => track.stop());
            userVideo.current.srcObject = null;
        }
        if (partnerVideo.current.srcObject) {
            console.log('상대방 비디오 트랙을 중지합니다.');
            partnerVideo.current.srcObject = null;
        }
        if (peer.current) {
            console.log('현재 Peer를 파기합니다.');
            peer.current.destroy();
            peer.current = null;
        }

        setIsCallActive(false);
        console.log('통화가 종료되었습니다.');
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
