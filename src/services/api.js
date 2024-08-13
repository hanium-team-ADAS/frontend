import axios from "axios";

const API_BASE_URL = 'http://ec2-52-78-187-152.ap-northeast-2.compute.amazonaws.com:8080';

const api = axios.create({
    baseURL: API_BASE_URL,
    timeout: 1000
});

const fetch = async (endpoint) => {
    try {
        const response = await api.get(endpoint);
        return response;
    } catch (error) {
        console.error(error);
    }
};

export default { fetch };