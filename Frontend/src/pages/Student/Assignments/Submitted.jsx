import React from "react";
import ListGroup from "react-bootstrap/ListGroup";

const Submitted = (props) => {
    return (
        // <div>
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
            <ListGroup className="student-card-responsiveness" style={{ color: "black" }}>
                {props.Assignments.map((assignment, index) => {
                    const date = new Date(assignment.DueTimestamp);
                    const year = date.getFullYear();
                    const month = ("0" + (date.getMonth() + 1)).slice(-2); // Months are zero-based
                    const day = ("0" + date.getDate()).slice(-2);

                    const hours = ("0" + date.getHours()).slice(-2);
                    const minutes = ("0" + date.getMinutes()).slice(-2);
                    const seconds = ("0" + date.getSeconds()).slice(-2);
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
                                    Date: <span>{formattedDate}</span> <br />
                                    Due Time: <span>{formattedTime}</span>
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
        // </div>
    );
};

export default Submitted;
