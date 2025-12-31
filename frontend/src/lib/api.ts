import axios from 'axios';

const api = axios.create({
    baseURL: 'https://13-233-204-241.nip.io',
});

api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export default api;
