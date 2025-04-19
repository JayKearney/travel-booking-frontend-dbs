import axios from 'axios';

// Use your CloudFront URL as the base URL 
const baseURL = process.env.REACT_APP_API_URL;

const axio = axios.create({
    baseURL: baseURL,
    timeout: 10000,
});

// Add an interceptor to include the token in headers (if needed for authentication)
axio.interceptors.request.use(
    (config) => {
        // Ensure the Content-Type header is always set
        if (!config.headers['Content-Type']) {
            config.headers['Content-Type'] = 'application/json';
        }

        // If you have an authentication token, add it to the headers
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Add this for debugging
console.log("Axios initialized with baseURL:", baseURL);

export default axio;