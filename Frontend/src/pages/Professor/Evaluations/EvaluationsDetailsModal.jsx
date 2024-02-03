import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Badge from "react-bootstrap/Badge";
import { ListGroup } from "react-bootstrap";
import ApiCall from "../../../util/ApiCall";

const EvaluationsDetailsModal = (props) => {
    console.log(props);
    const [evaluation, setEvaluation] = useState({
        EvaluationName: "",
        Batches: [],
        DueTimestamp: "",
        Questions: [],
        SubmittedBy: [],
    });

    useEffect(() => {
        const date = new Date(props.evaluation.StartTime);
        const year = date.getFullYear();
        const month = ("0" + (date.getMonth() + 1)).slice(-2); // Months are zero-based
        const day = ("0" + date.getDate()).slice(-2);

        const hours = ("0" + date.getHours()).slice(-2);
        const minutes = ("0" + date.getMinutes()).slice(-2);
        const seconds = ("0" + date.getSeconds()).slice(-2);
        // console.log(item);
        const formattedStartDateTime = `${hours}:${minutes}:${seconds} ${day}-${month}-${year}`;

        const date2 = new Date(props.evaluation.EndTime);
        const year2 = date2.getFullYear();
        const month2 = ("0" + (date2.getMonth() + 1)).slice(-2); // Months are zero-based
        const day2 = ("0" + date2.getDate()).slice(-2);

        const hr = ("0" + date2.getHours()).slice(-2);
        const min = ("0" + date2.getMinutes()).slice(-2);
        const sec = ("0" + date2.getSeconds()).slice(-2);
        // console.log(item);
        const formattedEndDateTime = `${hr}:${min}:${sec} ${day2}-${month2}-${year2}`;
        console.log(props.evaluation);
        setEvaluation((prevEvaluation) => ({
            ...prevEvaluation,
            EvaluationName: props.evaluation.Name,
            Batches: props.evaluation.Batches,
            startTime: formattedStartDateTime,
            EndTime: formattedEndDateTime,
            Questions: props.evaluation.Questions,
            SubmittedBy: props.evaluation.SubmittedBy,
        }));
    }, []);

    return (
        <Modal {...props} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">{evaluation.EvaluationName}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <h4>Details</h4>
                <p>
                    No. of Questions : {evaluation.Questions.length}
                    <br /> Batches :{" "}
                    {evaluation.Batches.map((batch, index) => {
                        return (
                            <Badge bg="secondary" className="mx-1" key={index}>
                                {batch}
                            </Badge>
                        );
                    })}
                    <br />
                    Start Date and Time : {evaluation.startTime}
                    <br />
                    End Date and Time : {evaluation.EndTime}
                </p>
                <h4>Submitted By: </h4>
                <ListGroup className="proflistgroup" as="ol" numbered>
                    {evaluation.SubmittedBy.map((item, index) => {
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
                                    <br />
                                    Year: {item.Year}
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

export default EvaluationsDetailsModal;
