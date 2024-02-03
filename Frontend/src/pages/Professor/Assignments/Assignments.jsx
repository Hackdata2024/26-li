import React, { useEffect, useState } from "react";
import "./profAssignments.css";
import Button from "react-bootstrap/Button";
import Badge from "react-bootstrap/Badge";
import ListGroup from "react-bootstrap/ListGroup";
import ApiCall from "../../../util/ApiCall";
import AssignmentDetailsModal from "./AssignmentDetailsModal";
import CreateAssignmentModal from "./CreateAssignmentModal";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const Assignments = () => {
    const [modalShow, setModalShow] = React.useState(false);
    const [assignment, setAssignment] = useState([]);
    const [batches, setBatches] = useState([]);
    const [showAssignmentDetails, setShowAssignmentDetails] = useState(false);
    const [clickAssignment, setClickAssignment] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await ApiCall("/professors/myAssignments", "GET", {});
                const res = await ApiCall("/getBatches", "GET", { message: "Hello" });
                console.log("Response from /professors/myAssignments", response.data);
                console.log("response data in assignment is: ", res.data);
                setBatches(res.data.batches);
                setAssignment(response.data.data);
            } catch (error) {
                console.log("Error fetching data:", error);
                // Handle error as needed
            } finally {
                setLoading(false);
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
                backgroundColor: "var(--sec)",
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
            {modalShow && (
                <CreateAssignmentModal batches={batches} show={modalShow} onHide={() => setModalShow(false)} />
            )}
            {showAssignmentDetails && (
                <AssignmentDetailsModal
                    show={showAssignmentDetails}
                    assignment={clickAssignment}
                    onHide={() => setShowAssignmentDetails(false)}
                />
            )}
            <div
                style={{
                    color: "white",
                    display: "flex",
                    justifyContent: "center",
                    fontSize: "3rem",
                    fontWeight: "600",
                    fontFamily: "Open Sans",
                }}
            >
                ASSIGNMENTS
            </div>
            <div
                style={{
                    display: "flex",
                    justifyContent: "center",
                    margin: "20px",
                }}
            >
                <Button
                    variant="primary"
                    onClick={() => setModalShow(true)}
                    style={{
                        font: "Fira Code",
                        paddingLeft: "20px",
                        paddingRight: "20px",
                        color: "var(--sec)",
                        backgroundColor: "var(--light)",
                        borderColor: "var(--light)",
                        transition: "box-shadow 0.8s ease-in-out",
                    }}
                    onMouseOver={(e) => {
                        e.target.style.backgroundColor = "var(--lighter)";
                    }}
                    onMouseOut={(e) => {
                        e.target.style.backgroundColor = "var(--light)";
                    }}
                >
                    Create Assignment{" "}
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
                    {loading
                        ? // Display loading skeleton

                          Array.from({ length: 5 }).map((_, index) => (
                              <div key={index}>
                                  <SkeletonTheme color="#e0e0e0" highlightColor="#f5f5f5">
                                      <Skeleton height={100} />
                                      {/* <Skeleton height={30} width={300} />
                                    <Skeleton height={30} width={200} /> */}
                                  </SkeletonTheme>
                                  <br />
                              </div>
                          ))
                        : // Display actual content when not loading
                          assignment.map((item, index) => {
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
};

export default Assignments;
