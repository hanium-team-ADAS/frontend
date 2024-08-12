import React from 'react';
import SwaggerUI from 'swagger-ui-react';
import 'swagger-ui-react/swagger-ui.css';

const SwaggerDoc = () => {
    return (
        <div>
            <SwaggerUI url="http://ec2-52-78-187-152.ap-northeast-2.compute.amazonaws.com:8080/v3/api-docs" />
        </div>
    );
};

export default SwaggerDoc;