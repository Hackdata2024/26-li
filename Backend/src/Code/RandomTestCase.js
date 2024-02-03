
const { RunCode } = require('./RunCode');
const { fetchSolutionCode, fetchRandomGeneratorCode } = require("./Commonfetch");
const { hasAccess, isStudent } = require('../Middleware/Auth');

module.exports = (app) => {

    //requires QuestionId and Code in the request body
    app.post("/RunRandomTests", hasAccess, isStudent, async (req, res) => {

        console.log(req.body);

        //getting the problem id and submitted code from the request body
        const problemId = req.body.QuestionId;
        const submittedCode = req.body.Code;

        console.log("submittedCode");
        console.log(submittedCode);

        //if no code is submitted
        if (!submittedCode) {
            res.send({
                success: false,
                message: "No Code Submitted!"
            });
            return;
        }


        //using ProblemId and Institution to fetch the solution code from the database
        let SolCode = await fetchSolutionCode(problemId, req.decoded.institution);
        //using ProblemId and Institution to fetch the random test case generator code from the database
        let RandomTestCode = await fetchRandomGeneratorCode(problemId, req.decoded.institution);

        console.log("SolCode");
        console.log(SolCode);

        console.log("RandomTestCode");
        console.log(RandomTestCode);

        //running the random test case generator code to generate custom input
        RunCode(RandomTestCode, "", (RandomTestCodeResponse) => {

            //If the random test case generator code runs successfully
            if (RandomTestCodeResponse.success) {

                let CustomImputGenerated = RandomTestCodeResponse.output;
                console.log("CustomImputGenerated");
                console.log(CustomImputGenerated);

                //running the submitted code with the custom input
                RunCode(submittedCode, CustomImputGenerated, (submittedCodeResponse) => {

                    //if the submitted code runs successfully
                    if (submittedCodeResponse.success) {

                        //running the solution code with the custom input
                        RunCode(SolCode, CustomImputGenerated, (SolCodeResponse) => {

                            //if the solution code runs successfully
                            if (SolCodeResponse.success) {

                                //if the output of the submitted code and the solution code is same
                                if (submittedCodeResponse.output === SolCodeResponse.output) {
                                    res.send({
                                        success: true,
                                        message: "Test Passed!",
                                        output: submittedCodeResponse.output,
                                        CustomImputGenerated: CustomImputGenerated
                                    });
                                }
                                else {
                                    res.send({
                                        success: false,
                                        message: "Test Failed!",
                                        YourOutput: submittedCodeResponse.output,
                                        ExpectedOutput: SolCodeResponse.output,
                                        CustomImputGenerated: CustomImputGenerated
                                    });
                                }
                            }
                            else {
                                res.send({
                                    success: false,
                                    message: `Error while running the solution code!`,
                                    error: SolCodeResponse.error
                                });
                            }

                        });
                    }
                    else {
                        res.send({
                            success: false,
                            message: `Error while running the submitted code!`,
                            error: submittedCodeResponse.error
                        });
                    }

                });
            }
            else {
                res.send({
                    success: false,
                    message: `Error while running the random test case generator code!`,
                    error: RandomTestCodeResponse.error
                });
            }
        });

    });
}