import React from "react";
import ListGroup from "react-bootstrap/ListGroup";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import QuestionModel from "./QuestionModel";
import { useState } from "react";

const MyQuestions = (props) => {
    const [selectedQuestion, setSelectedQuestion] = useState(null);

    const handleQuestionClick = (question) => {
        setSelectedQuestion(question);
    };

    const handleClose = () => {
        setSelectedQuestion(null);
    };
    return (
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
            <ListGroup style={{ color: "black", width: "50%" }}>
                {props.myQuestions.map((question, index) => {
                    return (
                        <div key={index}>
                            <ListGroup.Item
                                style={{
                                    backgroundColor: "rgba(36,36,36,1)",
                                    color: "white",
                                    border: "none",
                                    borderRadius: "10px",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "space-between",
                                }}
                            >
                                <div>
                                    <div style={{ fontSize: "20px", fontWeight: "500" }}>{question.QuestionName}</div>
                                    {/* Due Date: <span>{formattedDate}</span> <br />
                                    Due Time: <span>{formattedTime}</span> */}
                                </div>

                                {/* <Link to="/">
                                    <Button style={{ width: "80px" }}>Solve</Button>
                                </Link> */}
                            </ListGroup.Item>
                            <br />
                            {selectedQuestion && (
                                <QuestionModel question={selectedQuestion} handleClose={handleClose} />
                            )}
                        </div>
                    );
                })}
            </ListGroup>
        </div>
    );
};

export default MyQuestions;
