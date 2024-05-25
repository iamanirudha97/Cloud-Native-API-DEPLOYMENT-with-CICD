const express = require("express");
const cors = require('cors');
const appRouter = require("./routes/routes");
const { sequelize, initialize } = require("./config/connection");
const User = require("./models/userModel");

require("./config/logger");
const winston = require("winston");
const webappLogger = winston.loggers.get("webappLogger");

require('dotenv').config()
const PORT = 8000;

const app = express();
app.use(cors());
app.use(express.json());

initialize()
    .then(_ => {
        sequelize.sync({alter: true})
    .then((result) => {
        console.log(result.models),
        webappLogger.info(`DATABASE INITIALIZED ON PORT ${process.env.DBPORT}`);
    })
    .catch((err) => console.log(err));
    })

    .catch(e => {
        console.log("Initialize Error", e)
        webappLogger.error(`DATABASE Initialization failed on PORT ${process.env.DBPORT}`)
    });

app.listen(PORT, () => {
    console.log("app is running on port 8000"),
    webappLogger.info(`The Application has started running on PORT ${PORT}`)
});

app.use("", appRouter);