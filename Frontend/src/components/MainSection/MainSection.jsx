import React, { useEffect, useState } from "react";

import AddQuestions from "../../pages/Professor/AddQuestions/AddQuestions";
import Evaluations from "../../pages/Professor/Evaluations/Evaluations";
import Assignments from "../../pages/Professor/Assignments/Assignments";
import Questions from "../../pages/Professor/Questions/Questions";

import StudentAssignments from "../../pages/Student/Assignments/Assignments";
import StudentEvaluations from "../../pages/Student/Evaluations/Evaluations";
import { useParams } from "react-router-dom";

const MainSection = () => {
    const [user, setUser] = useState("");
    const [section, setSection] = useState("");
    const { id } = useParams();

    useEffect(() => {
        console.log("Inside MainSection useEffect");
        var currentURL = window.location.href;
        currentURL = currentURL.split("/");
        setUser(currentURL[currentURL.length - 2]);
        setSection(currentURL[currentURL.length - 1]);
    }, [id]);

    if (user === "student") {
        if (section === "evals") return <StudentEvaluations />;
        else if (section === "assignments") return <StudentAssignments />;
    } else if (user === "professor") {
        if (section === "assignments") return <Assignments />;
        else if (section === "addQuestion") return <AddQuestions />;
        else if (section === "evals") return <Evaluations />;
        else if (section === "Questions") return <Questions />;
    }
};

export default MainSection;
