import React, { useEffect, useState } from "react";
import "../Assignments/profAssignments.css";
import Button from "react-bootstrap/Button";
import Badge from "react-bootstrap/Badge";
import ListGroup from "react-bootstrap/ListGroup";
import ApiCall from "../../../util/ApiCall";
import CreateEvalModal from "./CreateEvaluation/CreateEvalModal";
import EvaluationsDetailsModal from "./EvaluationsDetailsModal";

function Evaluations() {
    const [modalShow, setModalShow] = React.useState(false);
    const [evaluation, setEvaluation] = useState([]);
    const [batches, setBatches] = useState([]);
    const [showEvaluationDetails, setShowEvaluationDetails] = useState(false);
    const [clickEvaluation, setClickEvaluation] = useState({});

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await ApiCall("/professors/myEvaluations", "GET", {});
                const res = await ApiCall("/getBatches", "GET", {});
                console.log("/professors/myEvaluations", response.data);
                console.log("getBatches/", res.data);
                setBatches(res.data.batches);
                setEvaluation(response.data.data);
                console.log(response.data.data);
            } catch (error) {
                console.log("Error fetching data:", error);
                // Handle error as needed
            }
        };

        fetchData();
    }, []);

    const handleOnClick = (item) => {
        setClickEvaluation(item);
        setShowEvaluationDetails(true);
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
            {modalShow && <CreateEvalModal batches={batches} show={modalShow} onHide={() => setModalShow(false)} />}
            {showEvaluationDetails && (
                <EvaluationsDetailsModal
                    show={showEvaluationDetails}
                    evaluation={clickEvaluation}
                    onHide={() => setShowEvaluationDetails(false)}
                />
            )}
            <div
                style={{
                    color: "white",
                    display: "flex",
                    justifyContent: "center",
                    fontSize: "3rem",
                    fontWeight: "600",
                }}
            >
                Evaluations
            </div>
            <div
                style={{
                    display: "flex",
                    justifyContent: "center",
                    margin: "20px",
                }}
            >
                <Button variant="primary" onClick={() => setModalShow(true)}>
                    Create Evaluation
                </Button>
            </div>
            <div
                style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    marginTop: "30px",
                }}
            >
                <ListGroup className="proflistgroup" as="ol" numbered>
                    {evaluation.map((item, index) => {
                        const date = new Date(item.StartTime);
                        const year = date.getFullYear();
                        const month = ("0" + (date.getMonth() + 1)).slice(-2); // Months are zero-based
                        const day = ("0" + date.getDate()).slice(-2);

                        const hours = ("0" + date.getHours()).slice(-2);
                        const minutes = ("0" + date.getMinutes()).slice(-2);
                        const seconds = ("0" + date.getSeconds()).slice(-2);
                        // console.log(item);
                        const formattedStartDateTime = `${hours}:${minutes}:${seconds} ${day}-${month}-${year}`;

                        const date2 = new Date(item.StartTime);
                        const year2 = date2.getFullYear();
                        const month2 = ("0" + (date2.getMonth() + 1)).slice(-2); // Months are zero-based
                        const day2 = ("0" + date2.getDate()).slice(-2);

                        const hr = ("0" + date2.getHours()).slice(-2);
                        const min = ("0" + date2.getMinutes()).slice(-2);
                        const sec = ("0" + date2.getSeconds()).slice(-2);
                        // console.log(item);
                        const formattedEndDateTime = `${hr}:${min}:${sec} ${day2}-${month2}-${year2}`;

                        return (
                            <ListGroup.Item
                                as="li"
                                className="d-flex justify-content-between align-items-start "
                                key={index}
                                style={{ cursor: "pointer" }}
                                onClick={() => handleOnClick(item)}
                            >
                                <div className="ms-2 me-auto">
                                    <div className="fw-bold">{item.Name || "hello"}</div>
                                    Year : {item.Year}
                                    <br />
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
                                    Start Date and Time : {formattedStartDateTime}
                                    <br />
                                    End Date and Time : {formattedEndDateTime}
                                </div>
                            </ListGroup.Item>
                        );
                    })}
                </ListGroup>
            </div>
        </div>
    );
}

export default Evaluations;
