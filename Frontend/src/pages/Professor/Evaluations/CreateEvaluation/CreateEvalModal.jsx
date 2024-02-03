import React, { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import QuestionTab from "./QuestionTab";
import ApiCall from "../../../../util/ApiCall";
import { toast } from "react-toastify";
import MarksTab from "./MarksTab";

const CreateEvalModal = (props) => {
    const [selectedOption, setSelectedOption] = useState("Description");
    const [questions, setQuestions] = useState([]);
    const [formData, setFormData] = useState({
        Year: "",
        Batches: [],
        Questions: [],
        StartTime: "",
        Name: "",
        EndTime: "",
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        console.log(name, value, type, checked);
        if (type === "checkbox") {
            if (checked) {
                setFormData((prevData) => ({
                    ...prevData,
                    Batches: [...prevData.Batches, name],
                }));
            } else {
                setFormData((prevData) => ({
                    ...prevData,
                    Batches: prevData.Batches.filter((batchName) => batchName !== name),
                }));
            }
        } else {
            // Handle other input types
            setFormData((prevData) => ({
                ...prevData,
                [name]: value,
            }));
        }
        console.log(formData);
    };

    const handlePrevNext = (direction) => {
        if (selectedOption === "Description") {
            if (direction === "Next") {
                setSelectedOption("Questions");
            }
        } else if (selectedOption === "Questions") {
            if (direction === "Prev") {
                setSelectedOption("Description");
            } else if (direction === "Next") {
                setSelectedOption("Marks");
            }
        } else if (selectedOption === "Marks") {
            if (direction === "Prev") {
                setSelectedOption("Questions");
            }
        }
    };

    const validate = () => {
        let errors = "";
        if (!formData.Year) {
            errors = "Year is required";
        }
        if (formData.Batches.length === 0) {
            errors = "At least one batch must be selected";
        }
        if (formData.Questions.length === 0) {
            errors = "At least one question must be provided";
        }
        if (!formData.StartTime) {
            errors = "Start Date and Time is required";
        }
        if (!formData.EndTime) {
            errors = "End Date and Time is required";
        }
        if (!formData.Name) {
            errors = "Evaluation name is required";
        }
        const startDate = new Date(formData.StartTime);
        const endDate = new Date(formData.EndTime);
        if (startDate > endDate) {
            errors = "Start date and time must be less than end date and time";
        }
        const currentDate = new Date();
        if (startDate < currentDate) {
            errors = "Start date and time must be greater than current date and time";
        }
        if (endDate < currentDate) {
            errors = "End date and time must be greater than current date and time";
        }
        formData.Questions.forEach((question) => {
            if (!question.Marks) {
                errors = "Every question must be given marks";
            }
        });
        if (errors === "") {
            return true;
        } else {
            toast.error(errors);
            return false;
        }
    };

    const handleCreateEvaluation = (event) => {
        if (validate() === false) {
            return;
        }

        const postEvaluation = async () => {
            try {
                // from every formData.Questions, remove the Name field
                const questions = formData.Questions.map((question) => {
                    const { Name, ...rest } = question;
                    return rest;
                });
                formData.Questions = questions;
                console.log(formData);
                const response = await ApiCall("/professors/addEvaluation", "POST", formData);
                console.log(response.data);
                if (response.data.success) {
                    toast.success("Evaluation created successfully");
                    props.onHide();
                } else {
                    toast.error(response.data.message ? response.data.message : "Error adding question for evaluation");
                }
            } catch (err) {
                console.log(err);
                toast.error("Falied to create evaluation", err);
            }
        };
        postEvaluation();
    };
    let content;

    if (selectedOption === "Description") {
        content = (
            <Form>
                <p>Evaluation Name</p>
                <Form.Control
                    type="text"
                    name="Name"
                    id="inputPassword5"
                    value={formData.Name}
                    onChange={handleChange}
                    // aria-describedby="passwordHelpBlock"
                />

                <br />

                <p htmlFor="datetime">Select start date and time:</p>
                <input
                    type="datetime-local"
                    id="datetime"
                    value={formData.StartTime}
                    onChange={handleChange}
                    // onInput="removeAmPm(this)"
                    name="StartTime"
                />
                <br />
                <br />
                <p>Select end date and time:</p>

                <input
                    type="datetime-local"
                    id="endDateandtime"
                    value={formData.EndTime}
                    onChange={handleChange}
                    // onInput="removeAmPm(this)"
                    name="EndTime"
                />
                <br />
                <br />
                <p>Select Year:</p>
                {["radio"].map((type) => (
                    <div key={`inline-${type}`} className="mb-3">
                        <Form.Check
                            inline
                            label="First Year"
                            name="Year"
                            type={type}
                            id={`inline-${type}-1`}
                            value="First Year"
                            checked={formData.Year === "First Year"}
                            onChange={handleChange}
                        />
                        <Form.Check
                            inline
                            label="Second Year"
                            name="Year"
                            type={type}
                            id={`inline-${type}-2`}
                            value="Second Year"
                            checked={formData.Year === "Second Year"}
                            onChange={handleChange}
                        />
                        <Form.Check
                            inline
                            label="Third Year"
                            type={type}
                            name="Year"
                            id={`inline-${type}-3`}
                            value="Third Year"
                            checked={formData.Year === "Third Year"}
                            onChange={handleChange}
                        />
                        <Form.Check
                            inline
                            label="Fourth Year"
                            type={type}
                            name="Year"
                            id={`inline-${type}-3`}
                            value="Fourth Year"
                            checked={formData.Year === "Fourth Year"}
                            onChange={handleChange}
                        />
                    </div>
                ))}
                <p>Select Batches</p>
                {["checkbox"].map((type) => (
                    <div key={`inline-${type}`} className="mb-3">
                        {props.batches.map((batch, index) => {
                            // console.log(batch);
                            return (
                                <Form.Check
                                    key={index}
                                    inline
                                    label={batch}
                                    name={batch}
                                    type={type}
                                    id={`inline-${type}-${index}`}
                                    onChange={handleChange}
                                />
                            );
                        })}
                    </div>
                ))}
            </Form>
        );
    } else if (selectedOption === "Questions") {
        content = <QuestionTab formData={formData} setFormData={setFormData} />;
    } else {
        content = (
            <MarksTab
                Questions={formData.Questions}
                questions={questions}
                setQuestions={setQuestions}
                setFormData={setFormData}
            />
        );
    }

    return (
        <Modal {...props} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
            <Modal.Header style={{ border: "none" }} closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    <Nav className="modelnavtab" variant="tabs" defaultActiveKey="#">
                        <Nav.Item>
                            <Nav.Link
                                href="#"
                                active={selectedOption === "Description"}
                                onClick={() => setSelectedOption("Description")}
                            >
                                Details
                            </Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link
                                eventKey="link-2"
                                active={selectedOption === "Questions"}
                                onClick={() => setSelectedOption("Questions")}
                            >
                                Problems
                            </Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link
                                eventKey="link-2"
                                active={selectedOption === "Marks"}
                                onClick={() => setSelectedOption("Marks")}
                            >
                                Marks
                            </Nav.Link>
                        </Nav.Item>
                    </Nav>
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>{content}</Modal.Body>
            <Modal.Footer>
                {selectedOption === "Description" && (
                    <>
                        <Button onClick={() => handlePrevNext("Next")}>Next</Button>
                    </>
                )}
                {selectedOption === "Questions" && (
                    <>
                        <Button onClick={() => handlePrevNext("Prev")}>Prev</Button>
                        <Button onClick={() => handlePrevNext("Next")}>Next</Button>
                    </>
                )}
                {selectedOption === "Marks" && (
                    <>
                        <Button onClick={() => handlePrevNext("Prev")}>Prev</Button>

                        <Button onClick={handleCreateEvaluation}>Create</Button>
                    </>
                )}
                {/* <Button onClick={props.onHide}>Create</Button> */}
            </Modal.Footer>
        </Modal>
    );
};

export default CreateEvalModal;
