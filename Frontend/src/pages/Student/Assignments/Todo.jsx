import React from "react";
import ListGroup from "react-bootstrap/ListGroup";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

const Todo = (props) => {
    console.log("props", props);
    return (
        // <div>
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
            <ListGroup style={{ color: "black", width: "50%" }}>
                {props.Assignments.map((assignment, index) => {
                    const date = new Date(assignment.DueTimestamp);
                    const year = date.getFullYear();
                    const month = ("0" + (date.getMonth() + 1)).slice(-2); // Months are zero-based
                    const day = ("0" + date.getDate()).slice(-2);

                    const hours = ("0" + date.getHours()).slice(-2);
                    const minutes = ("0" + date.getMinutes()).slice(-2);
                    const seconds = ("0" + date.getSeconds()).slice(-2);
                    // console.log(item);
                    const formattedTime = `${hours}:${minutes}:${seconds}`;
                    const formattedDate = ` ${day}-${month}-${year}`;
                    return (
                        <div key={index}>
                            <ListGroup.Item
                                style={{
                                    backgroundColor: "var(--lighter)",
                                    color: "var(--bg1)",
                                    border: "none",
                                    borderRadius: "10px",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "space-between",
                                }}
                            >
                                <div>
                                    <div style={{ fontSize: "20px", fontWeight: "500" }}>
                                        {assignment.AssignmentName}
                                    </div>
                                    Due Date: <span>{formattedDate}</span> <br />
                                    Due Time: <span>{formattedTime}</span>
                                </div>

                                <Link to={`/solveProblem/assignment/${assignment._id}`}>
                                <Button variant="primary" style={{ 
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
                                    >
                                    Solve                    </Button>
                                </Link>
                            </ListGroup.Item>
                            <br />
                        </div>
                    );
                })}
            </ListGroup>
        </div>
        // </div>
    );
};

export default Todo;
