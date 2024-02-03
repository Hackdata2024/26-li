
const { readDB } = require("../db/mongoOperations");
const { QuestionSchema } = require("../db/schema");


async function fetchTestCases(problemId, institute) {
    let QuestionResponse = await readDB("QuestionBank", institute, { _id: problemId }, QuestionSchema);
    if (QuestionResponse.length > 0) {
        return QuestionResponse[0].TestCases;
    }
    else
        return [];
}

async function fetchSolutionCode(problemId, institute) {
    let QuestionResponse = await readDB("QuestionBank", institute, { _id: problemId }, QuestionSchema);
    if (QuestionResponse.length > 0)
        return QuestionResponse[0].SolutionCode;
    else
        return "";
}

async function fetchRandomGeneratorCode(problemId, institute) {
    
    let QuestionResponse = await readDB("QuestionBank", institute, { _id: problemId }, QuestionSchema);

    if (QuestionResponse.length > 0)
        return QuestionResponse[0].RandomTestCode;
    else
        return "";
}

module.exports = { fetchTestCases, fetchSolutionCode, fetchRandomGeneratorCode };