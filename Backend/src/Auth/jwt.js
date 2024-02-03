const jwt = require('jsonwebtoken');
const { readDB } = require("../db/mongoOperations");
const { StudentsSchema, professorsSchema } = require('../db/schema');

module.exports = (app) => {

    app.post("/login", (req, res) => {
        console.log(`Recieved request to login with Username: ${req.body.Username} and Password: ${req.body.Password} and institution: ${req.body.institution} and loginType: ${req.body.loginType}`)

        const { Username, Password, institution, loginType } = req.body;

        const requiredFields = ['loginType', 'Username', 'Password', 'institution'];

        for (const field of requiredFields) {
            if (req.body[field] === undefined) {
                return res.json({
                    success: false,
                    message: `Login failed, ${field} not recieved!`
                });
            }
        }

        //LoginType can be = "Student" or "Professor"

        //if login type is not student or professor
        if (!["Students", "Professors"].includes(loginType)) {
            res.json({
                success: false,
                message: `Login failed, invalid Login Type ${loginType}, it should be either Students or Professors`
            })
            return;
        }

        //institution can be = any institution name
        //username and password are the credentials entered by the user

        let SchemaToBeUsed = (loginType == "Students") ? StudentsSchema : professorsSchema

        readDB(loginType, institution, { Username: Username, Password: Password }, SchemaToBeUsed).then((result) => {

            if (result.length == 1) {

                const payload = {
                    Username: Username,
                    Password: Password,
                    loginType: loginType,
                    institution: institution,
                    _id: result[0]._id,
                    DB: result[0]
                }

                console.log("Payload : ")
                console.log(payload);
                const secretKey = process.env.JWT_SECRET_KEY;
                const token = jwt.sign(payload, secretKey);

                console.log('Generated Token:', token);

                res.status(200).json({
                    success: true,
                    message: "Login successful",
                    token: token
                })
                return;
            } else {

                res.json({
                    success: false,
                    message: "Login failed, invalid credentials"
                })

                return;
            }
        }).catch((err) => {
            console.log(err);
            res.json({
                success: false,
                message: `Login failed, Error while reading ${loginType} ${institution} DB`
            })
            return;
        })
    })

}