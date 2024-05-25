const {sequelize} = require('./connection');

require("./logger");
const winston = require("winston");
const webappLogger = winston.loggers.get("webappLogger");

const getServerStatus = async() => {
    try {
        await sequelize.authenticate();
        console.log("Connection has been established successfully");
        webappLogger.info("Sequilize Connection has been established SUCCESSFULLY");
        return true;
    } catch (error) {
        console.error("'Unable to connect to the database");
        webappLogger.info("Sequilize Connection UNSUCCESSFULL");
        return false;
    }
}

module.exports = getServerStatus;