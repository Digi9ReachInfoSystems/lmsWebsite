import axios from 'axios';

// Create an Axios instance with the base URL and common configurations
const api = axios.create({
  baseURL: 'http://localhost:5000', // Replace with your backend base URL
  timeout: 10000, // Optional: Timeout after 10 seconds
  headers: {
    'Content-Type': 'application/json',
  },
});

// Optional: Add a request interceptor to attach authorization token
api.interceptors.request.use(
  (config) => {
    // const token = localStorage.getItem('authToken'); // Example: Retrieve token from local storage
    const token ='eyJhbGciOiJSUzI1NiIsImtpZCI6IjcxOGY0ZGY5MmFkMTc1ZjZhMDMwN2FiNjVkOGY2N2YwNTRmYTFlNWYiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vbG1zZWR1Y2F0aW9ucGxhZm9ybSIsImF1ZCI6Imxtc2VkdWNhdGlvbnBsYWZvcm0iLCJhdXRoX3RpbWUiOjE3MjkwNjM3MDMsInVzZXJfaWQiOiJvVzRiNEFZNjM3WDlUQm9WRjVxVlYzTGdDVkkzIiwic3ViIjoib1c0YjRBWTYzN1g5VEJvVkY1cVZWM0xnQ1ZJMyIsImlhdCI6MTcyOTU4OTM3NiwiZXhwIjoxNzI5NTkyOTc2LCJlbWFpbCI6InN0dWRlbnQxMDAzQGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjpmYWxzZSwiZmlyZWJhc2UiOnsiaWRlbnRpdGllcyI6eyJlbWFpbCI6WyJzdHVkZW50MTAwM0BnbWFpbC5jb20iXX0sInNpZ25faW5fcHJvdmlkZXIiOiJwYXNzd29yZCJ9fQ.hCUPYEI3oPcx2WRgAyNSnml6wlZyzc6qk8B1assyjaB5xUoZrDtRrreRxLBLOLAAj3kvD4NGjDEM5KQySY3pycJ_y-f5rQpZLoNpd8rsJPU5NS4klPM8Y-OSUVEF-7GJiQ4DW8UKopisGiTAqqkVX1pS3ngjvnh-oc_PSpWflmn-BOlTyP_zIbQaaWO6K-p58IQ6qlL2gDsr5ibBNHzlw9GMHZAhiHPbjOE8Jk-1kfMNuIyx8g1x6CLCv7fYXkDVoWw5pZzv-N4zV1YoqI24i4rNbheH3CVRsIOq7E_1ddzCb4ulwRgChKOWMYM27dH1MI48xyDfKaBkeGJdn0iHwQ';
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Optional: Add a response interceptor to handle errors globally
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);

export default api;
