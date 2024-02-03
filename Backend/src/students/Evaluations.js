
const { EvaluationSchema } = require("../db/schema");
const { hasAccess, isStudent } = require("../Middleware/Auth");
const { readDB } = require("../db/mongoOperations");
const { fetchQuestionDetails } = require("../other/Helperfunctions");


module.exports = (app) => {

    app.get("/students/myEvaluations", hasAccess, isStudent, async (req, res) => {

        try {
            let response = await readDB("Evaluations", req.decoded.institution, { Year: req.decoded.DB.Year, Batches: { $in: req.decoded.DB.Batch } }, EvaluationSchema);
            const thisStudentEvaluations = JSON.parse(JSON.stringify(response));

            //search in SubmittedBy array for the student id and based on that set the Submitted flag to true
            for (let i = 0; i < thisStudentEvaluations.length; i++) {
                thisStudentEvaluations[i].Submitted = false;
                for (let j = 0; j < thisStudentEvaluations[i].SubmittedBy.length; j++) {
                    if (thisStudentEvaluations[i].SubmittedBy[j].StudentId == req.decoded._id) {
                        thisStudentEvaluations[i].Submitted = true;
                        break;
                    }
                }
            }

            //remove the unnecessary fields from the response
            for (let i = 0; i < thisStudentEvaluations.length; i++) {
                delete thisStudentEvaluations[i].SubmittedBy;
                delete thisStudentEvaluations[i].Questions;
                delete thisStudentEvaluations[i].Batches;
                delete thisStudentEvaluations[i].Year;
            }


            res.json({
                success: true,
                message: `Evaluations fetched successfully for ${req.decoded.Username} of college ${req.decoded.institution}!`,
                data: thisStudentEvaluations
            });

        }
        catch (err) {
            res.json({
                success: false,
                message: `Failed to fetch evaluations of ${req.decoded.Username} of college ${req.decoded.institution} error : ${err}`
            });
        }

    });

    app.get("/students/getEvaluation/:id", hasAccess, isStudent, async (req, res) => {

        try {
            let response = await readDB("Evaluations", req.decoded.institution, { _id: req.params.id, Year: req.decoded.DB.Year, Batches: { $in: req.decoded.DB.Batch } }, EvaluationSchema);
            let thisStudentEvaluation = JSON.parse(JSON.stringify(response));

            //search in SubmittedBy array for the student id and based on that set the Submitted flag to true
            thisStudentEvaluation[0].Submitted = false;

            for (let j = 0; j < thisStudentEvaluation[0].SubmittedBy.length; j++) {
                if (thisStudentEvaluation[0].SubmittedBy[j].StudentId == req.decoded._id) {
                    thisStudentEvaluation[0].Submitted = true;
                    break;
                }
            }

            for(let i=0;i<thisStudentEvaluation[0].Questions.length;i++){
                let questionDetails = await fetchQuestionDetails(thisStudentEvaluation[0].Questions[i].QuestionId,req.decoded.institution);
                thisStudentEvaluation[0].Questions[i] = questionDetails;
            }

            //remove the unnecessary fields from the response
            delete thisStudentEvaluation[0].SubmittedBy;
            delete thisStudentEvaluation[0].Batches;
            delete thisStudentEvaluation[0].Year;

            res.json({
                success: true,
                message: `Evaluation fetched successfully for ${req.decoded.Username} of college ${req.decoded.institution}!`,
                data: thisStudentEvaluation[0]
            });

        }
        catch (err) {
            res.json({
                success: false,
                message: `Failed to fetch evaluation of ${req.decoded.Username} of college ${req.decoded.institution} error : ${err}`
            });
        }

    });

}