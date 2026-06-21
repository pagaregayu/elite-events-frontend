import axios from "axios";

const API = axios.create({
  baseURL: "https://elite-events-backend-vl3w.onrender.com/api",
});

export default API;