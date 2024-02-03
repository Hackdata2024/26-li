import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Badge from "react-bootstrap/Badge";
import { ListGroup } from "react-bootstrap";
import ApiCall from "../../../util/ApiCall";

const AssignmentDetailsModal = (props) => {
    console.log(props);
    const [assignment, setAssignment] = useState({
        AssignmentName: "",
        Batches: [],
        DueTimestamp: "",
        Questions: [],
        SubmittedBy: [],
    });
    const [submittedBy, setSubmittedBy] = useState([
        {
            name: "Harsh",
            enrollment: "21103004",
            batch: "B1",
        },
        {
            name: "Rajat",
            enrollment: "21103005",
            batch: "B1",
        },
    ]);

    useEffect(() => {
        const date = new Date(props.assignment.DueTimestamp);
        const formattedDateTime = `${("0" + date.getHours()).slice(-2)}:${("0" + date.getMinutes()).slice(-2)} ${(
            "0" + date.getDate()
        ).slice(-2)}-${("0" + (date.getMonth() + 1)).slice(-2)}-${date.getFullYear()}`;
        console.log(props.assignment);
        setAssignment((prevAssignment) => ({
            ...prevAssignment,
            AssignmentName: props.assignment.AssignmentName,
            Batches: props.assignment.Batches,
            DueTimestamp: formattedDateTime,
            Questions: props.assignment.Questions,
            SubmittedBy: props.assignment.SubmittedBy,
        }));
    }, []);

    return (
        <Modal {...props} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">{assignment.AssignmentName}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <h4>Details</h4>
                <p>
                    No. of Questions : {assignment.Questions.length}
                    <br /> Batches :{" "}
                    {assignment.Batches.map((batch, index) => {
                        return (
                            <Badge bg="secondary" className="mx-1" key={index}>
                                {batch}
                            </Badge>
                        );
                    })}
                    <br />
                    Due Date : {assignment.DueTimestamp}
                </p>
                <h4>Submitted By: </h4>
                <ListGroup className="proflistgroup" as="ol" numbered>
                    {assignment.SubmittedBy.map((item, index) => {
                        return (
                            <ListGroup.Item
                                as="li"
                                className="d-flex justify-content-between align-items-start"
                                key={index}
                            >
                                <div className="ms-2 me-auto">
                                    <div className="fw-bold">{item.Name}</div>
                                    Enrollment No. : {item.Username}
                                    <br />
                                    Batch : {item.Batch}
                                </div>
                            </ListGroup.Item>
                        );
                    })}
                </ListGroup>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={props.onHide}>Close</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default AssignmentDetailsModal;
