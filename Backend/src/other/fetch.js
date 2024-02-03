const { hasAccess } = require("../Middleware/Auth");
const { readDB } = require("../db/mongoOperations");
const { registeredCollegesSchema } = require("../db/schema");


module.exports = (app) => {
    app.get("/getBatches", hasAccess, (req, res) => {

        readDB("Colleges", "Registered", { Name: req.decoded.institution }, registeredCollegesSchema).then((result) => {

            if (result.length == 0) {
                return res.json({
                    success: false,
                    message: `No College Found with this ${req.decoded.institution}`
                })
            }

            return res.json({
                success: true,
                message: `${req.decoded.institution} Batch List!`,
                batches: result[0].Batches
            })
        }).catch((err) => {
            console.log(err);
            return res.json({
                success: false,
                message: `Error while reading Colleges DB / Registered Collection, Error: ${err}`
            })
        })
    })
}