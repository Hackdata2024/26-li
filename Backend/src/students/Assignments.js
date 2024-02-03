const { hasAccess, isStudent } = require("../Middleware/Auth");
const { readDB } = require("../db/mongoOperations");
const { assignmentSchema, professorsSchema } = require("../db/schema");
const { fetchQuestionDetails } = require("../other/Helperfunctions");
const { ObjectId } = require("mongodb");


module.exports = (app) => {

    //this API returns the list of all assignments assigned to this student 
    app.get("/students/myAssignments", hasAccess, isStudent, async (req, res) => {

        let response = await readDB("Assignments", req.decoded.institution, { Batches: { $in: req.decoded.DB.Batch }, Year: req.decoded.DB.Year }, assignmentSchema)
        const thisStudentAssignments = JSON.parse(JSON.stringify(response))

        //search in SubmittedBy array for the student id and based on that set the Submitted flag to true
        for (let i = 0; i < thisStudentAssignments.length; i++) {
            thisStudentAssignments[i].Submitted = false;
            for (let j = 0; j < thisStudentAssignments[i].SubmittedBy.length; j++) {
                if (thisStudentAssignments[i].SubmittedBy[j] == req.decoded._id) {
                    thisStudentAssignments[i].Submitted = true;
                    break;
                }
            }
        }

        //remove the unnecessary fields from the response
        for (let i = 0; i < thisStudentAssignments.length; i++) {
            delete thisStudentAssignments[i].SubmittedBy;
            delete thisStudentAssignments[i].Questions;
            delete thisStudentAssignments[i].Batches;
            delete thisStudentAssignments[i].Year;
        }


        res.json({
            success: true,
            message: `Assignments fetched successfully for ${req.decoded.Username} of college ${req.decoded.institution}!`,
            data: thisStudentAssignments
        });

    });

    //this API returns the details of the assignment with the given id
    app.get("/students/getAssignment/:id", hasAccess, isStudent, async (req, res) => {

        let response = await readDB("Assignments", req.decoded.institution, { _id: new ObjectId(req.params.id), Batches: { $in: req.decoded.DB.Batch }, Year: req.decoded.DB.Year }, assignmentSchema)

        let thisAssignment = JSON.parse(JSON.stringify(response))

        if (thisAssignment.length == 1) {

            for (let i = 0; i < thisAssignment[0].Questions.length; i++) {
                let thisQuestion = await fetchQuestionDetails(thisAssignment[0].Questions[i], req.decoded.institution)
                thisAssignment[0].Questions[i] = thisQuestion
            }

            // Fetch the professor details for the assignment PostedBy field
            let thisProfessor = await readDB("Professors", req.decoded.institution, { _id: new ObjectId(thisAssignment[0].PostedBy) }, professorsSchema)
            thisProfessor = JSON.parse(JSON.stringify(thisProfessor))

            if (thisProfessor.length > 0) {
                delete thisProfessor[0].Password;
                thisAssignment[0].PostedBy = thisProfessor[0];
            }
            else {
                thisAssignment[0].PostedBy = {};
            }

            res.json({
                success: true,
                message: `Assignment fetched successfully for ${req.decoded.Username} of college ${req.decoded.institution}!`,
                data: thisAssignment[0]
            });
        } else {
            res.json({
                success: false,
                message: `Failed to fetch assignment of ${req.decoded.Username} of college ${req.decoded.institution}, either Assignment id is invalid or You are not allowed to access it !`
            });
        }

    });

}