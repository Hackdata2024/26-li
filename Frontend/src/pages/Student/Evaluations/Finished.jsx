import React from "react";
import ListGroup from "react-bootstrap/ListGroup";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

const Finished = (props) => {
    return (
        <>
            <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
                <ListGroup className="student-card-responsiveness" style={{ color: "black" }}>
                    {props.Evaluations.map((evaluation, index) => {
                        const date = new Date(evaluation.EndTime);
                        const year = date.getFullYear();
                        const month = ("0" + (date.getMonth() + 1)).slice(-2); // Months are zero-based
                        const day = ("0" + date.getDate()).slice(-2);

                        const hours = ("0" + date.getHours()).slice(-2);
                        const minutes = ("0" + date.getMinutes()).slice(-2);
                        const seconds = ("0" + date.getSeconds()).slice(-2);
                        // console.log(item);
                        const formattedTime = `${day}-${month}-${year} ${hours}:${minutes}:${seconds} `;
                        // const formattedDate = ` ${day}-${month}-${year}`;
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
                                        <div style={{ fontSize: "20px", fontWeight: "500" }}>{evaluation.Name}</div>
                                        {/* Due Date: <span>{formattedDate}</span> <br /> */}
                                        End Time: <span>{formattedTime}</span>
                                    </div>

                                    {/* <Link to={`/problemSolve/evaluations/${evaluation._id}`}>
                                        <Button style={{ width: "80px" }}>Solve</Button>
                                    </Link> */}
                                </ListGroup.Item>
                                <br />
                            </div>
                        );
                    })}
                </ListGroup>
            </div>
        </>
    );
};

export default Finished;
