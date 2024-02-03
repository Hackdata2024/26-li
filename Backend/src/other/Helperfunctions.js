const { readDB } = require("../db/mongoOperations.js");
const { StudentsSchema, QuestionSchema, professorsSchema } = require("../db/schema.js");
const { ObjectId } = require("mongodb");


const fetchStudentDetails = async (studentId, institution) => {
    try {
        const thisStudent = await readDB("Students", institution, { _id: new ObjectId(studentId) }, StudentsSchema);
        if (thisStudent.length > 0) {
            delete thisStudent[0].password;
            return thisStudent[0];
        }
        return {};
    } catch (err) {
        console.log(`Error in fetching student ${studentId} error : ${err}`);
        return {};
    }
};

const fetchQuestionDetails = async (questionId, institution) => {
    try {
        const thisQuestion = await readDB("QuestionBank", institution, { _id: new ObjectId(questionId) }, QuestionSchema);
        return thisQuestion.length > 0 ? thisQuestion[0] : {};
    } catch (err) {
        console.log(`Error in fetching Question ${questionId} error : ${err}`);
        return {};
    }
};

const fetchProfessorDetails = async (professorId, institution) => {
    try {
        let thisProfessor = await readDB("Professors", institution, { _id: new ObjectId(professorId) }, professorsSchema);
        thisProfessor = JSON.parse(JSON.stringify(thisProfessor));
        if (thisProfessor.length > 0) {
            delete thisProfessor[0].Password;
            return thisProfessor[0];
        }
        return {};
    } catch (err) {
        console.log(`Error in fetching Professor ${professorId} error : ${err}`);
        return {};
    }
};

//this function will fetch all the details of the assignment like questions and students,it takes assignments array as input and returns the same array with details
const fetchAssignmentDetails = async (assignments, institution) => {
    // Create a copy of the assignments array
    const updatedAssignments = JSON.parse(JSON.stringify(assignments));

    console.log("inside fetch assignments ")
    console.log(institution)
    console.log(updatedAssignments);
    console.log("===");

    for (let i = 0; i < updatedAssignments.length; i++) {
        console.log("inside loop")

        updatedAssignments[i].PostedBy = await fetchProfessorDetails(updatedAssignments[i].PostedBy, institution);

        for (let j = 0; j < updatedAssignments[i].Questions.length; j++) {
            let thisQuestion = await fetchQuestionDetails(updatedAssignments[i].Questions[j], institution);
            updatedAssignments[i].Questions[j] = thisQuestion;
        }

        for (let j = 0; j < updatedAssignments[i].SubmittedBy.length; j++) {
            let thisStudent = await fetchStudentDetails(updatedAssignments[i].SubmittedBy[j], institution);
            updatedAssignments[i].SubmittedBy[j] = thisStudent;
        }
    }
    return updatedAssignments;
};

module.exports = {
    fetchAssignmentDetails,
    fetchQuestionDetails,
    fetchStudentDetails
}