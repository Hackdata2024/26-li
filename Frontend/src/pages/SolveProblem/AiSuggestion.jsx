import React, { useState, useEffect } from "react";
import ApiCall from "../../util/ApiCall";

const AiSuggestion = (props) => {
    const [suggeston, setSuggestion] = useState("");
    useEffect(() => {
        const getAiSuggestion = async () => {
            try {
                const data = {
                    code: props.questionData.Code,
                    problem: props.questionData.ProblemStatement,
                };
                console.log(props.result);
                if (props.result === "Accepted") {
                    const response = await ApiCall("/GetCodeSuggestions", "POST", data);
                    console.log(response.data);
                    setSuggestion(response.data);
                } else {
                    const response = await ApiCall("/GetErrorSuggestions", "POST", data);
                    console.log(response.data);
                    setSuggestion(response.data);
                }
            } catch (err) {
                console.log(err);
            }
        };
        getAiSuggestion();
    }, []);

    return <p>{suggeston}</p>;
};

export default AiSuggestion;
