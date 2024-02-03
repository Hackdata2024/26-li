import React, { useState } from "react";
import Nav from "react-bootstrap/Nav";
import "./AddQuestions.css";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import ShowQuestions from "./ShowQuestions";

import CodeMirror from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";
import { cpp } from "@codemirror/lang-cpp";

import { createTheme } from "@uiw/codemirror-themes";
import { tags as t } from "@lezer/highlight";
import { toast } from "react-toastify";
import ApiCall from "../../../util/ApiCall";

const myTheme = createTheme({
    theme: "light",
    settings: {
        background: "var(--lighter)",
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
// const extensions = [javascript({ jsx: true })];

const AddQuestions = () => {
    const [selectedOption, setSelectedOption] = useState("description");
    const [questionData, setQuestionData] = useState({
        QuestionName: "",
        ProblemStatement: "",
        SolutionCode: "",
        Constraints: "",
        RandomTestCode: "",
        RandomTestChecked: false,
        TestCases: [
            {
                input: "",
                sampleTestCase: false,
            },
        ],
    });

    const handleQuestionData = (event) => {
        const { name, value, type, checked } = event.target;
        // console.log(name, value, type, checked);
        if (type === "checkbox") {
            setQuestionData((prevData) => {
                return {
                    ...prevData,
                    [name]: checked,
                };
            });
            if (checked === false) {
                setQuestionData((prevData) => {
                    return {
                        ...prevData,
                        RandomTestCode: "",
                    };
                });
            }
        } else {
            setQuestionData((prevData) => {
                return {
                    ...prevData,
                    [name]: value,
                };
            });
        }
        console.log(questionData);
    };

    const handleCodeMirrorData = (name, value) => {
        console.log(value);
        setQuestionData((prevData) => {
            return {
                ...prevData,
                [name]: value,
            };
        });
        console.log(questionData);
    };

    const handleOptionChange = (value) => {
        setSelectedOption(value);
    };

    const handleTestCases = (e) => {
        setQuestionData((prevQuestionData) => ({
            ...prevQuestionData,
            TestCases: [...prevQuestionData.TestCases, { input: "", sampleTestCase: false }],
        }));
        // console.log(questionData);
    };
    const handleTestCaseData = (event, index) => {
        const updatedTestCase = [...questionData.TestCases];
        updatedTestCase[index].input = event.target.value;
        setQuestionData((prevQuestionData) => ({
            ...prevQuestionData,
            TestCases: updatedTestCase,
        }));
        console.log(questionData);
    };

    const handleSampleTestCaseData = (event, index) => {
        const updatedTestCase = [...questionData.TestCases];
        updatedTestCase[index].sampleTestCase = event.target.checked;
        setQuestionData((prevQuestionData) => ({
            ...prevQuestionData,
            TestCases: updatedTestCase,
        }));
        // console.log(questionData);
    };

    const handleTestCasesdelete = (event, index) => {
        // console.log(index);
        const updatedTestCases = [...questionData.TestCases];
        updatedTestCases.splice(index, 1);
        // console.log(updatedTestCases);
        setQuestionData((prevQuestionData) => ({
            ...prevQuestionData,
            TestCases: updatedTestCases,
        }));
    };

    const handlePrevNext = (direction) => {
        if (selectedOption === "description") {
            if (direction === "Next") {
                setSelectedOption("testcases");
            } else if (direction === "Prev") {
                setSelectedOption("description");
            }
        } else if (selectedOption === "testcases") {
            if (direction === "Prev") {
                setSelectedOption("description");
            } else if (direction === "Next") {
                setSelectedOption("preview");
            }
        } else if (selectedOption === "preview") {
            if (direction === "Prev") {
                setSelectedOption("testcases");
            }
        }
    };
    const validateForm = (data) => {
        // Check if all string fields are not empty
        for (let key in data) {
            if (typeof data[key] === "string" && data[key].trim() === "" && key !== "RandomTestCode") {
                return { isValid: false, message: `${key} is required.` };
            }
        }

        // Check if there's at least one test case
        if (data.TestCases.length === 0) {
            return { isValid: false, message: "At least one test case is required." };
        }

        // Check if all test cases have input
        for (let testCase of data.TestCases) {
            if (testCase.input.trim() === "") {
                return { isValid: false, message: "Test case input is required." };
            }
        }

        return { isValid: true, message: "All fields are valid." };
    };
    const handleCreate = () => {
        console.log(questionData);
        const { isValid, message } = validateForm(questionData);
        if (!isValid) {
            toast.error(message);
            return;
        }

        const postQuestion = async () => {
            try {
                const response = await ApiCall("/professors/addQuestion", "POST", questionData);
                console.log(response.data);
                if (response.data.success === true) {
                    toast.success("Question added successfully");
                } else {
                    toast.error(response.data.message ? response.data.message : "Error adding question");
                }
            } catch (error) {
                toast.error(error);
            }
        };
        postQuestion();
    };
    let content;

    if (selectedOption === "description") {
        content = (
            <>
                <Form style={{ color: "var(--lighter)", width: "65vw" }}>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Label>Problem Name</Form.Label>
                        <Form.Control
                            className="placeholder-color"
                            type="text"
                            name="QuestionName"
                            placeholder="Problem Name"
                            value={questionData.QuestionName}
                            onChange={handleQuestionData}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                        <Form.Label>Problem Statement</Form.Label>
                        <Form.Control
                            className="placeholder-color"
                            as="textarea"
                            name="ProblemStatement"
                            value={questionData.ProblemStatement}
                            onChange={handleQuestionData}
                            placeholder="write your problem statement here"
                            rows={3}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea3">
                        <Form.Label>Constraints</Form.Label>
                        <Form.Control
                            className="placeholder-color"
                            as="textarea"
                            name="Constraints"
                            value={questionData.Constraints}
                            onChange={handleQuestionData}
                            placeholder="write problem constraints"
                            rows={3}
                        />
                    </Form.Group>
                    <br />
                    <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea2">
                        <Form.Label>Solution Code</Form.Label>
                        <CodeMirror
                            value={questionData.SolutionCode}
                            height="200px"
                            theme={myTheme}
                            extensions={[cpp()]}
                            onChange={(event) => handleCodeMirrorData("SolutionCode", event)}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Check
                            checked={questionData.RandomTestChecked}
                            name="RandomTestChecked"
                            onChange={handleQuestionData}
                            type="checkbox"
                            label="Add Random Test Cases"
                        />
                    </Form.Group>

                    <br />

                    <Form.Group className="mb-3" controlId={`RandomTestCaseCode`}>
                        <Form.Label>Random Test Code Generator</Form.Label>
                        {/* <Form.Control
                            className="placeholder-color"
                            as="textarea"
                            name="RandomTestCode"
                            disabled={!questionData.RandomTestChecked}
                            onChange={handleQuestionData}
                            value={questionData.RandomTestCode}
                            rows={3}
                        /> */}
                        <CodeMirror
                            value={questionData.RandomTestCode}
                            height="200px"
                            theme={myTheme}
                            extensions={[cpp()]}
                            editable={questionData.RandomTestChecked ? true : false}
                            onChange={(event) => handleCodeMirrorData("RandomTestCode", event)}
                        />
                    </Form.Group>
                </Form>
            </>
        );
    } else if (selectedOption === "testcases") {
        content = (
            <>
                <div className="testcases" style={{ color: "black", minHeight: "44.5vh" }}>
                    {questionData.TestCases.map((code, index) => (
                        <div key={index}>
                            <Form.Group className="mb-3" controlId={`TestCase${index}`}>
                                <Button
                                    style={{
                                        marginBottom: "10px",
                                        padding: "0px 8px",
                                        float: "right",
                                        borderRadius: "4px",
                                    }}
                                    variant="secondary"
                                    onClick={(event) => handleTestCasesdelete(event, index)}
                                >
                                    Remove
                                </Button>
                                <Form.Label
                                    style={{
                                        color: "var(--lighter)",
                                        marginBottom: "10px",
                                    }}
                                >
                                    Test Case {index + 1}
                                </Form.Label>
                                <Form.Check // prettier-ignore
                                    style={{
                                        marginBottom: "10px",
                                        // padding: "0px 10px",
                                        // float: "right",
                                        width: "50vw",
                                        borderRadius: "4px",
                                        color: "white",
                                    }}
                                    onChange={(event) => handleSampleTestCaseData(event, index)}
                                    type="switch"
                                    id="custom-switch"
                                    checked={questionData.TestCases[index].sampleTestCase}
                                    label="Sample Test Case"
                                />
                                <Form.Control
                                    as="textarea"
                                    className="placeholder-color"
                                    name="TestCases"
                                    onChange={(event) => handleTestCaseData(event, index)}
                                    value={questionData.TestCases[index].input}
                                    rows={3}
                                />
                            </Form.Group>
                        </div>
                    ))}

                    <div style={{ textAlign: "center" }}>
                        <Button
                            style={{ padding: "2px", borderRadius: "50%" }}
                            variant="secondary"
                            onClick={handleTestCases}
                        >
                            <svg
                                style={{ backgroundColor: "#6c757d", borderRadius: "50%" }}
                                xmlns="http://www.w3.org/2000/svg"
                                width="40"
                                height="40"
                                fill="currentColor"
                                className="bi bi-plus"
                                viewBox="0 0 16 16"
                            >
                                <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4" />
                            </svg>
                        </Button>{" "}
                        &nbsp;
                    </div>
                </div>
            </>
        );
    } else {
        content = <ShowQuestions questionData={questionData} />;
    }

    return (
        <div style={{ color: "var(--lighter)", backgroundColor: "var(--bg1)" }}>
            <h1 style={{ textAlign: "center", padding: "20px", backgroundColor: "var(--sec)" }}>ADD QUESTIONS</h1>

            <Nav
                justify
                variant="tabs"
                style={{ marginTop: "-8px", paddingTop: "8px", backgroundColor: "var(--sec)" }}
                defaultActiveKey="#"
            >
                <Nav.Item>
                    <Nav.Link
                        href="#"
                        active={selectedOption === "description"}
                        onClick={() => handleOptionChange("description")}
                        className="addquesnavlink"
                    >
                        Description
                    </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link
                        eventKey="testcases"
                        active={selectedOption === "testcases"}
                        onClick={() => handleOptionChange("testcases")}
                        className="addquesnavlink"
                    >
                        Test Cases
                    </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link
                        eventKey="preview"
                        active={selectedOption === "preview"}
                        onClick={() => handleOptionChange("preview")}
                        className="addquesnavlink"
                    >
                        Preview
                    </Nav.Link>
                </Nav.Item>
            </Nav>

            <div style={{ margin: "40px", display: "flex", justifyContent: "center" }}>
                <div className="profaddquestion_mid-section">{content}</div>
            </div>

            <div
                style={{
                    padding: "20px",
                    marginBottom: "60px",
                    backgroundColor: "var(--sec)",
                    display: "flex",
                    justifyContent: "end",
                }}
            >
                <Button
                    style={{
                        margin: "14px",
                        // padding: "10px 20px",
                        width: "100px",
                        font: "Fira Code",
                        padding: "10px !important",
                        color: "var(--sec)",
                        backgroundColor: "var(--light)",
                        borderColor: "var(--light)",
                        transition: "box-shadow 0.8s ease-in-out",
                    }}
                    onMouseOver={(e) => {
                        e.target.style.backgroundColor = "var(--lighter)";
                    }}
                    onMouseOut={(e) => {
                        e.target.style.backgroundColor = "var(--light)";
                    }}
                    onClick={() => handlePrevNext("Prev")}
                >
                    Previous
                </Button>
                <Button
                    style={{
                        margin: "14px",
                        width: "100px",
                        font: "Fira Code",
                        padding: "10px !important",
                        color: "var(--sec)",
                        backgroundColor: "var(--light)",
                        borderColor: "var(--light)",
                        transition: "box-shadow 0.8s ease-in-out",
                    }}
                    onMouseOver={(e) => {
                        e.target.style.backgroundColor = "var(--lighter)";
                    }}
                    onMouseOut={(e) => {
                        e.target.style.backgroundColor = "var(--light)";
                    }}
                    onClick={() => handlePrevNext("Next")}
                >
                    Next
                </Button>
                <Button
                    style={{
                        margin: "14px",
                        width: "100px",
                        font: "Fira Code",
                        padding: "10px !important",
                        color: "var(--sec)",
                        backgroundColor: "var(--light)",
                        borderColor: "var(--light)",
                        transition: "box-shadow 0.8s ease-in-out",
                    }}
                    onMouseOver={(e) => {
                        e.target.style.backgroundColor = "var(--lighter)";
                    }}
                    onMouseOut={(e) => {
                        e.target.style.backgroundColor = "var(--light)";
                    }}
                    onClick={() => handleCreate()}
                >
                    Create
                </Button>
            </div>
        </div>
    );
};

export default AddQuestions;
