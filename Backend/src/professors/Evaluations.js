const { readDB, writeDB } = require("../db/mongoOperations");
const { EvaluationSchema } = require("../db/schema");
const { hasAccess, isProfessor } = require("../Middleware/Auth");
const { ObjectId } = require('mongodb');
const { professorsSchema } = require("../db/schema");
const { fetchQuestionDetails, fetchStudentDetails } = require("../other/Helperfunctions");

module.exports = (app) => {

    //this function will fetch all the details of the assignment like questions and students,it takes assignments array as input and returns the same array with details
    const fetchEvaluationsDetails = async (Evaluations, institution) => {

        let updatedEvaluations = JSON.parse(JSON.stringify(Evaluations));

        for (let i = 0; i < updatedEvaluations.length; i++) {

            let thisProfessor = await await readDB("Professors", institution, { _id: new ObjectId(updatedEvaluations[i].AssignedBy) }, professorsSchema);

            updatedEvaluations[i].AssignedBy = (thisProfessor.length > 0) ? thisProfessor[0] : {};


            for (let j = 0; j < updatedEvaluations[i].Questions.length; j++) {
                let thisQuestion = await fetchQuestionDetails(updatedEvaluations[i].Questions[j].QuestionId, institution);
                updatedEvaluations[i].Questions[j] = thisQuestion;
            }

            for (let j = 0; j < updatedEvaluations[i].SubmittedBy.length; j++) {
                let thisStudent = await fetchStudentDetails(updatedEvaluations[i].SubmittedBy[j].StudentId, institution);
                updatedEvaluations[i].SubmittedBy[j] = thisStudent;
            }
        }

        return updatedEvaluations;

    };


    app.get("/professors/myEvaluations", hasAccess, isProfessor, async (req, res) => {

        try {

            const thisProfessorEvaluations = await readDB("Evaluations", req.decoded.institution, { AssignedBy: new ObjectId(req.decoded._id) }, EvaluationSchema);
            const evaluationsWithDetails = await fetchEvaluationsDetails(thisProfessorEvaluations, req.decoded.institution);

            res.json({
                success: true,
                message: `Evaluations fetched successfully for ${req.decoded.Username} of college ${req.decoded.institution}!`,
                data: evaluationsWithDetails
            });

        }
        catch (err) {
            res.json({
                success: false,
                message: `Failed to fetch evaluations of ${req.decoded.Username} of college ${req.decoded.institution} error : ${err}`
            });
        }
    });

    app.post('/professors/addEvaluation', hasAccess, isProfessor, async (req, res) => {

        let thisEvaluation = req.body;
        thisEvaluation.AssignedBy = req.decoded._id;
        thisEvaluation.SubmittedBy = [];
        thisEvaluation.DurationinSeconds = parseInt(new Date(req.body.EndTime) - new Date(req.body.StartTime));
        //convert to seconds
        thisEvaluation.DurationinSeconds = thisEvaluation.DurationinSeconds / 1000;

        console.log(thisEvaluation);

        try {
            await writeDB("Evaluations", req.decoded.institution, thisEvaluation, EvaluationSchema);
            res.json({
                success: true,
                message: `Evaluation added successfully for ${req.decoded.Username} of college ${req.decoded.institution}!`,
            });
        }
        catch (err) {
            res.json({
                success: false,
                message: `Failed to add evaluation of ${req.decoded.Username} of college ${req.decoded.institution} error : ${err}`
            });
        }
    });
}