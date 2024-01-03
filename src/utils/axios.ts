import axios from "axios";

const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    headers: {
        'x-token': localStorage.getItem('token')
    }
});

export default axiosInstance;