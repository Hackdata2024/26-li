import React from "react";
import NavBar from "../../components/Navbar/Navbar";
import Cookies from "js-cookie";
import LandingPageCard from "../../components/Card/LandingPageCard";
import "./LandingPage.css";

const LandingPage = () => {
    const studentToken = Cookies.get("studentsToken");
    const professorToken = Cookies.get("professorsToken");

    return (
        <div className="home-section" style={{ backgroundColor: "rgba(36, 36, 36, 1)" }}>
            <NavBar />
            <div className="home-section-1">
                <LandingPageCard
                    width="44%"
                    marginTop="28px"
                    title="CodeSphere for Students"
                    btntext="Login"
                    btnLink={typeof studentToken != "undefined" ? "/student/assignments" : "/login/students"}
                />
                <LandingPageCard
                    width="44%"
                    marginTop="28px"
                    title="CodeSphere for Professors"
                    btntext="Login"
                    btnLink={typeof professorToken != "undefined" ? "/professor/assignments" : "/login/professors"}
                />
            </div>
            <div className="home-section-2">
                <LandingPageCard
                    width="92%"
                    marginTop="0px"
                    title="Register Your College"
                    content="Enhance your college coding culture"
                    btntext="Register"
                    btnLink="/registerCollege"
                />
            </div>
        </div>
    );
};

export default LandingPage;
