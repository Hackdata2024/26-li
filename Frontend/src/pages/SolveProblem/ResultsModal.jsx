import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import React, { useState } from "react";
import ApiCall from "../../util/ApiCall";
import Badge from "react-bootstrap/Badge";
import { toast } from "react-toastify";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import AiSuggestion from "./AiSuggestion";

function MyVerticallyCenteredModal({ result, questionData, testCasesStatus, ...props }) {
    return (
        <Modal {...props} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">Results &nbsp;&nbsp; {result}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Tabs defaultActiveKey="Testcases" id="justify-tab-example" className="mb-3" justify>
                    <Tab eventKey="Testcases" title="Testcases">
                        <div
                            style={{
                                display: "flex",
                                flexDirection: "column",
                            }}
                        >
                            {testCasesStatus.map((testCase, index) => {
                                let content;
                                let type = "";
                                if (testCase === "AC") content = <Badge bg="success">AC</Badge>;
                                else if (testCase === "WA") {
                                    content = <Badge bg="danger">WA</Badge>;
                                } else if (testCase === "CE") {
                                    content = <Badge bg="danger">CE</Badge>;
                                } else if (testCase === "TLE") {
                                    content = <Badge bg="danger">TLE</Badge>;
                                } else if (testCase === "Error in Solution Code!") {
                                    content = <Badge bg="danger">Error in Solution Code!</Badge>;
                                } else if (testCase === "RAC") {
                                    type = "Random";
                                    content = (
                                        <>
                                            <Badge bg="success">AC</Badge>
                                        </>
                                    );
                                } else if (testCase === "RWA") {
                                    type = "Random";
                                    content = (
                                        <>
                                            <Badge bg="danger">WA</Badge>
                                        </>
                                    );
                                }
                                return (
                                    <div key={index} style={{ display: "flex", alignItems: "center" }}>
                                        <div
                                            className="mx-4"
                                            style={{ fontSize: "20px", fontWeight: "400" }}
                                        >{`${type} Test Case ${index + 1}`}</div>
                                        {content}
                                    </div>
                                );
                            })}
                        </div>
                    </Tab>
                    <Tab eventKey="aiSuggestion" title="AI Suggestion">
                        <AiSuggestion result={result} questionData={questionData} />
                    </Tab>
                </Tabs>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={props.onHide}>Close</Button>
            </Modal.Footer>
        </Modal>
    );
}

function ResultModal({ questionData, ...props }) {
    const [modalShow, setModalShow] = React.useState(false);
    const [testCasesStatus, setTestCasesStatus] = React.useState([]);
    const [result, setResult] = useState("Pending");
    const handleRunCode = async () => {
        const getTestCasesRunned = async (index) => {
            try {
                const data = {
                    Code: questionData.Code,
                    QuestionId: questionData._id,
                    TestCaseIndex: index,
                };
                const response = await ApiCall("/RunTests", "POST", data);
                console.log(response.data);
                if (response.data.success) {
                    setTestCasesStatus((prevTestCasesStatus) => {
                        return [...prevTestCasesStatus, "AC"];
                    });
                } else {
                    if (response.data.message === "Error in Solution Code!") {
                        setTestCasesStatus((prevTestCasesStatus) => {
                            return [...prevTestCasesStatus, "Error in Solution Code!"];
                        });
                    } else if (
                        response.data.message === "Compilation Error!" ||
                        response.data.message === "Error While Writing!"
                    ) {
                        setTestCasesStatus((prevTestCasesStatus) => {
                            return [...prevTestCasesStatus, "CE"];
                        });
                    } else if (response.data.message === "Execution Timeout!") {
                        setTestCasesStatus((prevTestCasesStatus) => {
                            return [...prevTestCasesStatus, "TLE"];
                        });
                    } else {
                        setTestCasesStatus((prevTestCasesStatus) => {
                            console.log(questionData);
                            if (questionData.TestCases[index].sampleTestCase) {
                                toast.info(`Your output : ${response.data.YourOutput}`);
                                toast.info(`Expected Output : ${response.data.ExpectedOutput}`);
                            }
                            return [...prevTestCasesStatus, "WA"];
                        });
                    }
                }
            } catch (err) {
                console.log(err);
            }
        };

        const getRandomdTestCasesRunned = async () => {
            try {
                const data = {
                    Code: questionData.Code,
                    QuestionId: questionData._id,
                };
                const response = await ApiCall("/RunRandomTests", "POST", data);
                console.log(response.data);
                if (response.data.success) {
                    toast.success(response.data.message);
                    setTestCasesStatus((prevTestCasesStatus) => {
                        return [...prevTestCasesStatus, "RAC"];
                    });
                } else {
                    toast.error(response.data.message);
                    if (response.data.YourOutput && response.data.ExpectedOutput) {
                        toast.error(`Your output : ${response.data.YourOutput}`);
                        toast.error(`Expected Output : ${response.data.ExpectedOutput}`);
                    }

                    setTestCasesStatus((prevTestCasesStatus) => {
                        return [...prevTestCasesStatus, "RWA"];
                    });
                }
            } catch (err) {
                console.log(err);
            }
        };

        setModalShow(true);
        setTestCasesStatus([]);
        setResult("Pending");
        console.log("testCasesStatus", testCasesStatus);

        for (let i = 0; i < questionData.TestCases.length; i++) {
            await getTestCasesRunned(i);
        }
        if (questionData.RandomTestChecked) {
            for (let i = 0; i < import.meta.env.VITE_NUMBER_OF_RANDOM_TEST; i++) {
                await getRandomdTestCasesRunned();
            }
        }
        let flag = true;

        for (let i = 0; i < questionData.TestCases.length; i++) {
            if (testCasesStatus[i] !== "AC" || testCasesStatus[i] !== "RAC") {
                flag = false;
                break; // Exiting the loop since we have found a rejected test case
            }
        }

        if (flag) setResult("Accepted");
        else setResult("Wrong Answer");
    };
    return (
        <>
            <Button variant="primary" style ={{fontSize: "20px",
                            fontWeight: "bold",
                            backgroundColor: "var(--light)",
                            border: "none",
                            marginLeft: "2%",
                            color: "var(--bg1)"}}onClick={() => handleRunCode()}>
                Run Code
            </Button>

            <MyVerticallyCenteredModal
                questionData={questionData}
                testCasesStatus={testCasesStatus}
                show={modalShow}
                result={result}
                onHide={() => setModalShow(false)}
            />
        </>
    );
}

export default ResultModal;
