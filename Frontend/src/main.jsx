import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter } from "react-router-dom";
import axios from "axios";

if (import.meta.env.DEV) {
    console.log("Running in development mode");
    axios.defaults.baseURL = import.meta.env.VITE_LOCALHOST;
} else {
    console.log("Running in production mode");
    axios.defaults.baseURL = import.meta.env.VITE_SERVER_URL;
}

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </React.StrictMode>
);
