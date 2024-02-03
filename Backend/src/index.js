const dotenv = require("dotenv");
require("dotenv").config();

const { app } = require("./app");
const { connectDB } = require("./db/mongoOperations");
dotenv.config();

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
  connectDB();
});

require("./Auth/jwt")(app);
require("./other/Colleges")(app);

require("./professors/Assignments")(app);
require("./professors/dashboard")(app);
require("./professors/Questions")(app);
require("./professors/Evaluations")(app);

require("./other/fetch")(app);
require("./students/dashboard")(app);
require("./students/Assignments")(app);
require("./students/Evaluations")(app);
require("./AI/OpenAI")(app)
require("./Code/codeRun")(app)