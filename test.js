{
    success: false,
    message: `Error while running the random test case generator code!`,
    error: RandomTestCodeResponse.error
}
{
    success: false,
    message: `Error while running the submitted code!`,
    error: submittedCodeResponse.error
}
{
    success: false,
    message: `Error while running the solution code!`,
    error: SolCodeResponse.error
}
{
    success: false,
    message: "Test Failed!",
    YourOutput: submittedCodeResponse.output,
    ExpectedOutput: SolCodeResponse.output,
    CustomImputGenerated: CustomImputGenerated
}
{
    success: true,
    message: "Test Passed!",
    output: submittedCodeResponse.output,
    CustomImputGenerated: CustomImputGenerated
}