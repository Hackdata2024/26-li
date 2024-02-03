
const { hasAccess } = require("../Middleware/Auth")
const { readDB } = require("../db/mongoOperations")
const { professorsSchema } = require("../db/schema")

module.exports = (app) => {

    app.get("/professors/profile", hasAccess, (req, res) => {

        // console.log(req.decoded)

        readDB(req.decoded.loginType, req.decoded.institution, { Username: req.decoded.Username, Password: req.decoded.Password }, professorsSchema).then((result) => {

            // console.log(result)

            if (result.length == 1) {

                let thisProfessor = JSON.parse(JSON.stringify(result[0]))

                //remove password from the result object
                delete thisProfessor.password
                //add institution to the result object
                thisProfessor.institution = req.decoded.institution

                res.json({
                    success: true,
                    message: "Welcome to the profile",
                    data: thisProfessor
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