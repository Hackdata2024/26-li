const fs = require("fs");
const { spawn } = require("child_process");
const path = require("path");


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

module.exports = { RunCode };