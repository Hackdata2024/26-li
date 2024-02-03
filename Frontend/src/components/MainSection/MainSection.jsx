import React, { useEffect, useState } from "react";

import Assignments from "../../pages/Professor/Assignments/Assignments";
import Questions from "../../pages/Professor/Questions/Questions";

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
        if (section === "evals") return <></>;
        else if (section === "assignments") return <></>;
    } else if (user === "professor") {
        if (section === "assignments") return <Assignments />;
        else if (section === "addQuestion") return <></>;
        else if (section === "evals") return <></>;
        else if (section === "Questions") return <Questions />;
    }
};

export default MainSection;
