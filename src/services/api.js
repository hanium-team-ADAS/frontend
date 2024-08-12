import axios from "axios";

// 기본적인 axios 인스턴스 설정
const api = axios.create({
    baseURL: 'http://ec2-52-78-187-152.ap-northeast-2.compute.amazonaws.com:8080',
    timeout: 1000
});

export default api;