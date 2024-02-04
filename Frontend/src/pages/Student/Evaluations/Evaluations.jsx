import React, { useEffect } from "react";
import { useState } from "react";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import Upcoming from "./Upcoming.jsx";
import Ongoing from "./Ongoing";
import Finished from "./Finished";
import ApiCall from "../../../util/ApiCall";
import { ListGroup } from "react-bootstrap";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import "../Student.css";

const Evaluations = () => {
    const [upcomingEvaluations, setUpcomingEvaluations] = useState([]);
    const [ongoingEvaluations, setOngoingEvaluations] = useState([]);
    const [finishedEvaluations, setFinishedEvaluations] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getEvaluations = async () => {
            try {
                const response = await ApiCall("/students/myEvaluations", "GET", null);
                console.log(response.data);
                const temp = response.data.data;
                console.log("temp", temp);
                const currentTime = new Date();
                const upcoming = [];
                const ongoing = [];
                const finished = [];
                temp.forEach((assignment) => {
                    const StartTime = new Date(assignment.StartTime);
                    const EndTime = new Date(assignment.EndTime);
                    if (assignment.Submitted) {
                        finished.push(assignment);
                    } else if (StartTime < currentTime && EndTime > currentTime) {
                        ongoing.push(assignment);
                    } else {
                        finished.push(assignment);
                    }
                });
                setUpcomingEvaluations(upcoming);
                setOngoingEvaluations(ongoing);
                setFinishedEvaluations(finished);
            } catch (error) {
                console.error("Error fetching Evaluations: ", error);
            } finally {
                setLoading(false);
            }
        };
        getEvaluations();
    }, []);

    return (
        <>
            <div>
                <h1
                    style={{
                        color: "var(--lighter)",
                        textAlign: "center",
                        padding: "20px",
                        backgroundColor: "var(--sec)",
                        fontFamily: "Open Sans",
                    }}
                >
                    EVALUATIONS
                </h1>

                <div
                    style={{
                        backgroundColor: "var(--bg1)",
                        marginTop: "-9px",
                        paddingBottom: "54px",
                        minHeight: "80vh",
                    }}
                >
                    <Tabs
                        defaultActiveKey="upcoming"
                        id="justify-tab-example"
                        style={{ backgroundColor: "rgba(36,36,36,1)" }}
                        className="mb-4"
                        justify
                    >
                        <Tab
                            eventKey="upcoming"
                            title={<span style={{ fontSize: "18px", fontWeight: "500" }}>Upcoming</span>}
                        >
                            {loading ? (
                                Array.from({ length: 5 }).map((_, index) => (
                                    <SkeletonTheme key={index} color="#e0e0e0" highlightColor="#f5f5f5">
                                        <div
                                            style={{
                                                display: "flex",
                                                flexDirection: "column",
                                                justifyContent: "center",
                                                alignItems: "center",
                                            }}
                                        >
                                            <ListGroup style={{ color: "black", width: "50%" }}>
                                                <ListGroup.Item style={{ height: "70px" }}>
                                                    <Skeleton width={150} />
                                                    <Skeleton width={200} />
                                                </ListGroup.Item>
                                            </ListGroup>
                                        </div>
                                        <br />
                                    </SkeletonTheme>
                                ))
                            ) : upcomingEvaluations.length != 0 ? (
                                <Upcoming Evaluations={upcomingEvaluations} />
                            ) : (
                                <div
                                    style={{
                                        paddingBottom: "10px",
                                        fontSize: "20px",
                                        textAlign: "center",
                                        color: "var(--lighter)",
                                    }}
                                >
                                    No Upcoming Evaluations
                                </div>
                            )}
                        </Tab>
                        <Tab
                            eventKey="ongoing"
                            title={<span style={{ fontSize: "18px", fontWeight: "500" }}>Ongoing</span>}
                        >
                            {loading ? (
                                Array.from({ length: 5 }).map((_, index) => (
                                    <SkeletonTheme key={index} color="#e0e0e0" highlightColor="#f5f5f5">
                                        <div
                                            style={{
                                                display: "flex",
                                                flexDirection: "column",
                                                justifyContent: "center",
                                                alignItems: "center",
                                            }}
                                        >
                                            <ListGroup style={{ color: "black", width: "50%" }}>
                                                <ListGroup.Item style={{ height: "70px" }}>
                                                    <Skeleton width={150} />
                                                    <Skeleton width={200} />

                                                    <Skeleton
                                                        width={90}
                                                        height={40}
                                                        style={{ float: "right", top: "-40px" }}
                                                    />
                                                </ListGroup.Item>
                                            </ListGroup>
                                        </div>
                                        <br />
                                    </SkeletonTheme>
                                ))
                            ) : ongoingEvaluations.length != 0 ? (
                                <Ongoing Evaluations={ongoingEvaluations} />
                            ) : (
                                <div
                                    style={{
                                        paddingBottom: "10px",
                                        fontSize: "20px",
                                        textAlign: "center",
                                        color: "var(--lighter)",
                                    }}
                                >
                                    No Ongoing Evaluations
                                </div>
                            )}
                        </Tab>
                        <Tab
                            eventKey="finished"
                            title={<span style={{ fontSize: "18px", fontWeight: "500" }}> Finished</span>}
                        >
                            {loading ? (
                                Array.from({ length: 5 }).map((_, index) => (
                                    <SkeletonTheme key={index} color="#e0e0e0" highlightColor="#f5f5f5">
                                        <div
                                            style={{
                                                display: "flex",
                                                flexDirection: "column",
                                                justifyContent: "center",
                                                alignItems: "center",
                                            }}
                                        >
                                            <ListGroup style={{ color: "black", width: "50%" }}>
                                                <ListGroup.Item style={{ height: "70px" }}>
                                                    <Skeleton width={150} />
                                                    <Skeleton width={200} />
                                                </ListGroup.Item>
                                            </ListGroup>
                                        </div>
                                        <br />
                                    </SkeletonTheme>
                                ))
                            ) : finishedEvaluations.length != 0 ? (
                                <Finished Evaluations={finishedEvaluations} />
                            ) : (
                                <div
                                    style={{
                                        paddingBottom: "10px",
                                        fontSize: "20px",
                                        textAlign: "center",
                                        color: "var(--lighter)",
                                    }}
                                >
                                    No Finished Evaluations
                                </div>
                            )}
                        </Tab>
                    </Tabs>
                </div>
            </div>
        </>
    );
};

export default Evaluations;
