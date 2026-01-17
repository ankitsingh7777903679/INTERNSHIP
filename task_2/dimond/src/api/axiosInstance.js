import axios from 'axios';

const SERVER_URL = import.meta.env.VITE_SERVER_URL;

const axiosInstance = axios.create({
    baseURL: SERVER_URL,
});

// Request Interceptor (Attach Token automatically)
axiosInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// Response Interceptor (Catch 401 Logout)
axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
        // If Backend says 401 (Unauthorized)
        if (error.response && error.response.status === 401) {
            // 1. Clear Data
            localStorage.clear();
            // 2. Redirect to Login
            window.location.href = "/login";
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;