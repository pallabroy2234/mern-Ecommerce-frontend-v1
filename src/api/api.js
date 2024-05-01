import axios from "axios";

// Development URL
const developmentUrl = "http://localhost:3000";

// Production URL
const productionUrl = "http://localhost:4000"; // Replace this with your actual production URL

// Determine the mode (development or production)
const mode = "production"; // Change this to "production" when deploying

// Select the appropriate API URL based on the mode
const apiBaseUrl = mode === "development" ? developmentUrl : productionUrl;

// Create an Axios instance with the selected base URL
const api = axios.create({
    baseURL: `${apiBaseUrl}/api/`,
    withCredentials: true
});

export default api;