import Offcanvas from "react-bootstrap/Offcanvas";
import React from "react";
import "./SolveProblem.css";
import { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import ApiCall from "../../util/ApiCall";
import { toast } from "react-toastify";
import "./ProblemSidenav.css"

function OffCanvasExample({ changeQuestionViaIndex, assignmentSolution, ...props }) {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const handleSubmitAssignment = () => {
        const postAssignment = async () => {
            try {
                const filterarray = assignmentSolution.map(({ _id, Code }) => ({ _id, Code }));
                const response = await ApiCall("./submitAssignment/", "POST", {
                    AssigmentID: props.id,
                    Questions: filterarray,
                });
                console.log(response.data);
                if (response.data.success) {
                    toast.success("Assignment Submitted Successfully");
                    window.location.href = "/submittedPage";
                } else {
                    toast.error("Assignment Submission Failed");
                }
            } catch (e) {
                console.log(e);
            }
        };
        postAssignment();
    };
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
                    <Button style={{ float: "right", marginRight: "4%",
                                    font: "Fira Code",
                                    paddingLeft: "20px", 
                                    paddingRight: "20px",
                                    color: "var(--sec)",
                                    backgroundColor: "var(--light)",
                                    borderColor: "var(--light)",
                                    transition: "box-shadow 0.3s ease-in-out",                        
                                }}
                                    onMouseOver={(e) => {
                                        e.target.style.color = "var(--bg1)";
                                    }}
                                    onMouseOut={(e) => {
                                        e.target.style.boxShadow = "var(--light)";
                                    }}
                                     onClick={handleSubmitAssignment}>
                        Submit Assignment
                    </Button>
                </div>
            </div>
            <Offcanvas show={show} onHide={handleClose} {...props}>
                <Offcanvas.Header style={{backgroundColor:"var(--lighter)"}}closeButton>
                    <Offcanvas.Title style={{color:"var(--bg1)"}}>Questions</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body className="solveNav" style={{backgroundColor:"var(--bg1)", color:"var(--lighter)"}}>
                    {props.questions.map((question, index) => (
                        <div
                            key={index}
                            onClick={(event) => {
                                changeQuestionViaIndex(index);
                                handleClose();
                            }} className="solveNavSections"
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
