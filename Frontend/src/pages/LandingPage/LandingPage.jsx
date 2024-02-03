import React from "react";
import NavBar from "../../components/Navbar/Navbar";
import Cookies from "js-cookie";
import LandingPageCard from "../../components/Card/LandingPageCard";
import "./LandingPage.css";

const LandingPage = () => {
    const studentToken = Cookies.get("studentsToken");
    const professorToken = Cookies.get("professorsToken");

    return (
        <>
            <NavBar />
            <div className="home-section" style={{ display: "flex", marginTop: "50px", paddingBottom: "100px" }}>
                <div className="heading">
                    <h1
                        style={{
                            fontFamily: "Open Sans",
                            color: "rgba(227, 243, 246)",
                            fontSize: "60px",
                            marginTop: "30px",
                            textAlign: "center",
                        }}
                    >
                        {" "}
                        Simplify. Automate.<i> Excel.</i>
                        <br />
                        {/* <br /> */}
                    </h1>
                </div>
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
                <div className="info" style={{ backgroundColor: "rgba(134, 184, 193, 0.2)", borderRadius: "10px" }}>
                    <p
                        style={{
                            fontFamily: "Open Sans",
                            color: "var(--)",
                            fontSize: "20px",
                            marginTop: "60px",
                            textAlign: "center",
                        }}
                    >
                        {" "}
                        CodeSphere transforms coding assessments with an automated, user-friendly platform. Simplify
                        grading for professors, streamline assignments for students, and enhance overall efficiency in
                        coding education. Elevate the learning experience with CodeSphere's comprehensive solution.
                    </p>
                </div>
            </div>
        </>
    );
};

export default LandingPage;
