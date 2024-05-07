import {defineConfig} from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react()],
	server: {
		port: 5173 || 5174, // Set the desired port number
		host: "0.0.0.0", // Bind to all network interfaces
	},
});
