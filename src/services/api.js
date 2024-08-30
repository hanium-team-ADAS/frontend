import axios from "axios";

const api = axios.create({
    baseURL: '',
    //baseURL: 'http://localhost:8080',
    timeout: 1000,
    withCredentials : true
});

export default api;