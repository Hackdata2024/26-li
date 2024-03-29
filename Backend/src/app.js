const express = require("express");
const cors = require("cors");
const bodyParser = require('body-parser');
const app = express();

app.use(
    cors({
        origin: process.env.CORS_ORIGIN,
        credentials: true,
    })
);

app.use(express.json());
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

module.exports = { app };