import React, { useEffect } from "react";
import { useState } from "react";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import MyQuestions from "./MyQuestions";
import AllQuestions from "./AllQuestions";
import ApiCall from "../../../util/ApiCall";
import ListGroup from "react-bootstrap/ListGroup";
import Form from "react-bootstrap/Form";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import "./Questions.css";

const Questions = () => {
    const [myQuestions, setMyQuestions] = useState([]);
    const [allQuestions, setAllQuestions] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getQuestions = async () => {
            try {
                console.log("question loading", loading);
                const response1 = await ApiCall("/professors/myQuestions", "GET", {});
                const response2 = await ApiCall("/professors/allQuestions", "GET", {});
                console.log("response 1", response1.data.data);
                console.log("response 2", response2.data.data);

                setMyQuestions(response1.data.data);
                setAllQuestions(response2.data.data);
            } catch (error) {
                console.error("Error while fetching Questions: ", error);
            } finally {
                setLoading(false);
                console.log("question loading", loading);
            }
        };
        getQuestions();
    }, []);

    return (
        <>
            <div style={{ background: "var(--sec)" }}>
                <h1
                    style={{
                        color: "white",
                        textAlign: "center",
                        padding: "20px",
                        backgroundColor: "var(--sec)",
                    }}
                >
                    Questions
                </h1>

                <div style={{ backgroundColor: "var(--bg1)", marginTop: "-9px" }}>
                    <Tabs
                        defaultActiveKey="todo"
                        id="justify-tab-example"
                        style={{ backgroundColor: "rgba(36,36,36,1)" }}
                        className="mb-4"
                        justify
                    >
                        <Tab
                            eventKey="todo"
                            title={<span style={{ fontSize: "18px", fontWeight: "500" }}> My Questions</span>}
                        >
                            {loading ? (
                                // Display skeletons while data is being fetched
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
                                                <ListGroup.Item className="w-100 d-flex my-1">
                                                    <Skeleton width={200} />
                                                </ListGroup.Item>
                                            </ListGroup>
                                        </div>
                                    </SkeletonTheme>
                                ))
                            ) : // Render actual data once it's fetched
                            myQuestions.length != 0 ? (
                                <MyQuestions myQuestions={myQuestions} />
                            ) : (
                                <div style={{ paddingBottom: "10px", fontSize: "20px", textAlign: "center" }}>
                                    No Questions Created
                                </div>
                            )}
                        </Tab>
                        <Tab
                            eventKey="missing"
                            title={<span style={{ fontSize: "18px", fontWeight: "500" }}>All Questions</span>}
                        >
                            {loading ? (
                                // Display skeletons while data is being fetched
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
                                                <ListGroup.Item className="w-100 d-flex my-1">
                                                    <Skeleton width={200} />
                                                </ListGroup.Item>
                                            </ListGroup>
                                        </div>
                                    </SkeletonTheme>
                                ))
                            ) : // Render actual data once it's fetched
                            allQuestions.length != 0 ? (
                                <AllQuestions allQuestions={allQuestions} />
                            ) : (
                                <div style={{ paddingBottom: "10px", fontSize: "20px", textAlign: "center" }}>
                                    No Questions Available
                                </div>
                            )}
                        </Tab>
                    </Tabs>
                </div>
            </div>
        </>
    );
};

export default Questions;
