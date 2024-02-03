import React, { useEffect, useState } from "react";
import "./profAssignments.css";
import Button from "react-bootstrap/Button";
import Badge from "react-bootstrap/Badge";
import ListGroup from "react-bootstrap/ListGroup";
import ApiCall from "../../../util/ApiCall";

function Assignments() {
    const [modalShow, setModalShow] = React.useState(false);
    const [assignment, setAssignment] = useState([]);
    const [batches, setBatches] = useState([]);
    const [showAssignmentDetails, setShowAssignmentDetails] = useState(false);
    const [clickAssignment, setClickAssignment] = useState({});

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await ApiCall("/professors/myAssignments", "GET", {});
                const res = await ApiCall("/getBatches", "GET", { message: "Hello" });
                console.log("Response from /professors/myAssignments", response.data);
                console.log(res.data);
                setBatches(res.data.batches);
                setAssignment(response.data.data);
            } catch (error) {
                console.log("Error fetching data:", error);
                // Handle error as needed
            }
        };

        fetchData();
    }, []);

    const handleOnClick = (item) => {
        setClickAssignment(item);
        setShowAssignmentDetails(true);
    };

    return (
        <div
            style={{
                backgroundColor: "rgba(36, 36, 36, 1)",
            }}
        >
            <div
                style={{
                    display: "flex",
                    justifyContent: "end",
                    marginRight: "20px",
                    paddingTop: "20px",
                }}
            >
                <div></div>
            </div>
            {modalShow && <></>}
            {showAssignmentDetails && <></>}
            <div
                style={{
                    color: "white",
                    display: "flex",
                    justifyContent: "center",
                    fontSize: "4rem",
                    fontWeight: "600",
                }}
            >
                Assignments
            </div>
            <div
                style={{
                    display: "flex",
                    justifyContent: "center",
                    margin: "20px",
                }}
            >
                <Button variant="primary" onClick={() => setModalShow(true)}>
                    Create Assignment
                </Button>
            </div>
            <div
                style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    marginTop: "30px",
                    paddingBottom: "70px",
                }}
            >
                <ListGroup className="proflistgroup" as="ol" numbered>
                    {assignment.map((item, index) => {
                        const date = new Date(item.DueTimestamp);
                        const year = date.getFullYear();
                        const month = ("0" + (date.getMonth() + 1)).slice(-2); // Months are zero-based
                        const day = ("0" + date.getDate()).slice(-2);

                        const hours = ("0" + date.getHours()).slice(-2);
                        const minutes = ("0" + date.getMinutes()).slice(-2);
                        const seconds = ("0" + date.getSeconds()).slice(-2);

                        const formattedDateTime = `${hours}:${minutes}:${seconds} ${day}-${month}-${year}`;
                        return (
                            <div key={index}>
                                <ListGroup.Item
                                    as="li"
                                    className="d-flex justify-content-between align-items-start "
                                    style={{ cursor: "pointer", borderRadius: "10px" }}
                                    onClick={() => handleOnClick(item)}
                                >
                                    <div className="ms-2 me-auto">
                                        <div className="fw-bold">{item.AssignmentName}</div>
                                        No. of Questions : {item.Questions.length}
                                        <br /> Batches :{" "}
                                        {item.Batches.map((batch, index) => {
                                            return (
                                                <Badge bg="secondary" className="mx-1" key={index}>
                                                    {batch}
                                                </Badge>
                                            );
                                        })}
                                        <br />
                                        Due Date : {formattedDateTime}
                                    </div>
                                </ListGroup.Item>
                                <br />
                            </div>
                        );
                    })}
                </ListGroup>
            </div>
        </div>
    );
}

export default Assignments;
