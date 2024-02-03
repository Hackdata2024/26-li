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
                        ></Tab>
                        <Tab
                            eventKey="missing"
                            title={<span style={{ fontSize: "18px", fontWeight: "500" }}> Missed</span>}
                        ></Tab>
                        <Tab
                            eventKey="submitted"
                            title={<span style={{ fontSize: "18px", fontWeight: "500" }}> Submitted</span>}
                        ></Tab>
                    </Tabs>
                </div>
            </div>
        </>
    );
};

export default Assignments;
