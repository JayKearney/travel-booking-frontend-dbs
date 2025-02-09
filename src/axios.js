import axios from 'axios';

// Create an instance of axios with a default base URL
const axio = axios.create({
    baseURL: 'http://localhost:5033/api', // Replace with your API's base URL
    timeout: 10000, // Set a timeout for requests
});

// Add an interceptor to include the token in headers (if needed for authentication)
axio.interceptors.request.use(
    (config) => {
        // If you have an authentication token, add it to the headers
        const token = localStorage.getItem('token'); // Example: storing JWT in localStorage
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default axio;
