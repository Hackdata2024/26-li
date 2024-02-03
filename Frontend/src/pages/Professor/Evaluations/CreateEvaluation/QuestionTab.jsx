import React, { useEffect } from "react";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import ApiCall from "../../../../util/ApiCall";
import { useState } from "react";
import Form from "react-bootstrap/Form";
import ListGroup from "react-bootstrap/ListGroup";
import Skeleton from "react-loading-skeleton";

const QuestionTab = (props) => {
    const [myQuestions, setMyQuestions] = useState([]);
    const [allQuestions, setAllQuestions] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response1 = await ApiCall("/professors/myQuestions", "GET", {});
                const response2 = await ApiCall("/professors/allQuestions", "GET", {});
                console.log(response1.data.data);
                console.log(response2.data.data);
                console.log(props.formData);
                setMyQuestions(response1.data.data);
                setAllQuestions(response2.data.data);
                setLoading(false); // Set loading to false once data is fetched
            } catch (error) {
                console.error("Error during fetching questions:", error);
            }
        };

        fetchData();
    }, []);

    const handleChange = (event, index, identifier) => {
        const checked = event.target.checked;
        if (identifier === "myQuestions") {
            const QuestionId = myQuestions[index]._id;
            const Name = myQuestions[index].QuestionName;
            if (checked) {
                const updatedQuestions = [
                    ...props.formData.Questions,
                    { QuestionId: QuestionId, Marks: "", Name: Name },
                ];
                props.setFormData((prevFormData) => ({
                    ...prevFormData,
                    Questions: updatedQuestions,
                }));
            } else {
                const updatedQuestions = [...props.formData.Questions];
                const index = updatedQuestions.findIndex((question) => question.QuestionId === QuestionId);
                if (index > -1) {
                    updatedQuestions.splice(index, 1);
                }
                props.setFormData((prevFormData) => ({
                    ...prevFormData,
                    Questions: updatedQuestions,
                }));
            }
        } else {
            const QuestionId = allQuestions[index]._id;
            const Name = allQuestions[index].QuestionName;
            if (checked) {
                const updatedQuestions = [
                    ...props.formData.Questions,
                    { QuestionId: QuestionId, Marks: "", Name: Name },
                ];
                props.setFormData((prevFormData) => ({
                    ...prevFormData,
                    Questions: updatedQuestions,
                }));
            } else {
                const updatedQuestions = [...props.formData.Questions];
                const index = updatedQuestions.findIndex((question) => question.QuestionId === QuestionId);
                if (index > -1) {
                    updatedQuestions.splice(index, 1);
                }
                props.setFormData((prevFormData) => ({
                    ...prevFormData,
                    Questions: updatedQuestions,
                }));
            }
        }
        console.log(props.formData.Questions);
    };

    const renderQuestions = (questions, identifier) => {
        return (
            <ListGroup>
                {questions.map((question, index) => {
                    var check = false;
                    if (props.formData.Questions.some((item) => item.QuestionId === question._id)) {
                        check = true;
                    } else {
                        check = false;
                    }
                    return (
                        <div
                            key={index}
                            style={{
                                display: "flex",
                            }}
                        >
                            <ListGroup.Item className="w-100 d-flex my-1">
                                <Form>
                                    <div
                                        className="mb-3"
                                        style={{
                                            marginRight: "15px",
                                        }}
                                    >
                                        <Form.Check
                                            type="checkbox"
                                            checked={check}
                                            onChange={(event) => handleChange(event, index, identifier)}
                                        />
                                    </div>
                                </Form>
                                <p>{question.QuestionName}</p>
                            </ListGroup.Item>
                        </div>
                    );
                })}
            </ListGroup>
        );
    };

    return (
        <Tabs defaultActiveKey="My Questions" id="uncontrolled-tab-example" className="mb-3">
            <Tab eventKey="My Questions" title="My Questions">
                {loading ? <Skeleton height={50} count={5} /> : renderQuestions(myQuestions, "myQuestions")}
            </Tab>
            <Tab eventKey="All Questions" title="All Questions">
                {loading ? <Skeleton height={50} count={5} /> : renderQuestions(allQuestions, "allQuestions")}
            </Tab>
        </Tabs>
    );
};

export default QuestionTab;
