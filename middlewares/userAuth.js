var auth = require('basic-auth');
const User = require("../models/userModel")
const bcrypt = require("bcrypt");

require("../config/logger");
const winston = require("winston");
const webappLogger = winston.loggers.get("webappLogger");

const verifyToken = async (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(" ")[1];

        if(!token){
            webappLogger.info("User Token missing");
            res.status(401).json({message: "UNAUTHORIZED: Token missing"});
            return;
        }
        
        let creds = Buffer.from(token, "base64").toString("utf8").split(":"); 
        let username = creds[0];
        let password = creds[1];
        
        const user = await User.findOne({ where: { email : username }});
        const passwordMatched = await bcrypt.compare(password, user?.password);
        const isVerified = user?.dataValues?.isVerified;

        console.log(user.isVerified)

        if(!user){
            webappLogger.info(`user not found`);
            res.status(401).json({ message: "user not found"}); 
            return;
        }

        if(!passwordMatched){
            webappLogger.warn(`${user.email} tired logging with incorrect credentials`);
            res.status(401).json({ message: "incorrect password"}); 
            return;
        }

        if(!isVerified){
            webappLogger.warn(`${user.email} is not verified`);
            res.status(403).json({ message: `${user.email} is not a verified user`}); 
            return;
        }

        if(user && passwordMatched && isVerified){
            req.user = user;
            webappLogger.info(`${user.email} is valid and logged in successfully`);
            next();
            return;
        }  

    } catch (error) {
        console.log(error);
        res.status(403).json({ message: error.message });
        webappLogger.error("Error in userAuth middleware");
        return;
    }
};

module.exports = verifyToken;