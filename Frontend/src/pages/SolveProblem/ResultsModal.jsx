import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import React from "react";
import ApiCall from "../../util/ApiCall";
import { Spinner } from "react-bootstrap";

function MyVerticallyCenteredModal({ questionData, testCasesStatus, ...props }) {
    console.log("testCasesStatus", testCasesStatus);
    return (
        <Modal {...props} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">Results &nbsp;&nbsp; Accepted</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div
                    style={{
                        display: "flex",
                        flexDirection: "column",
                    }}
                >
                    {questionData.TestCases.map((testCase, index) => (
                        <div key={index} style={{ display: "flex", alignItems: "center" }}>
                            <div style={{ fontSize: "20px", fontWeight: "400" }}>{`Test Case ${index + 1}`}</div>
                            <div style={{ alignItems: "center", marginLeft: "4%" }}>
                                {" "}
                                {testCasesStatus[index] ? (
                                    <div style={{ color: "green" }}>Accepted</div>
                                ) : (
                                    <div style={{ color: "red" }}>Rejected</div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={props.onHide}>Close</Button>
            </Modal.Footer>
        </Modal>
    );
}

function ResultModal({ questionData, ...props }) {
    const [modalShow, setModalShow] = React.useState("pending");
    const [testCasesStatus, setTestCasesStatus] = React.useState(Array(questionData.TestCases.length).fill(false));
    console.log(questionData);
    const handleRunCode = async () => {
        const getTestCasesRunned = async (index) => {
            try {
                const data = {
                    code: questionData.Code,
                    QuestionId: questionData._id,
                    TestCaseIndex: index,
                };
                console.log(data);
                const response = await ApiCall("/RunTests", "POST", data);
                console.log("response", response.data);
                if (response.data.success) {
                    let updatedTestCasesStatus = [...testCasesStatus];
                    updatedTestCasesStatus[index] = true;
                    setTestCasesStatus(updatedTestCasesStatus);
                }
            } catch (err) {
                console.log(err);
            }
        };
        setModalShow(true);
        console.log(testCasesStatus);
        for (let i = 0; i < questionData.TestCases.length; i++) {
            await getTestCasesRunned(i);
            console.log(i);
        }
    };
    return (
        <>
            <Button variant="primary" onClick={() => handleRunCode()}>
                Run Code
            </Button>

            <MyVerticallyCenteredModal
                questionData={questionData}
                testCasesStatus={testCasesStatus}
                show={modalShow}
                onHide={() => setModalShow(false)}
            />
        </>
    );
}

export default ResultModal;
