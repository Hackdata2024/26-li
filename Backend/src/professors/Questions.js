
const { hasAccess, isProfessor } = require("../Middleware/Auth");
const { readDB, writeDB } = require("../db/mongoOperations");
const { ObjectId } = require('mongodb');
const { QuestionSchema } = require("../db/schema");

module.exports = (app) => {

    app.get("/professors/myQuestions", hasAccess, isProfessor, async (req, res) => {

        try {

            const thisProfessorQuestions = await readDB("QuestionBank", req.decoded.institution, { CreatedBy: new ObjectId(req.decoded._id) }, QuestionSchema);

            res.json({
                success: true,
                message: `Questions fetched successfully for ${req.decoded.Username} of college ${req.decoded.institution}!`,
                data: thisProfessorQuestions
            });

        }
        catch (err) {
            res.json({
                success: false,
                message: `Failed to fetch questions of ${req.decoded.Username} of college ${req.decoded.institution} error : ${err}`
            });
        }

    });

    app.get("/professors/allQuestions", hasAccess, isProfessor, async (req, res) => {

        try {
            const allQuestions = await readDB("QuestionBank", req.decoded.institution, {}, QuestionSchema);
            res.json({
                success: true,
                message: `All questions fetched successfully of college ${req.decoded.institution}!`,
                data: allQuestions
            });
        }
        catch (err) {
            res.json({
                success: false,
                message: `Failed to fetch all questions of college ${req.decoded.institution} error : ${err}`
            });
        }

    });

    // Your route handling the POST request
    app.post('/professors/addQuestion', hasAccess, isProfessor, async (req, res) => {

        // console.log(req.body)
        let thisQuestion = req.body;
        thisQuestion.CreatedBy = req.decoded._id;

        try {
            await writeDB("QuestionBank", req.decoded.institution, thisQuestion, QuestionSchema);
            res.json({
                success: true,
                message: `Question added successfully for ${req.decoded.Username} of college ${req.decoded.institution}!`,
            });
        }
        catch (err) {
            res.json({
                success: false,
                message: `Failed to add question of ${req.decoded.Username} of college ${req.decoded.institution} error : ${err}`
            });
        }
    });
}