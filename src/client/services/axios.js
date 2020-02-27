import axios from "axios";

axios.defaults.withCredentials = true;
const instance = axios.create({
  baseURL: "http://127.0.0.1:8080",
  headers: {
    "Access-Control-Allow-Origin": "http://127.0.0.1:3000",
    "Content-Type": "application/json",
    Accept: "application/json"
  },
  withCredentials: true
});

export default instance;
