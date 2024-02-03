import React from "react";
import ListGroup from "react-bootstrap/ListGroup";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import QuestionModel from "./QuestionModel";
import { useState } from "react";

const AllQuestions = (props) => {
    const [modalShow, setModalShow] = React.useState(false);
    const [question, setQuestion] = useState({});

    function setModalQuestion(value, question) {
        setModalShow(value);
        setQuestion(question);
    }
    return (
        <div>
            <QuestionModel show={modalShow} question={question} onHide={() => setModalShow(false)} />
            <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
                <ListGroup className="QuestionsBulletins">
                    {props.allQuestions.map((question, index) => {
                        return (
                            <div key={index} onClick={() => setModalQuestion(true, question)}>
                                <ListGroup.Item
                                    style={{
                                        backgroundColor: "var(--lighter)",
                                        color: "var(--bg1)",
                                        border: "none",
                                        borderRadius: "10px",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "space-between",
                                        cursor: "pointer",
                                    }}
                                >
                                    <div>
                                        <div style={{ fontSize: "20px", fontWeight: "500" }}>
                                            {question.QuestionName}
                                        </div>
                                    </div>

                                    {/* <Link to="/">
                                    <Button style={{ width: "80px" }}>Solve</Button>
                                </Link> */}
                                </ListGroup.Item>
                                <br />
                            </div>
                        );
                    })}
                </ListGroup>
            </div>
        </div>
    );
};

export default AllQuestions;
