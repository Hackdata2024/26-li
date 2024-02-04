import Offcanvas from "react-bootstrap/Offcanvas";
import React from "react";
import "./SolveProblem.css";
import { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import ApiCall from "../../util/ApiCall";
import { toast } from "react-toastify";
import "./ProblemSidenav.css";

function OffCanvasExample({ changeQuestionViaIndex, assignmentSolution, ...props }) {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [type, setType] = useState("");
    const handleSubmitAssignment = () => {
        const postAssignment = async () => {
            try {
                const filterarray = assignmentSolution.map(({ _id, Code }) => ({ _id, Code }));
                const transformedArray = filterarray.map(({ _id, Code }) => ({ QuestionId: _id, SubmittedCode: Code }));

                const url = type === "Assignment" ? "/submitAssignment/" : "/submitEvaluation/";
                const response = await ApiCall(url, "POST", {
                    [props.type === "Assignment" ? "AssigmentID" : "EvaluationID"]: props.id,
                    Questions: transformedArray,
                });
                console.log(response.data);
                if (response.data.success) {
                    toast.success("Assignment Submitted Successfully");
                    if (type === "Assignment") {
                        window.location.href = `/student/assignments`;
                    } else {
                        window.location.href = `/student/assignments`;
                    }
                } else {
                    toast.error("Assignment Submission Failed");
                }
            } catch (e) {
                console.log(e);
            }
        };
        postAssignment();
    };

    useEffect(() => {
        var currentURL = window.location.href;
        currentURL = currentURL.split("/");
        currentURL = currentURL[currentURL.length - 2];
        if (currentURL === "assignment") {
            setType("Assignment");
        } else if (currentURL === "evaluation") {
            setType("Evaluation");
        }
    });
    return (
        <>
            <div style={{ height: "50px", display: "flex", alignItems: "center" }}>
                <div style={{ width: "50%" }}>
                    <Button
                        variant="primary"
                        onClick={handleShow}
                        style={{
                            fontSize: "20px",
                            fontWeight: "bold",
                            backgroundColor: "var(--light)",
                            border: "none",
                            marginLeft: "2%",
                            color: "var(--bg1)",
                        }}
                    >
                        &#9776;
                    </Button>
                </div>
                <div style={{ width: "50%" }}>
                    <Button className="submitAss" style={{ float: "right", marginRight: "4%",
                                    font: "Fira Code",
                                    paddingLeft: "20px", 
                                    paddingRight: "20px",
                                    color: "var(--sec)",
                                    fontSize: "20px",
                                    backgroundColor: "var(--high)",
                                    borderColor: "var(--light)",
                                    transition: "box-shadow 0.3s ease-in-out",                        
                                }}
                                    onMouseOver={(e) => {
                                        e.target.style.color = "var(--bg1)";
                                    }}
                                    onMouseOut={(e) => {
                                        e.target.style.boxShadow = "var(--sec)";
                                    }}
                                     onClick={handleSubmitAssignment}>
                        SUBMIT ASSIGNMENT
                    </Button>
                </div>
            </div>
            <Offcanvas show={show} onHide={handleClose} {...props}>
                <Offcanvas.Header style={{ backgroundColor: "var(--lighter)" }} closeButton>
                    <Offcanvas.Title style={{ color: "var(--bg1)" }}>Questions</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body className="solveNav" style={{ backgroundColor: "var(--bg1)", color: "var(--lighter)" }}>
                    {props.questions.map((question, index) => (
                        <div
                            key={index}
                            onClick={(event) => {
                                changeQuestionViaIndex(index);
                                handleClose();
                            }}
                            className="solveNavSections"
                        >
                            <p>
                                <span>{`Q${index + 1}. `}</span>
                                {question.QuestionName}
                            </p>
                        </div>
                    ))}
                    <hr />
                </Offcanvas.Body>
            </Offcanvas>
        </>
    );
}

export default OffCanvasExample;
