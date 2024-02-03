import React, { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import QuestionTab from "./QuestionTab";
import ApiCall from "../../../util/ApiCall";
import ListGroup from "react-bootstrap/ListGroup";
import { toast } from "react-toastify";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const CreateAssignmentModal = (props) => {
    const [selectedOption, setSelectedOption] = useState("Description");
    const [formData, setFormData] = useState({
        Year: "",
        Batches: [],
        Questions: [],
        DueTimestamp: "",
        AssignmentName: "",
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Simulate loading delay
                await new Promise((resolve) => setTimeout(resolve, 1000));

                const response = await ApiCall("/professors/myQuestions", "GET", {});
                console.log(response.data.data);
                setFormData((prevData) => ({
                    ...prevData,
                    Questions: response.data.data.map((question) => question._id),
                }));
            } catch (error) {
                console.error("Error during fetching questions:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

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
        if (!formData.DueTimestamp) {
            errors = "Due Date and Time is required";
        }
        if (!formData.AssignmentName) {
            errors = "Assignment name is required";
        }
        if (errors === "") {
            return true;
        } else {
            toast.error(errors);
            return false;
        }
    };

    const handleCreateAssignment = (event) => {
        if (validate() === false) {
            return;
        }

        // props.onHide();
        const postAssignment = async () => {
            try {
                const response = await ApiCall("/professors/addAssignment", "POST", formData);
                console.log(response.data);
                if (response.data.success) {
                    toast.success("Assignment created successfully");
                } else {
                    toast.error(response.data.message ? response.data.message : "Error adding question");
                }
            } catch (error) {
                toast.error(error);
            }
        };
        postAssignment();
    };

    let content;

    if (loading) {
        content = (
            <SkeletonTheme color="#e0e0e0" highlightColor="#f5f5f5">
                <div
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                        marginBottom: "100px",
                    }}
                >
                    <ListGroup style={{ color: "black", height: "90px", width: "100%", border: "none" }}>
                        <ListGroup.Item>
                            <Skeleton width={150} height={20} />
                            <Skeleton width="100%" height={30} />
                            <br />
                            <Skeleton width={150} height={20} />
                            <Skeleton width={250} height={25} />
                            <br />
                            <Skeleton width={150} height={20} />
                            <Skeleton width="70%" height={20} />
                            <Skeleton width={300} height={20} />
                            <Skeleton width="80%" height={20} />
                        </ListGroup.Item>
                    </ListGroup>
                </div>
                <br />
                <br />
                <br />
                <br />
            </SkeletonTheme>
        );
    } else {
        if (selectedOption === "Description") {
            content = (
                <Form>
                    <p>Assignment Name</p>
                    <Form.Control
                        type="text"
                        name="AssignmentName"
                        id="inputPassword5"
                        value={formData.AssignmentName}
                        onChange={handleChange}
                        aria-describedby="passwordHelpBlock"
                    />

                    <br />

                    <p htmlFor="datetime">Select a date and time:</p>
                    <input
                        type="datetime-local"
                        id="datetime"
                        value={formData.DueTimestamp}
                        onChange={handleChange}
                        name="DueTimestamp"
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
        } else {
            content = <QuestionTab formData={formData} setFormData={setFormData} />;
        }
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
                                Description
                            </Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link
                                eventKey="link-2"
                                active={selectedOption === "Questions"}
                                onClick={() => setSelectedOption("Questions")}
                            >
                                Questions
                            </Nav.Link>
                        </Nav.Item>
                    </Nav>
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>{content}</Modal.Body>
            <Modal.Footer>
                {loading ? (
                    // Display loading skeleton for buttons
                    <>
                        <SkeletonTheme color="#e0e0e0" highlightColor="#f5f5f5">
                            <Skeleton width={80} height={40} />
                            <Skeleton width={80} height={40} />
                        </SkeletonTheme>
                    </>
                ) : (
                    <>
                        {selectedOption === "Description" && (
                            <>
                                <Button onClick={() => handlePrevNext("Next")}>Next</Button>
                            </>
                        )}
                        {selectedOption === "Batch" && (
                            <>
                                <Button onClick={() => handlePrevNext("Prev")}>Prev</Button>
                                <Button onClick={() => handlePrevNext("Next")}>Next</Button>
                            </>
                        )}
                        {selectedOption === "Questions" && (
                            <>
                                <Button onClick={() => handlePrevNext("Prev")}>Prev</Button>
                                <Button onClick={handleCreateAssignment}>Create</Button>
                            </>
                        )}
                    </>
                )}
            </Modal.Footer>
        </Modal>
    );
};

export default CreateAssignmentModal;
