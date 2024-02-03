import React from "react";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import CodeMirror from "@uiw/react-codemirror";
import { cpp } from "@codemirror/lang-cpp";
import { createTheme } from "@uiw/codemirror-themes";
import { tags as t } from "@lezer/highlight";
import { toast } from "react-toastify";
import "./SolveProblem.css";
import { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import ResultModal from "./ResultsModal";
import { useParams } from "react-router-dom";
import ApiCall from "../../util/ApiCall";
import OffCanvasExample from "./ProblemSidenav";

const myTheme = createTheme({
    theme: "light",
    settings: {
        background: "#ffffff",
        backgroundImage: "",
        foreground: "#75baff",
        caret: "#5d00ff",
        selection: "#036dd626",
        selectionMatch: "#036dd626",
        lineHighlight: "#8a91991a",
        gutterBackground: "#fff",
        gutterForeground: "#8a919966",
    },
    styles: [
        { tag: t.comment, color: "#787b8099" },
        { tag: t.variableName, color: "#0080ff" },
        { tag: [t.string, t.special(t.brace)], color: "#5c6166" },
        { tag: t.number, color: "#5c6166" },
        { tag: t.bool, color: "#5c6166" },
        { tag: t.null, color: "#5c6166" },
        { tag: t.keyword, color: "#5c6166" },
        { tag: t.operator, color: "#5c6166" },
        { tag: t.className, color: "#5c6166" },
        { tag: t.definition(t.typeName), color: "#5c6166" },
        { tag: t.typeName, color: "#5c6166" },
        { tag: t.angleBracket, color: "#5c6166" },
        { tag: t.tagName, color: "#5c6166" },
        { tag: t.attributeName, color: "#5c6166" },
    ],
});

const SolveProblem = () => {
    const [questions, setQuestions] = useState([]);
    const [currIndex, setCurrIndex] = useState(0);
    const [assignmentSolution, setAssignmentSolution] = useState([]);
    const [questionData, setQuestionData] = useState({
        QuestionName: "",
        ProblemStatement: "",
        Constraints: "",
        TestCases: [],
        Code: "",
    });

    const { id } = useParams();

    const getQuestions = async (url, type) => {
        try {
            const response = await ApiCall(url, "GET");
            console.log("response", response.data);
            console.log("response", response.data.data.Questions);
            setQuestions(response.data.data.Questions);
            setQuestionData(response.data.data.Questions[currIndex]);
        } catch (error) {
            toast.error("Error in getting questions");
        }
    };

    const changeQuestionViaIndex = (index) => {
        setCurrIndex(index);
        setQuestionData(questions[index]);
    };

    const handleCodeMirrorData = (name, event) => {
        setQuestionData({ ...questionData, [name]: event });
        console.log(questionData);
    };

    useEffect(() => {
        var currentURL = window.location.href;
        currentURL = currentURL.split("/");
        currentURL = currentURL[currentURL.length - 2];
        console.log(currentURL);
        // console.log("fetching data");
        if (currentURL === "assignment") {
            const url = "/students/getAssignment/" + id;
            getQuestions(url, "assignment");
        } else if (currentURL === "evaluation") {
            const url = "/students/getEvaluation/" + id;
            getQuestions(url, "evaluation");
        }
    }, []);

    const handleSubmit = (event) => {
        //  now i will store the questionData in the assignmentSolution array with the index of the question

        // console.log(questionData);
        let temp = assignmentSolution;
        temp[currIndex] = questionData;
        setAssignmentSolution(temp);
        console.log(assignmentSolution);
        toast.success("Submitted");
    };

    return (
        <div>
            {["start"].map((placement, idx) => (
                <OffCanvasExample
                    key={idx}
                    changeQuestionViaIndex={changeQuestionViaIndex}
                    assignmentSolution={assignmentSolution}
                    questions={questions}
                    placement={placement}
                    name={placement}
                />
            ))}

            <div
                style={{
                    backgroundColor: "rgba(36,36,36,1)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                }}
            >
                <div className="mainquestionsection" style={{ marginBottom: "80px" }}>
                    <div
                        style={{
                            padding: "2% 2%",
                        }}
                    >
                        <Card style={{ border: "none", borderRadius: "10px" }}>
                            <Card.Body>
                                {questionData.QuestionName != "" ? (
                                    <div>
                                        <Card.Title
                                            style={{ textAlign: "center", fontSize: "30px", fontWeight: "500" }}
                                        >
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
                                        <Card.Title style={{ textAlign: "center", fontSize: "40px" }}>
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
                                    <pre
                                        style={{ whiteSpace: "pre-wrap", wordWrap: "break-word", textAlign: "justify" }}
                                    >
                                        {questionData.ProblemStatement}
                                    </pre>
                                ) : (
                                    <Card.Text>No Problem Statement provided</Card.Text>
                                )}

                                {questionData.Constraints != "" ? (
                                    <div>
                                        {/* <br /> */}
                                        <Card.Title>Constraints</Card.Title>
                                        <pre>{questionData.Constraints}</pre>
                                    </div>
                                ) : (
                                    <div>
                                        {/* <br /> */}
                                        <Card.Title>Constraints</Card.Title>
                                        <p>No constraints provided</p>
                                    </div>
                                )}
                                {/* <br /> */}

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
                            </Card.Body>
                        </Card>
                    </div>
                    <div
                        style={{
                            backgroundColor: "white",
                            borderTopLeftRadius: "10px",
                            borderTopRightRadius: "10px",
                            fontSize: "20px",
                            fontWeight: "500",
                            padding: "2px 4px",
                            textAlign: "center",
                            margin: "0% 2%",
                        }}
                    >
                        &lt;/ Write Your Code &gt;
                    </div>
                    <CodeMirror
                        value={questionData.Code}
                        height="200px"
                        // x
                        width="96%"
                        theme={myTheme}
                        extensions={[cpp()]}
                        onChange={(event) => handleCodeMirrorData("Code", event)}
                        className="w-100 d-flex align-items-center justify-content-center mb-10"
                    />
                    <div
                        style={{
                            backgroundColor: "white",
                            borderBottomLeftRadius: "10px",
                            borderBottomRightRadius: "10px",
                            fontSize: "20px",
                            fontWeight: "500",

                            textAlign: "center",
                            padding: "10px",
                            margin: "0% 2%",
                        }}
                    ></div>
                    <div style={{ textAlign: "center", marginTop: "2%" }}>
                        {/* <Button style={{ width: "100px" }}>Run Code</Button> */}
                        <ResultModal questionData={questionData} />
                        &nbsp;&nbsp;&nbsp;&nbsp;
                        <Button style={{ width: "100px" }} onClick={handleSubmit}>
                            Submit
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SolveProblem;
