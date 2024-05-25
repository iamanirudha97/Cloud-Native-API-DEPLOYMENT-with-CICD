//create migrations
const {sequelize, initialize} = require("./config/connection");
const User = require("./models/userModel");

require("./config/logger");
const winston = require("winston");
const webappLogger = winston.loggers.get("webappLogger");


initialize()
    .then(_ => {
        sequelize.sync({alter: true})
    .then((result) => {
        console.log(result.models),
        webappLogger.info(`Bootstrapping database`);    
    })
    .catch((err) => console.log(err));
    })

    .catch(e => {
        console.log("Initialize Error", e)
    });