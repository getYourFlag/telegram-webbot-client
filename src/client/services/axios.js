import axios from "axios";

axios.defaults.withCredentials = true;
const instance = axios.create({
    baseURL: "http://localhost:8080",
    headers: {
        "Access-Control-Allow-Origin": "http://localhost:3000",
        "Content-Type": "application/json",
        Accept: "application/json",
    },
    withCredentials: true,
});

export default instance;
