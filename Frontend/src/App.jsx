import { useState } from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Footer from "./components/Footer/Footer";
import LandingPage from "./pages/LandingPage/LandingPage";
import Login from "./pages/Login/Login";
import Professor from "./pages/Professor/Professor";
import RegisterCollege from "./pages/RegisterCollege/RegisterCollege";
import Student from "./pages/Student/Student";
import SolveProblem from "./pages/SolveProblem/SolveProblem";
import "react-toastify/dist/ReactToastify.css";

function App() {
    return (
        <>
            <ToastContainer />
            <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/login/:id" element={<Login />} />
                <Route path="/professor/:id" element={<Professor />} />
                <Route path="/student/:id" element={<Student />} />
                <Route path="/registerCollege" element={<RegisterCollege />} />
                <Route path="/solveProblem/assignment/:id" element={<SolveProblem />} />
                <Route path="/solveProblem/evaluation/:id" element={<SolveProblem />} />
                <Route path="*" element={<h1>Not Found</h1>} />
            </Routes>
            <Footer />
        </>
    );
}

export default App;
