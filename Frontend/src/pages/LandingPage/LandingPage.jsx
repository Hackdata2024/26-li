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
                <div className="divlanding">
                    {/* <div className="headingLand"> */}
                    <div
                        className="headingLand"
                        style={{
                            fontFamily: "Open Sans",

                            color: "rgba(227, 243, 246)",
                            fontSize: "80px",
                            margin: "80px 80px 80px 80px",
                        }}
                    >
                        <i>
                            S i m p l i f y.
                            {/* <br /> */}
                            <br />A u t o m a t e.
                            {/* <i> */}
                            {/* <br /> */}
                            <br /> E x c e l.
                            {/* </i> */}
                            <br />
                        </i>
                    </div>
                    <div
                        className="headingLand2"
                        style={{
                            fontFamily: "Open Sans",
                            fontSize: "2rem",
                            width: "100%",
                            color: "rgba(227, 243, 246)",
                        }}
                    >
                        S i m p l i f y.
                        <br />A u t o m a t e. <br />E x c e l.
                    </div>
                    {/* </div> */}
                    <div
                        className="imageLand"
                        style={{
                            // flex: 1,
                            backgroundImage: "url('/assets/images/LOGO2.png')",
                            backgroundSize: "contain",
                            backgroundPosition: "center center",
                            // maxWidth: "1200px",
                            // margin: "0 auto",
                            marginTop: "30px",
                            backgroundRepeat: "no-repeat",
                        }}
                    ></div>
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
                {/* <div className="heading d-flex" style={{ justifyContent: "space-between" }}>
                    <div>
                        <h1
                            style={{
                                fontFamily: "Open Sans",
                                color: "rgba(227, 243, 246)",
                                fontSize: "60px",
                                margin: "80px 0 80px 80px",
                            }}
                        >
                            {" "}
                            S i m p l i f y. <br />
                            <br />A u t o m a t e.
                            <i>
                                <br />
                                <br /> Excel.
                            </i>
                            <br />
                        </h1>
                    </div>
                </div> */}

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
                <div
                    className="info"
                    style={{
                        backgroundColor: "rgba(134, 184, 193, 0.2)",
                        marginTop: "60px",
                        alignItems: "center",
                        width: "100vw",
                        alignSelf: "center",
                    }}
                >
                    <h2
                        style={{
                            fontFamily: "Open Sans",
                            color: "var(--light)",
                            fontSize: "40px",
                            width: "100vw",
                            textAlign: "center",
                            paddingTop: "40px",
                            paddingBottom: "40px",
                            padding: "20px",
                        }}
                    >
                        CodeSphere
                    </h2>
                    <p
                        style={{
                            fontFamily: "Fira Code",
                            color: "var(--lighter)",
                            fontSize: "23px",
                            width: "100vw",
                            textAlign: "center",
                            paddingTop: "40px",
                            paddingBottom: "40px",
                            padding: "20px",

                            "@media (maxWidth: 400px)": {
                                fontSize: "12px",
                                padding: "20px !important",
                                borderRadius: "10px !important",
                                width: "80vw !important",
                            },
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
