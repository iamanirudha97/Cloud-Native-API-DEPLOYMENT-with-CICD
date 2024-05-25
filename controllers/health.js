// curl -vvvv http://localhost:8000/api/v1healthz

const getServerStatus = require("../config/connStatus");

require("../config/logger");
const winston = require("winston");
const webappLogger = winston.loggers.get("webappLogger");

const getHealth = async (req, res) => {
    try {
        res.set({
            'Cache-Control': 'no-cache, no-store, must-revalidate',
            'Pragma': 'no-cache', 
            //Pragma has been deprecated as of now 
            //https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Pragma
            'X-Content-Type-Options': 'nosniff'
        });

        if(req.method !== "GET") {
            webappLogger.info("User Request Method WRONG, healthz returns 405");
            return res.status(405).send(); 
        }
        
        if(Object.keys(req.body).length !== 0) {
            webappLogger.info("User Request Method contained body data, healthz returns 400");
            return res.status(400).send();  
        }  

        const isUp = await getServerStatus();  
        console.log("DATABASE CONNECTED : ",isUp);

        if(isUp) {
            webappLogger.info("service is UP, healthz returns status 200 ");
            return res.status(200).send();    
        }

        webappLogger.error("Service is unavailable, healthz return 503");
        res.status(503).send();

    } catch (error) {
        webappLogger.error("Exception Caught in /healthz endpoint", error);
        console.log(error);
    }
};

module.exports = {
    getHealth
};