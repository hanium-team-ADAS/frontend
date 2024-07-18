import React from 'react';
import Video from './Video';
import TakeTemp from './TakeTemp';
import '../../styles/treatPage.css';
import styled from 'styled-components';

const OppVideo = styled(Video)`
    height: 70vh;
    width: 90vh;
`;

const MyVideo = styled(Video)`
    height: 40vh;
    width: 50vh;
`;

const StyledTakeTemp = styled(TakeTemp)`
    height: 30vh;
    width: 50vh;
`;

const TreatPage = () => {
    return (
        <div className="treatPage">
            <div className='leftSide'>
                <OppVideo />
                <div className="buttons">
                    <button>통화 시작</button>
                    <button>통화 종료</button>
                </div>
            </div>
            <div className='rightSide'>
                <StyledTakeTemp />
                <MyVideo />
            </div>
        </div>
    );
};

export default TreatPage;
