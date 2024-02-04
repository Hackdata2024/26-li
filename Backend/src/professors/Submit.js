const { hasAccess, isStudent } = require("../Middleware/Auth");
const { writeDB, updateDB } = require("../db/mongoOperations");
const { assignmentSchema, SubmitAssignmentsSchema } = require("../db/schema");

module.exports = (app) => {

    // Questions 
    // AssigmentID 
    app.post("/submitAssignment", hasAccess, isStudent, async (req, res) => {

        console.log(req.body);


        let Submission = {
            AssignmentId: req.body.AssigmentID,
            StudentId: req.decoded._id,
            SubmittedOn: new Date(),
            Submission: req.body.Questions
        }

        console.log(Submission);

        //get the Assignment from assignment Id
        //Push the student submission to the SubmittedBy array

        updateDB("Assignments", req.decoded.institution, { _id: req.body.AssigmentID }, { $push: { SubmittedBy: req.decoded._id } }, assignmentSchema).then((result) => {

            //write the submission to the database
            writeDB("AssignmentSubmissions", req.decoded.institution, Submission, SubmitAssignmentsSchema).then((result) => {
                res.json({
                    success: true,
                    message: "Assignment Submitted Successfully!"
                })
            }).catch((err) => {
                console.log(err);
                res.json({
                    success: false,
                    message: `Error while writing the Submission, Error: ${err}`
                })
            })

        }).catch((err) => {
            console.log(err);
            res.json({
                success: false,
                message: `Error while updating the Assignment, Error: ${err}`
            })
        })
    })

    app.post("/submitEvaluation", hasAccess, isStudent, async (req, res) => {

        console.log(req.body);

        let Evaluation = {
            AssignmentId: req.body.AssigmentID,
            StudentId: req.decoded._id,
            SubmittedOn: new Date(),
            Submission: req.body.Questions
        }


    })
}