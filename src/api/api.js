import axios from "axios";

// Development URL
const developmentUrl = "http://localhost:3000";

// Production URL

const productionUrl = "https://mern-ecommerce-backend-v1-w1ps.onrender.com"; // Replace this with your actual production URL

// Determine the mode (development or production)
const mode = "production"; // Change this to "production" when deploying

// Select the appropriate API URL based on the mode
const apiBaseUrl = mode === "production" ? productionUrl : developmentUrl;

// Create an Axios instance with the selected base URL
const api = axios.create({
	baseURL: `${apiBaseUrl}/api/`,
	withCredentials: true
});

export default api;