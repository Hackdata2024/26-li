const { isStudent } = require("../Middleware/Auth")

module.exports = (app) => {

    app.post("/submitAssignment/:id", hasAccess, isStudent, async (req, res) => {

        console.log(req.body);

    })

    app.post("/submitEvaluation/:id", hasAccess, isStudent, async (req, res) => {
        
        console.log(req.body);
        
    })
}