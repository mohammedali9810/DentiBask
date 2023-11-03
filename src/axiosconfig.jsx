import axios from "axios";

const axiosinstance = axios.create({
    baseURL: process.env.REACT_APP_BASE_URL
});

export default axiosinstance;