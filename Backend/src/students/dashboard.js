const { hasAccess, isStudent } = require("../Middleware/Auth")
const { readDB } = require("../db/mongoOperations")
const { StudentsSchema } = require("../db/schema")

module.exports = (app) => {

    app.get("/students/profile", hasAccess, isStudent, (req, res) => {

        // console.log(req.decoded)

        readDB(req.decoded.loginType, req.decoded.institution, { Username: req.decoded.Username, Password: req.decoded.Password }, StudentsSchema).then((result) => {

            // console.log(result)

            if (result.length == 1) {
                let thisStudent = JSON.parse(JSON.stringify(result[0]))
                //remove password from the result object
                delete thisStudent.Password
                //add institution to the result object
                thisStudent.institution = req.decoded.institution

                res.json({
                    success: true,
                    message: "Welcome to the profile",
                    data: thisStudent
                })

            } else {

                res.json({
                    success: false,
                    message: `Error while reading the database ${req.decoded.loginType} , Collection ${req.decoded.institution}, No such user found!`
                })

            }
        }).catch((err) => {

            res.json({
                success: false,
                message: `Error while reading the database ${req.decoded.loginType} , Collection ${req.decoded.institution}, ${err}`
            })

        })
    })
}