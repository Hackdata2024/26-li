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
    console.log(Code);

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
                    message: "Compilation Error !",
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
                    message: "Execution Timeout !",
                    error: "The script took too long to execute."
                });
                callbackExecuted = true;
            }
        }, executionTimeout);

        scriptProcess = spawn('sh', ['-c', compileAndRunCommand], { input });

        scriptProcess.stdout.on('data', (data) => {
            clearTimeout(timeoutId);
            if (!callbackExecuted) {
                callback({
                    success: true,
                    message: "Script executed successfully !",
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
                    message: "Compilation Error !",
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
                    message: "Script executed successfully !",
                    output: ``
                });
                callbackExecuted = true;
            }
        });
    });
}

async function fetchTestCases(problemId, institute) {
    let QuestionResponse = await readDB("QuestionBank", institute, { _id: problemId }, QuestionSchema);
    console.log("fetchTestCases : ");
    if(QuestionResponse.length > 0){
        return QuestionResponse[0].TestCases;
    }
    else
        return [];
}

async function fetchSolutionCode(problemId, institute) {
    let QuestionResponse = await readDB("QuestionBank", institute, { _id: problemId }, QuestionSchema);
    if(QuestionResponse.length > 0)
        return QuestionResponse[0].SolutionCode;
    else
        return "";
}

module.exports = (app) => {



    app.post("/RunTests",hasAccess,isStudent, async (req, res) => {

        console.log(req.body);
        const problemId = req.body.QuestionId;
        console.log(req.decoded)
        
        let TestCases = await fetchTestCases(problemId,req.decoded.institution);
        console.log("testCases");
        console.log(TestCases);

        const submittedCode = req.body.code;
        console.log("submittedCode");
        console.log(submittedCode);

        let SolCode = await fetchSolutionCode(problemId,req.decoded.institution);
        console.log("SolCode");
        console.log(SolCode);

        let SolutionCodeOutput = [];
        let SubmittedCodeOutput = [];
    
        // Assuming testCases is an array of test cases
        const runTestPromisesSolution = TestCases.map(async (TestCase) => {
            return new Promise((resolve) => {
                RunCode(SolCode, TestCase.input, (result) => {
                    if (result.success) {
                        SolutionCodeOutput.push({
                            success: true,
                            output: result.output,
                        });
                    } else {
                        SolutionCodeOutput.push({
                            success: false,
                            output: result.error,
                        });
                    }
    
                    resolve();
                });
            });
        });
    
        const runTestPromisesSubmitted = TestCases.map(async (TestCase) => {
            return new Promise((resolve) => {
                RunCode(submittedCode, TestCase.input, (result) => {
                    if (result.success) {
                        SubmittedCodeOutput.push({
                            success: true,
                            output: result.output,
                        });
                    } else {
                        SubmittedCodeOutput.push({
                            success: false,
                            output: result.error,
                        });
                    }
    
                    resolve();
                });
            });
        });
    
        // Wait for all test cases for Solution Code to complete
        await Promise.all(runTestPromisesSolution);
        console.log("SolutionCodeOutput");
        console.log(SolutionCodeOutput);
    
        // Wait for all test cases for Submitted Code to complete
        await Promise.all(runTestPromisesSubmitted);
        console.log("SubmittedCodeOutput");
        console.log(SubmittedCodeOutput);
    
        // Send the response after processing all test cases for both Solution and Submitted Code
        res.json({
            SolutionCodeOutput,
            SubmittedCodeOutput
        });
    });

}
