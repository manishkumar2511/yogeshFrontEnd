import axios from "axios";
import { getJWTToken } from "./utils/utils";
const baseURL = import.meta.env.VITE_SERVER_URL;

const axiosInstance = axios.create({
    baseURL,
    headers: {
        "Content-Type": "application/json",
    },
});

axiosInstance.interceptors.request.use(
    (config) => {

        const token = getJWTToken();
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        } else {
            console.log("No token found in cookies.");
        }

        return config;
    },
    (error) => {
        console.error("Request Error:", error);
        return Promise.reject(error);
    },
);

axiosInstance.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        console.error("Response Error:", error);
        return Promise.reject(error);
    },
);

export default axiosInstance;