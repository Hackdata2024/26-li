// Purpose: To handle the code running and testing requests.
const { hasAccess, isStudent } = require("../Middleware/Auth");
const { RunCode } = require("./RunCode");
const { fetchTestCases, fetchSolutionCode } = require("./Commonfetch");


module.exports = (app) => {


    //requires QuestionId and Code in the request body
    app.post("/RunTests", hasAccess, isStudent, async (req, res) => {

        console.log(req.body);
        const problemId = req.body.QuestionId;
        console.log(req.decoded)

        let TestCases = await fetchTestCases(problemId, req.decoded.institution);
        console.log("testCases");
        console.log(TestCases);

        const submittedCode = req.body.Code;
        console.log("submittedCode");
        console.log(submittedCode);

        if(!submittedCode)
        {
            res.send({
                success: false,
                message: "No Code Submitted!"
            });
            return;
        }

        let SolCode = await fetchSolutionCode(problemId, req.decoded.institution);
        console.log("SolCode");
        console.log(SolCode);

        if (req.body.TestCaseIndex < TestCases.length) {
            RunCode(SolCode, TestCases[req.body.TestCaseIndex].input, (SolCodeResponse) => {
                if (SolCodeResponse.success) {
                    RunCode(submittedCode, TestCases[req.body.TestCaseIndex].input, (submittedCodeResponse) => {

                        if (submittedCodeResponse.success) {
                            if (submittedCodeResponse.output === SolCodeResponse.output) {
                                res.send({
                                    success: true,
                                    message: "Test Passed!",
                                    output: submittedCodeResponse.output
                                });
                            }
                            else {
                                res.send({
                                    success: false,
                                    message: "Test Failed!",
                                    YourOutput : submittedCodeResponse.output,
                                    ExpectedOutput : SolCodeResponse.output
                                });
                            }
                        }
                        else {
                            res.send({
                                success: false,
                                message: "Error in Submitted Code!",
                                error: submittedCodeResponse.error
                            })
                        }
                    });
                }
                else {
                    res.send({
                        success: false,
                        message: "Error in Solution Code!",
                        error: SolCodeResponse.error
                    })
                }
            });
        }
        else {
            res.send({
                success: false,
                message: "Invalid Test Case Index!"
            });
        }


    });

}
