import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import React from "react";

function MyVerticallyCenteredModal({ questionData, testCasesRunned, ...props }) {
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
                            <div style={{ alignItems: "center" }}>Accepted</div>
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
    const [modalShow, setModalShow] = React.useState(false);
    const [testCasesRunned, setTestCasesRunned] = React.useState([]);
    const handleRunCode = () => {
        const getTestCasesRunned = async () => {
            try {
                const data = {
                    code: questionData.Code,
                    QuestionId: questionData._id,
                };
                console.log(data);
                // const response = await ApiCall("/RunTests", "POST", data);
                // console.log("response", response.data);
                // setTestCasesRunned(response.data);
            } catch (err) {
                console.log(err);
            }
        };
        setModalShow(true);
        getTestCasesRunned();
    };
    return (
        <>
            <Button variant="primary" onClick={() => handleRunCode()}>
                Run Code
            </Button>

            <MyVerticallyCenteredModal
                questionData={questionData}
                testCasesRunned={testCasesRunned}
                show={modalShow}
                onHide={() => setModalShow(false)}
            />
        </>
    );
}

export default ResultModal;
