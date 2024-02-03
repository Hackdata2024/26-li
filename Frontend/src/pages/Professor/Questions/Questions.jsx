import React, { useEffect } from "react";
import { useState } from "react";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import MyQuestions from "./MyQuestions";
import AllQuestions from "./AllQuestions";
import ApiCall from "../../../util/ApiCall";

const Questions = () => {
    const [myQuestions, setMyQuestions] = useState([]);
    const [allQuestions, setAllQuestions] = useState([]);

    useEffect(() => {
        const getQuestions = async () => {
            try {
                const response1 = await ApiCall("/professors/myQuestions", "GET", {});
                const response2 = await ApiCall("/professors/allQuestions", "GET", {});
                console.log("response 1", response1.data.data);
                console.log("response 2", response2.data.data);

                setMyQuestions(response1.data.data);
                setAllQuestions(response2.data.data);
            } catch (error) {
                console.error("Error while fetching Questions: ", error);
            }
        };
        getQuestions();
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
                    Questions
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
                            title={<span style={{ fontSize: "18px", fontWeight: "500" }}> My Questions</span>}
                        >
                            {myQuestions.length != 0 ? (
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
                            {allQuestions.length != 0 ? (
                                <AllQuestions allQuestions={allQuestions} />
                            ) : (
                                <div style={{ paddingBottom: "10px", fontSize: "20px", textAlign: "center" }}>
                                    No Question Available
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
