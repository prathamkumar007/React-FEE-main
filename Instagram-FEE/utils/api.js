import axios from 'axios';

const API = axios.create({
    baseURL: "http://localhost:5000"
});

// Remove token header if it exists
delete axios.defaults.headers.common['Authorization'];

export default API;