const { hasAccess, isProfessor } = require("../Middleware/Auth");
const { readDB, writeDB, deleteDB } = require("../db/mongoOperations");
const { assignmentSchema } = require("../db/schema");
const { fetchAssignmentDetails } = require("../other/Helperfunctions");
const { ObjectId } = require("mongodb");



module.exports = (app) => {

    app.get("/professors/myAssignments", hasAccess, isProfessor, async (req, res) => {

        console.log(`Recieved request to fetch assignments for ${req.decoded.Username} of college ${req.decoded.institution}!`);

        try {
            let thisProfessorAssignments = await readDB("Assignments", req.decoded.institution, { PostedBy: new ObjectId(req.decoded._id) }, assignmentSchema);
            console.log(thisProfessorAssignments);
            const assignmentsWithDetails = await fetchAssignmentDetails(thisProfessorAssignments, req.decoded.institution);
            res.json({
                success: true,
                message: `Assignments fetched successfully for ${req.decoded.Username} of college ${req.decoded.institution}!`,
                data: assignmentsWithDetails
            });
        } catch (err) {
            res.json({
                success: false,
                message: `Failed to fetch assignments of ${req.decoded.Username} of college ${req.decoded.institution} error : ${err}`
            });
        }
    });

    app.get("/professors/allAssignments", hasAccess, isProfessor, async (req, res) => {

        console.log(`Recieved request to fetch all assignments for ${req.decoded.Username} of college ${req.decoded.institution}!`);

        try {
            const allAssignments = await readDB("Assignments", req.decoded.institution, {}, assignmentSchema);
            const assignmentsWithDetails = await fetchAssignmentDetails(allAssignments, req.decoded.institution);

            res.json({
                success: true,
                message: `Assignments fetched successfully for ${req.decoded.Username} of college ${req.decoded.institution}!`,
                data: assignmentsWithDetails
            });
        } catch (err) {
            res.json({
                success: false,
                message: `Failed to fetch all assignments of college ${req.decoded.institution} error : ${err}`
            });
        }
    });

    app.post('/professors/addAssignment', hasAccess, isProfessor, async (req, res) => {

        console.log(`Recieved request to add assignment with details: `)
        console.log(req.body);

        let thisAssignment = req.body;
        thisAssignment.PostedBy = req.decoded._id;
        thisAssignment.College = req.decoded.institution;
        thisAssignment.PostedOn = new Date();

        try {
            await writeDB("Assignments", req.decoded.institution, thisAssignment, assignmentSchema);
            res.json({
                success: true,
                message: `Assignment added successfully for ${req.decoded.Username} of college ${req.decoded.institution}!`,
            });
        }
        catch (err) {

            if (err.code == 11000) {
                res.json({
                    success: false,
                    message: `Assignment already exists with the same title!`
                });
                return;
            }
            else {
                res.json({
                    success: false,
                    message: `Failed to add assignment of ${req.decoded.Username} of college ${req.decoded.institution} error : ${err}`
                });
            }
        }
    })

    app.delete('/professors/deleteAssignment/:id', hasAccess, isProfessor, async (req, res) => {
        console.log(`Recieved request to delete assignment with id: ${req.params.id} for ${req.decoded.Username} of college ${req.decoded.institution}!`);
        try {
            let dbResponse = await readDB("Assignments", req.decoded.institution, { _id: new ObjectId(req.params.id), PostedBy: req.decoded._id }, assignmentSchema)
            if (dbResponse.length == 0) {
                res.json({
                    success: false,
                    message: `Assignment not found for ${req.decoded.Username} of college ${req.decoded.institution} with id ${req.params._id}!`
                });
                return;
            }
            else {
                await deleteDB("Assignments", req.decoded.institution, { _id: new ObjectId(req.params.id), PostedBy: req.decoded._id}, assignmentSchema);
                res.json({
                    success: true,
                    message: `Assignment deleted successfully for ${req.decoded.Username} of college ${req.decoded.institution} with id ${req.params._id}!`
                });
            }
        }
        catch (err) {
            res.json({
                success: false,
                message: `Failed to delete assignment of ${req.decoded.Username} of college ${req.decoded.institution} with id ${req.params._id} error : ${err}`
            });
        }
        
    });
};
