import React from "react";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import CodeMirror from "@uiw/react-codemirror";
import { cpp } from "@codemirror/lang-cpp";

const ShowQuestions = (props) => {
    const { questionData } = props;
    console.log(questionData.RandomTestChecked);

    return (
        <div
            style={{
                // display: "flex",
                // justifyContent: "space-around",
                // flexDirection: "column",
                // alignItems: "center",
                minHeight: "45.7vh",
            }}
        >
            <Card style={{ border: "none" }}>
                <Card.Body>
                    {questionData.QuestionName != "" ? (
                        <div>
                            <Card.Title style={{ textAlign: "center", fontSize: "30px" }}>
                                {questionData.QuestionName}
                            </Card.Title>
                            <Card.Subtitle style={{ textAlign: "center" }} className="mb-2 text-muted">
                                time limit per test : 1 second
                            </Card.Subtitle>
                            <Card.Subtitle style={{ textAlign: "center" }} className="mb-2 text-muted">
                                memory limit per test : 256 megabytes
                            </Card.Subtitle>
                            <hr />
                        </div>
                    ) : (
                        <div>
                            <Card.Title style={{ textAlign: "center", fontSize: "30px" }}>
                                No Question Name provided
                            </Card.Title>
                            <Card.Subtitle style={{ textAlign: "center" }} className="mb-2 text-muted">
                                time limit per test : 1 second
                            </Card.Subtitle>
                            <Card.Subtitle style={{ textAlign: "center" }} className="mb-2 text-muted">
                                memory limit per test : 256 megabytes
                            </Card.Subtitle>
                            <hr />
                        </div>
                    )}
                    {questionData.ProblemStatement != "" ? (
                        <div>
                            <pre style={{ whiteSpace: "pre-wrap", wordWrap: "break-word", textAlign: "justify" }}>
                                {questionData.ProblemStatement}
                            </pre>
                        </div>
                    ) : (
                        <Card.Text>No Problem Statement provided</Card.Text>
                    )}

                    {questionData.Constraints != "" ? (
                        <div>
                            <br />
                            <Card.Title>Constraints</Card.Title>
                            <Card.Text>
                                <pre>{questionData.Constraints}</pre>
                            </Card.Text>
                        </div>
                    ) : (
                        <div>
                            <br />
                            <Card.Title>Constraints</Card.Title>
                            <p>No constraints provided</p>
                        </div>
                    )}
                    <br />

                    {questionData.TestCases.length != 0 && questionData.TestCases[0].input != "" ? (
                        <div>
                            <Card.Title>Sample Test Cases</Card.Title>

                            {questionData.TestCases.map((testcases, index) =>
                                testcases.sampleTestCase ? (
                                    <div key={index}>
                                        Sample Test Case {index}
                                        <Card>
                                            <ListGroup variant="flush" className="px-1">
                                                <ListGroup.Item>
                                                    <pre>{testcases.input}</pre>
                                                </ListGroup.Item>
                                            </ListGroup>
                                        </Card>
                                    </div>
                                ) : null
                            )}

                            <br />
                            <Card.Title>Hidden Test Cases</Card.Title>

                            {questionData.TestCases.map((testcases, index) =>
                                !testcases.sampleTestCase ? (
                                    <div key={index}>
                                        Hidden Test Case {index}
                                        <Card>
                                            <ListGroup variant="flush" key={index} className="px-1">
                                                <ListGroup.Item>
                                                    <pre>{testcases.input}</pre>
                                                </ListGroup.Item>
                                            </ListGroup>
                                        </Card>
                                    </div>
                                ) : null
                            )}
                        </div>
                    ) : (
                        <div>
                            <Card.Title>Sample Test Cases</Card.Title>
                            <p>No Sample TestCase provided</p>
                            <br />
                            <Card.Title>Hidden Test Cases</Card.Title>
                            <p>No Hidden Test Case provided</p>
                        </div>
                    )}

                    {questionData?.SolutionCode != "" ? (
                        <div>
                            <br />
                            <Card.Title>Solution Code</Card.Title>
                            <CodeMirror
                                value={questionData.SolutionCode}
                                // theme={myTheme}
                                extensions={[cpp()]}
                                editable={false}
                            />
                        </div>
                    ) : (
                        <div>
                            <br />
                            <Card.Title>Solution Code</Card.Title>
                            <p>No Solution Code Provided</p>
                        </div>
                    )}
                    {questionData?.RandomTestChecked && questionData?.RandomTestCode != "" ? (
                        <div>
                            <br />
                            <Card.Title>Random Test Code Generator</Card.Title>
                            <CodeMirror
                                value={questionData.RandomTestCode}
                                // theme={myTheme}
                                extensions={[cpp()]}
                                editable={false}
                            />
                        </div>
                    ) : (
                        <div>
                            <br />
                            <Card.Title>Random Test Code Generator</Card.Title>
                            <p>No Random Test Code Generator provided</p>
                        </div>
                    )}

                    {/* {questionData.QuestionName == "" &&
                    questionData.ProblemStatement == "" &&
                    questionData.SolutionCode == "" &&
                    !questionData.RandomTestChecked &&
                    questionData.RandomTestCode == "" &&
                    questionData.Constraints == "" &&
                    (questionData.TestCases.length == 0 || questionData.TestCases.length[0]?.input == "")
                        ? "No Preview available"
                        : ""} */}
                </Card.Body>
            </Card>
        </div>
    );
};

export default ShowQuestions;
