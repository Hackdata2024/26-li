import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useState } from "react";
import ShowQuestionPreview from "./ShowQuestionPreview";

const QuestionModel = (props) => {
    console.log(props);
    console.log(props.question);
    return (
        <Modal {...props} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
            <Modal.Header closeButton>
                {/* <Modal.Title id="contained-modal-title-vcenter" style={{ textAlign: "center", backgroundColor: "red" }}> */}
                {/* Question Preview */}
                <h3 style={{ width: "100%", textAlign: "center" }}>Question Preview</h3>
                {/* </Modal.Title> */}
            </Modal.Header>
            <Modal.Body>
                <ShowQuestionPreview question={props.question} />
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={props.onHide}>Close</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default QuestionModel;
