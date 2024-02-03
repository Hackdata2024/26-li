
const { EvaluationSchema } = require("../db/schema");
const { hasAccess, isStudent } = require("../Middleware/Auth");
const { readDB } = require("../db/mongoOperations");


module.exports = (app) => {

    app.get("/students/myEvaluations", hasAccess, isStudent, async (req, res) => {

        try {
            let response = await readDB("Evaluations", req.decoded.institution, { Year : req.decoded.DB.Year , Batches : { $in: req.decoded.DB.Batch } }, EvaluationSchema);
            const thisStudentEvaluations = JSON.parse(JSON.stringify(response));

            //search in SubmittedBy array for the student id and based on that set the Submitted flag to true
            for(let i=0;i<thisStudentEvaluations.length;i++){
                thisStudentEvaluations[i].Submitted = false;
                for(let j=0;j<thisStudentEvaluations[i].SubmittedBy.length;j++){
                    if(thisStudentEvaluations[i].SubmittedBy[j].StudentId == req.decoded._id){
                        thisStudentEvaluations[i].Submitted = true;
                        break;
                    }
                }
            }

            //remove the unnecessary fields from the response
            for(let i=0;i<thisStudentEvaluations.length;i++){
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

}