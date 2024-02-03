import React from "react";
import NavBar from "../../components/Navbar/Navbar";
import Cookies from "js-cookie";
import LandingPageCard from "../../components/Card/LandingPageCard";
import "./LandingPage.css";

const LandingPage = () => {
    const studentToken = Cookies.get("studentsToken");
    const professorToken = Cookies.get("professorsToken");

    return (
        <div className="home-section">
            <NavBar />
            <div className="home-section-1">
                <LandingPageCard
                    width="44%"
                    marginTop="28px"
                    title="CodeSphere for Students"
                    content="Coding made simple with CodeSphere."
                    btntext="Login"
                    
                    btnLink={typeof studentToken != "undefined" ? "/student/assignments" : "/login/students"}
                />
                <LandingPageCard
                    width="44%"
                    marginTop="28px"
                    title="CodeSphere for Professors"
                    content="Streamlining grading with CodeSphere."
                    backgroundColor="rgba(227, 243, 246)"
                    btntext="Login"
                    btnLink={typeof professorToken != "undefined" ? "/professor/assignments" : "/login/professors"}
                />
            </div>
            <div className="home-section-2">
                <LandingPageCard
                    width="44%"
                    marginTop="0px"
                    backgroundColor=""
                    title="REGISTER YOUR COLLEGE"
                    content="Making your students better coders."
                    btntext="Register"
                    btnLink="/registerCollege"
                />
            </div>
        </div>
    );
};

export default LandingPage;
