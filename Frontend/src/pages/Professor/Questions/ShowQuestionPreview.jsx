import React from "react";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import CodeMirror from "@uiw/react-codemirror";
import { cpp } from "@codemirror/lang-cpp";

const ShowQuestionPreview = (props) => {
    const { question } = props;
    console.log("question is: ", question);

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
                    {question.QuestionName != "" ? (
                        <div>
                            <Card.Title style={{ textAlign: "center", fontSize: "30px" }}>
                                {question.QuestionName}
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
                    {question.ProblemStatement != "" ? (
                        <div>
                            <pre style={{ whiteSpace: "pre-wrap", wordWrap: "break-word", textAlign: "justify" }}>
                                {question.ProblemStatement}
                            </pre>
                        </div>
                    ) : (
                        <Card.Text>No Problem Statement provided</Card.Text>
                    )}

                    {question.Constraints != "" ? (
                        <div>
                            <br />
                            <Card.Title>Constraints</Card.Title>
                            <div>
                                <pre>{question.Constraints}</pre>
                            </div>
                        </div>
                    ) : (
                        <div>
                            <br />
                            <Card.Title>Constraints</Card.Title>
                            <p>No constraints provided</p>
                        </div>
                    )}
                    <br />

                    {question.TestCases.length != 0 && question.TestCases[0].input != "" ? (
                        <div>
                            <Card.Title>Sample Test Cases</Card.Title>

                            {question.TestCases.map((testcases, index) =>
                                testcases.sampleTestCase ? (
                                    <div key={index}>
                                        Sample Test Case {index}
                                        <Card>
                                            <ListGroup variant="flush" className="px-1">
                                                <ListGroup.Item>
                                                    <div>
                                                        <pre>{testcases.input}</pre>
                                                    </div>
                                                </ListGroup.Item>
                                            </ListGroup>
                                        </Card>
                                    </div>
                                ) : null
                            )}

                            <br />
                            <Card.Title>Hidden Test Cases</Card.Title>

                            {question.TestCases.map((testcases, index) =>
                                !testcases.sampleTestCase ? (
                                    <div key={index}>
                                        Hidden Test Case {index}
                                        <Card>
                                            <ListGroup variant="flush" key={index} className="px-1">
                                                <ListGroup.Item>
                                                    <div>
                                                        <pre>{testcases.input}</pre>
                                                    </div>
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

                    {question?.SolutionCode != "" ? (
                        <div>
                            <br />
                            <Card.Title>Solution Code</Card.Title>
                            <CodeMirror
                                value={question.SolutionCode}
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
                    {question?.RandomTestChecked && question?.RandomTestCode != "" ? (
                        <div>
                            <br />
                            <Card.Title>Random Test Code Generator</Card.Title>
                            <CodeMirror
                                value={question.RandomTestCode}
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
                </Card.Body>
            </Card>
        </div>
    );
};

export default ShowQuestionPreview;
