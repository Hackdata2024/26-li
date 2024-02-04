const OpenAI = require('openai');
require('dotenv').config();
const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

module.exports = (app) => {

    app.post("/GetErrorSuggestions", async (req, res) => {

        console.log(`recieved GPT Assistance Request. CODE : ${req.body.code} PROBLEM : ${req.body.problem}`)

        const problemStatement = req.body.problem
        console.log(problemStatement);

        // Read code from file
        const code = req.body.code
        console.log(code);

        const messages = [
            {
                role: 'system',
                content: `Code Analysis. You will be given a code along with its problem statement. Use concise language that is suitable for students.
                            Questions:
                            1. Identify any syntax errors or logical issues in the code.
                            2. Suggestions/Instructions on how to correct the errors and run the code successfully.`,
            },
            {
                role: 'user',
                content: `Problem Statement: ${problemStatement}\nCode: ${code}`,
            },
        ];

        const parameters = {
            model: 'gpt-3.5-turbo',
            messages: messages,
            temperature: 0,
            max_tokens: 250,
            top_p: 1,
            frequency_penalty: 0,
            presence_penalty: 0,
        };

        const response = await client.chat.completions.create(parameters);
        console.log(response.choices[0].message.content);
        res.send(response.choices[0].message.content);

    })

    app.post("/GetCodeSuggestions", async (req, res) => {

        console.log(`recieved GPT Assistance Request. CODE : ${req.body.code} PROBLEM : ${req.body.problem}`)

        const problemStatement = req.body.problem
        console.log(problemStatement);

        // Read code from file
        const code = req.body.code
        console.log(code);

        const messages = [
            {
                role: 'system',
                content: `Code Analysis. You will be given a code along with its problem statement. Use concise language that is suitable for students.
                            Questions:
                            1. Provide suggestions for improving the code with regard to complexity, readability, etc.
                            2. Suggest alternative approaches for solving the problem.`,
            },
            {
                role: 'user',
                content: `Problem Statement: ${problemStatement}\nCode: ${code}`,
            },
        ];

        const parameters = {
            model: 'gpt-3.5-turbo',
            messages: messages,
            temperature: 0,
            max_tokens: 250,
            top_p: 1,
            frequency_penalty: 0,
            presence_penalty: 0,
        };

        const response = await client.chat.completions.create(parameters);
        console.log(response.choices[0].message.content);
        res.send(response.choices[0].message.content);

    })
}