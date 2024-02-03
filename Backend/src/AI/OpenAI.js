const OpenAI = require('openai');
const path = require('path');
const fs = require('fs').promises;
const client = new OpenAI({ apiKey: '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' });

module.exports = (app) => {

    app.get("/getAPI", async (req, res) => {

        const problemStatement = await fs.readFile(path.join(__dirname,'read_problem.txt'), 'utf-8');
        console.log(problemStatement);

        // Read code from file
        const code = await fs.readFile(path.join(__dirname,"read_code.txt"), 'utf-8');
        console.log(code);

        const messages = [
            {
                role: 'system',
                content: `Code Analysis. You will be given a code along with its problem statement. Use concise language that is suitable for students.
                        Questions:
                        1. Identify any syntax errors or logical issues in the code, if any.
                        2. Provide suggestions for improving the code.
                        3. Suggest alternative approaches for solving the problem.`,
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