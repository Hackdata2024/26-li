import React, { useEffect } from "react";
import { useState } from "react";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import Todo from "./Todo";
import Missing from "./Missing";
import Submitted from "./Submitted";
import ApiCall from "../../../util/ApiCall";

const Assignments = () => {
    const [todoAssignments, setTodoAssignments] = useState([]);
    const [missingAssignments, setMissingAssignments] = useState([]);
    const [submittedAssignments, setSubmittedAssignments] = useState([]);

    useEffect(() => {
        const getAssignments = async () => {
            try {
                const response = await ApiCall("/students/myAssignments", "GET", null);
                const temp = response.data.data;
                console.log("temp", temp);
                const currentTime = new Date();
                const todo = [];
                const missing = [];
                const submitted = [];
                temp.forEach((assignment) => {
                    const dueDateTime = new Date(assignment.DueTimestamp);
                    if (assignment.Submitted) {
                        submitted.push(assignment);
                    } else if (dueDateTime < currentTime) {
                        missing.push(assignment);
                    } else {
                        todo.push(assignment);
                    }
                });
                setTodoAssignments(todo);
                setMissingAssignments(missing);
                setSubmittedAssignments(submitted);
            } catch (error) {
                console.error("Error fetching assignments: ", error);
            }
        };
        getAssignments();
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
                    Assignments
                </h1>

                <div style={{ backgroundColor: "white", marginTop: "-9px" }}>
                    <Tabs
                        defaultActiveKey="todo"
                        id="justify-tab-example"
                        style={{ backgroundColor: "rgba(36,36,36,1)" }}
                        className="mb-4"
                        justify
                    >
                        <Tab
                            eventKey="todo"
                            title={<span style={{ fontSize: "18px", fontWeight: "500" }}> Pending</span>}
                        >
                            {todoAssignments.length != 0 ? (
                                <Todo Assignments={todoAssignments} />
                            ) : (
                                <div style={{ paddingBottom: "10px", fontSize: "20px", textAlign: "center" }}>
                                    No Pending assignments
                                </div>
                            )}
                        </Tab>
                        <Tab
                            eventKey="missing"
                            title={<span style={{ fontSize: "18px", fontWeight: "500" }}> Missed</span>}
                        >
                            {missingAssignments.length != 0 ? (
                                <Missing Assignments={missingAssignments} />
                            ) : (
                                <div style={{ paddingBottom: "10px", fontSize: "20px", textAlign: "center" }}>
                                    No missed assignments
                                </div>
                            )}
                        </Tab>
                        <Tab
                            eventKey="submitted"
                            title={<span style={{ fontSize: "18px", fontWeight: "500" }}> Submitted</span>}
                        >
                            {submittedAssignments.length != 0 ? (
                                <Submitted Assignments={submittedAssignments} />
                            ) : (
                                <div style={{ paddingBottom: "10px", fontSize: "20px", textAlign: "center" }}>
                                    No submitted assignments
                                </div>
                            )}
                        </Tab>
                    </Tabs>
                </div>
            </div>
        </>
    );
};

export default Assignments;
