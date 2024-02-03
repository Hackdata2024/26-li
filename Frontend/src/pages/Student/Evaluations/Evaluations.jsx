import React, { useEffect } from "react";
import { useState } from "react";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import Upcoming from "./Upcoming.jsx";
import Ongoing from "./Ongoing";
import Finished from "./Finished";
import ApiCall from "../../../util/ApiCall";

const Evaluations = () => {
    const [upcomingEvaluations, setUpcomingEvaluations] = useState([]);
    const [ongoingEvaluations, setOngoingEvaluations] = useState([]);
    const [finishedEvaluations, setFinishedEvaluations] = useState([]);

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
            }
        };
        getEvaluations();
    }, []);

    return (
        <>
            <div>
                <h1
                    style={{
                        color: "white",
                        textAlign: "center",
                        padding: "20px",
                        backgroundColor: "rgba(36,36,36,1)",
                    }}
                >
                    Evaluations
                </h1>

                <div style={{ backgroundColor: "white", marginTop: "-9px" }}>
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
                            {upcomingEvaluations.length != 0 ? (
                                <Upcoming Evaluations={upcomingEvaluations} />
                            ) : (
                                <div style={{ paddingBottom: "10px", fontSize: "20px", textAlign: "center" }}>
                                    No Upcoming Evaluations
                                </div>
                            )}
                        </Tab>
                        <Tab
                            eventKey="ongoing"
                            title={<span style={{ fontSize: "18px", fontWeight: "500" }}>Ongoing</span>}
                        >
                            {ongoingEvaluations.length != 0 ? (
                                <Ongoing Evaluations={ongoingEvaluations} />
                            ) : (
                                <div style={{ paddingBottom: "10px", fontSize: "20px", textAlign: "center" }}>
                                    No Ongoing Evaluations
                                </div>
                            )}
                        </Tab>
                        <Tab
                            eventKey="finished"
                            title={<span style={{ fontSize: "18px", fontWeight: "500" }}> Finished</span>}
                        >
                            {finishedEvaluations.length != 0 ? (
                                <Finished Evaluations={finishedEvaluations} />
                            ) : (
                                <div style={{ paddingBottom: "10px", fontSize: "20px", textAlign: "center" }}>
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
