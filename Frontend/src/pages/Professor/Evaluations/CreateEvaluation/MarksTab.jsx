import React, { useEffect } from "react";
import { useState } from "react";
import ListGroup from "react-bootstrap/ListGroup";

const MarksTab = (props) => {
    const [questions, setQuestions] = useState([]);
    useEffect(() => {
        setQuestions(props.Questions);
    }, [props.Questions]);
    return (
        <ListGroup>
            {questions.length !== 0 ? (
                <>
                    {questions.map((question, index) => {
                        return (
                            <ListGroup.Item key={index} className="my-1 d-flex flex-column">
                                {question.Name}
                                <input
                                    type="number"
                                    placeholder="Enter Marks"
                                    value={question.Marks}
                                    onChange={(event) => {
                                        const updatedQuestions = [...props.Questions];
                                        updatedQuestions[index].Marks = event.target.value;
                                        props.setFormData((prevFormData) => ({
                                            ...prevFormData,
                                            Questions: updatedQuestions,
                                        }));
                                    }}
                                    style={{ width: "30%" }}
                                />
                            </ListGroup.Item>
                        );
                    })}
                </>
            ) : (
                <ListGroup.Item>No Questions Selected</ListGroup.Item>
            )}
        </ListGroup>
    );
};

export default MarksTab;
