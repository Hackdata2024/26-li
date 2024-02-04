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
            console.log("response", response.data); // this wil give an array in which every element has Marks and QuestionId
            setQuestions(response.data.data.Questions); // assigning array to the questions
            setQuestionData(response.data.data.Questions[currIndex]); // assigning first question to the questionData
        } catch (error) {
            toast.error("Error in getting questions");
        }
    };

    const [isInputFocused, setIsInputFocused] = useState(false);

    const handleVisibilityChange = () => {
        if (document.hidden && !isInputFocused) {
            alert("Tab switched! You will be logged out in 5 seconds");
        }
    };

    const handleInputFocus = () => {
        setIsInputFocused(true);
    };

    const handleInputBlur = () => {
        setIsInputFocused(false);
    };

    useEffect(() => {
        document.addEventListener("visibilitychange", handleVisibilityChange);

        return () => {
            document.removeEventListener("visibilitychange", handleVisibilityChange);
        };
    }, [isInputFocused]);

    const changeQuestionViaIndex = (index) => {
        setCurrIndex(index);
        setQuestionData(questions[index]);
    };

    const handleCodeMirrorData = (name, event) => {
        //
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
                    id={id}
                    changeQuestionViaIndex={changeQuestionViaIndex}
                    assignmentSolution={assignmentSolution}
                    questions={questions}
                    placement={placement}
                    name={placement}
                />
            ))}

            <div
                style={{
                    backgroundColor: "var(--sec)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                }}
            >
                <div className="mainquestionsection" style={{ marginBottom: "80px", fontFamily: "Open Sans" }}>
                    <div
                        style={{
                            padding: "2% 2%",
                        }}
                    >
                        <Card style={{ border: "none", borderRadius: "10px", backgroundColor: "xs" }}>
                            <Card.Body>
                                {questionData.QuestionName != "" ? (
                                    <div>
                                        <Card.Title
                                            style={{
                                                textAlign: "center",
                                                fontSize: "40px",
                                                fontWeight: "800",
                                                fontFamily: "Open Sans",
                                            }}
                                        >
                                            {questionData.QuestionName}
                                        </Card.Title>
                                        <Card.Subtitle
                                            style={{ textAlign: "center", fontFamily: "Fira Code" }}
                                            className="mb-2 text-muted"
                                        >
                                            time limit per test : 1 second
                                        </Card.Subtitle>
                                        <Card.Subtitle
                                            style={{ textAlign: "center", fontFamily: "Fira Code" }}
                                            className="mb-2 text-muted"
                                        >
                                            memory limit per test : 256 megabytes
                                        </Card.Subtitle>
                                        <hr />
                                    </div>
                                ) : (
                                    <div>
                                        <Card.Title
                                            style={{ textAlign: "center", fontSize: "40px", fontFamily: "Open Sans" }}
                                        >
                                            No Question Name provided
                                        </Card.Title>
                                        <Card.Subtitle
                                            style={{ textAlign: "center", fontFamily: "Fira Code" }}
                                            className="mb-2 text-muted"
                                        >
                                            <i> time limit per test : 1 second</i>
                                        </Card.Subtitle>
                                        <Card.Subtitle
                                            style={{ textAlign: "center", fontFamily: "Fira Code" }}
                                            className="mb-2 text-muted"
                                        >
                                            <i>memory limit per test : 256 megabytes</i>
                                        </Card.Subtitle>
                                        <hr />
                                    </div>
                                )}
                                {questionData.ProblemStatement != "" ? (
                                    <pre
                                        style={{
                                            whiteSpace: "pre-wrap",
                                            wordWrap: "break-word",
                                            textAlign: "justify",
                                            fontSize: "18px",
                                        }}
                                    >
                                        {questionData.ProblemStatement}
                                    </pre>
                                ) : (
                                    <Card.Text>No Problem Statement provided</Card.Text>
                                )}

                                {questionData.Constraints != "" ? (
                                    <div>
                                        {/* <br /> */}
                                        <Card.Title style={{ fontSize: "18px" }}>
                                            <b>Constraints</b>
                                        </Card.Title>
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
                                        <Card.Title style={{ fontSize: "18px" }}>
                                            <b>Sample Test Cases</b>
                                        </Card.Title>

                                        {questionData.TestCases.map((testcases, index) =>
                                            testcases.sampleTestCase ? (
                                                <div key={index}>
                                                    Sample Test Case {index}
                                                    <Card style={{ maxWidth: "20vw" }}>
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
                            marginTop: "10px",
                            backgroundColor: "var(--lighter)",
                            borderTopLeftRadius: "10px",
                            borderTopRightRadius: "10px",
                            fontSize: "20px",
                            fontWeight: "500",
                            padding: "2px 4px",
                            textAlign: "center",
                            margin: "0% 2%",
                        }}
                    >
                        &lt; Write Your Code /&gt;
                    </div>
                    <CodeMirror
                        value={questionData.Code}
                        height="200px"
                        // x
                        onFocus={handleInputFocus}
                        onBlur={handleInputBlur}
                        width="96%"
                        theme={myTheme}
                        extensions={[cpp()]}
                        onChange={(event) => handleCodeMirrorData("Code", event)}
                        className="w-100 d-flex align-items-center justify-content-center mb-10"
                    />
                    <div
                        style={{
                            backgroundColor: "var(--lighter)",
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
                        {/* <Button style={{ fontSize: "20px",
                            fontWeight: "bold",
                            backgroundColor: "var(--light)",
                            border: "none",
                            marginLeft: "2%",
                            color: "var(--bg1)", }}>Run Code</Button> */}
                        <ResultModal questionData={questionData} />
                        &nbsp;&nbsp;&nbsp;&nbsp;
                        <Button
                            style={{
                                fontSize: "20px",
                                fontWeight: "bold",
                                backgroundColor: "var(--light)",
                                border: "none",
                                marginLeft: "2%",
                                color: "var(--bg1)",
                            }}
                            onMouseOver={(e) => {
                                e.target.style.color = "var(--bg1)";
                            }}
                            onMouseOut={(e) => {
                                e.target.style.color = "var(--sec)";
                            }}
                            onClick={handleSubmit}
                        >
                            Submit
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SolveProblem;
