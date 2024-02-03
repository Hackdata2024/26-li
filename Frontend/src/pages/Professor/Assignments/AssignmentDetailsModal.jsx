import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Badge from "react-bootstrap/Badge";
import { ListGroup } from "react-bootstrap";
import ApiCall from "../../../util/ApiCall";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const AssignmentDetailsModal = (props) => {
    const [assignment, setAssignment] = useState({
        AssignmentName: "",
        Batches: [],
        DueTimestamp: "",
        Questions: [],
        SubmittedBy: [],
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Simulate loading delay
                await new Promise((resolve) => setTimeout(resolve, 1000));

                const date = new Date(props.assignment.DueTimestamp);
                const formattedDateTime = `${("0" + date.getHours()).slice(-2)}:${("0" + date.getMinutes()).slice(
                    -2
                )} ${("0" + date.getDate()).slice(-2)}-${("0" + (date.getMonth() + 1)).slice(
                    -2
                )}-${date.getFullYear()}`;

                setAssignment((prevAssignment) => ({
                    ...prevAssignment,
                    AssignmentName: props.assignment.AssignmentName,
                    Batches: props.assignment.Batches,
                    DueTimestamp: formattedDateTime,
                    Questions: props.assignment.Questions,
                    SubmittedBy: props.assignment.SubmittedBy,
                }));
            } catch (error) {
                console.error("Error during fetching assignment details:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [props.assignment]);

    return (
        <Modal {...props} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    {loading ? <Skeleton width={200} height={30} /> : assignment.AssignmentName}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {loading ? (
                    // Display loading skeleton
                    <SkeletonTheme color="#e0e0e0" highlightColor="#f5f5f5">
                        <Skeleton height={100} />
                        <Skeleton height={30} width={300} />
                        <Skeleton height={30} width={200} />
                    </SkeletonTheme>
                ) : (
                    <>
                        <h4>Details</h4>
                        <p>
                            No. of Questions : {assignment.Questions.length}
                            <br /> Batches :{" "}
                            {assignment.Batches.map((batch, index) => (
                                <Badge bg="secondary" className="mx-1" key={index}>
                                    {batch}
                                </Badge>
                            ))}
                            <br />
                            Due Date : {assignment.DueTimestamp}
                        </p>
                        <h4>Submitted By: </h4>
                        <ListGroup className="proflistgroup" as="ol" numbered>
                            {assignment.SubmittedBy.map((item, index) => (
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
                            ))}
                        </ListGroup>
                    </>
                )}
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={props.onHide}>Close</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default AssignmentDetailsModal;
