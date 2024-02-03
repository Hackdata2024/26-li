import React, { useEffect } from "react";
import { useState } from "react";
import ListGroup from "react-bootstrap/ListGroup";
import Skeleton from "react-loading-skeleton";

const MarksTab = (props) => {
    const [questions, setQuestions] = useState([]);

    useEffect(() => {
        setQuestions(props.Questions);
    }, [props.Questions]);

    const renderContent = () => {
        return (
            <>
                {questions.map((question, index) => (
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
                ))}
            </>
        );
    };

    return <ListGroup>{questions.length !== 0 ? renderContent() : <Skeleton height={50} count={3} />}</ListGroup>;
};

export default MarksTab;
