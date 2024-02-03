const fs = require("fs");
const { spawn } = require("child_process");
const path = require("path");
const { readDB } = require("../db/mongoOperations");
const { QuestionSchema } = require("../db/schema");
const { hasAccess, isStudent } = require("../Middleware/Auth");

function EraseScriptFile(executablePath) {
    // Erase the executable file
    if (fs.existsSync(executablePath)) {
        fs.unlink(executablePath, (err) => {
            if (err) {
                console.log(err);
            }
        });
    }
}

function RunCode(Code, input, callback) {
    const scriptName = "script.cpp";
    const executableName = "script.exe";
    const scriptPath = path.join(__dirname, '..', '..', 'public', scriptName);
    const executablePath = path.join(__dirname, '..', '..', 'public', executableName);

    let callbackExecuted = false;

    fs.writeFile(scriptPath, Code, (err) => {
        if (err) {
            if (!callbackExecuted) {
                callback({
                    success: false,
                    message: "Error While Writing!",
                    error: err
                });
                callbackExecuted = true;
            }
            return;
        }

        const compileAndRunCommand = `g++ -o ${executablePath} ${scriptPath} && ${executablePath}`;
        const executionTimeout = 5000;
        let scriptProcess = null;

        const timeoutId = setTimeout(() => {
            if (scriptProcess) {
                scriptProcess.kill();
            }
            EraseScriptFile(executablePath);
            if (!callbackExecuted) {
                callback({
                    success: false,
                    message: "Execution Timeout!",
                    error: "The script took too long to execute."
                });
                callbackExecuted = true;
            }
        }, executionTimeout);

        scriptProcess = spawn('sh', ['-c', compileAndRunCommand], { stdio: ['pipe', 'pipe', 'pipe'] });

        scriptProcess.stdin.write(input); // Write input to stdin

        scriptProcess.stdin.end(); // Close stdin to signal the end of input

        scriptProcess.stdout.on('data', (data) => {
            clearTimeout(timeoutId);
            if (!callbackExecuted) {
                callback({
                    success: true,
                    message: "Script executed successfully!",
                    output: `${data}`
                });
                callbackExecuted = true;
            }
        });

        scriptProcess.stderr.on('data', (data) => {
            clearTimeout(timeoutId);
            if (!callbackExecuted) {
                callback({
                    success: false,
                    message: "Compilation Error!",
                    error: `${data}`
                });
                callbackExecuted = true;
            }
        });

        scriptProcess.on('close', (code) => {
            clearTimeout(timeoutId);
            EraseScriptFile(executablePath);
            if (!callbackExecuted) {
                callback({
                    success: true,
                    message: "Script executed successfully!",
                    output: ``
                });
                callbackExecuted = true;
            }
        });
    });
}

async function fetchTestCases(problemId, institute) {
    let QuestionResponse = await readDB("QuestionBank", institute, { _id: problemId }, QuestionSchema);
    if (QuestionResponse.length > 0) {
        return QuestionResponse[0].TestCases;
    }
    else
        return [];
}

async function fetchSolutionCode(problemId, institute) {
    let QuestionResponse = await readDB("QuestionBank", institute, { _id: problemId }, QuestionSchema);
    if (QuestionResponse.length > 0)
        return QuestionResponse[0].SolutionCode;
    else
        return "";
}

module.exports = (app) => {



    app.post("/RunTests", hasAccess, isStudent, async (req, res) => {

        console.log(req.body);
        const problemId = req.body.QuestionId;
        console.log(req.decoded)

        let TestCases = await fetchTestCases(problemId, req.decoded.institution);
        console.log("testCases");
        console.log(TestCases);

        const submittedCode = req.body.code;
        console.log("submittedCode");
        console.log(submittedCode);

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
