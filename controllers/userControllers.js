const User = require('../models/userModel');
require("../config/logger");

const winston = require("winston");
const webappLogger = winston.loggers.get("webappLogger");

const publishMessage = require('../config/cloudPubSub');
const topic = process.env.GCP_TOPIC;

const registerUser = async (req, res) => {
    try {
        const { firstName, lastName, password, username } = req.body;
        const existingUser = await User.findOne({ where: { email: username } });
        if(existingUser){
            res.status(400).json({message: "User already registered in the database"});
            webappLogger.info(`${username} already Exists`);
            return; 
        } 
        const user = await User.create({
            firstName: firstName,
            lastName: lastName,
            email: username,
            password: password,
        });

        res.status(201).json({
            id: user.id,
            first_name: user.firstName,
            last_name: user.lastName,
            username: user.email,
            account_created: user.account_created,
            account_updated: user.account_updated
        });
        if(process.env.NODE_ENV != 'test'){
            publishMessage(topic, {
                first_name: firstName,
                last_name: lastName,
                email: username
            });
        }
        webappLogger.info(`New User ${username} Registered Successfully`);

    } catch (error) {
        webappLogger.info("incorrect user request body data /registerUser endpoint")
        res.status(400).send()
    }
};

const getUser = async (req, res) => {
    try {
        if(Object.keys(req.body).length !== 0) {
            res.status(400).send();
            webappLogger.info("get User contained body data, returned 400 status code")
            return;
        }

        let user = req?.user?.dataValues;

        res.status(200).json({
            id: user.id,
            first_name: user.firstName,
            last_name: user.lastName,
            username: user.email,
            account_created: user.account_created,
            account_updated: user.account_updated
        });    
        webappLogger.info(`${user.email} fetched their profile data, returned 200 status code`) 
        return;  
    } catch (error) {
        console.log
        res.status(400).json({ message: error.message });
        webappLogger.info("incorrect creds detected, returned 400")
        return
    }
};

const updateUser = async (req, res) => {
    try {
        const allowedFields = ['firstName', 'lastName', 'password']
        const filteredFields = Object.keys(req.body).filter( e =>  !allowedFields.includes(e))
        console.log("filteredFields",filteredFields)
        
        if(filteredFields.length !== 0) {
            webappLogger.info("User tried updating with incorrect fields")
            res.status(400).json({ message: "INCORRRECT FIELD!, Only firstName, lastName and passwords allowed"});
            return;
        }

        const {firstName, lastName, password} = req.body;
        let user = req.user.dataValues;

        await User.update({ 
            firstName: firstName,
            lastName: lastName,
            password: password,
        }, {
            where: {
              email: user.email
            }
          });
        
        webappLogger.info(`${user.email} updated their profile`)
        return res.status(204).send();

    } catch (error) {
        res.status(400).json({ message: error.message });
        webappLogger.error("Error in update User")
    }
}

const verifyUser = async(req, res) => {
    try {
        const { uuid, user } = req.params;
        const userdetails = await User.findOne({ where: { token: uuid, email: user } });
        console.log("verification detail", userdetails.dataValues);

        const time = new Date(userdetails?.dataValues?.tokenExpiry).valueOf() > new Date().valueOf();
        console.log(time);

        if(userdetails.dataValues.isVerified){
            webappLogger.info(`${user} is already verified`);
            res.status(208).json({ message: `${user} is already verified`});
            return;
        }

        if(time){
            await User.update({isVerified: true}, {
                where: {
                    email:user,
                    token: uuid
                }
            });
            webappLogger.info(`${user} Verified Successfully`);
            res.status(200).json({message: `${user} Verified Successfully`});
            return; 
        } else {
            webappLogger.warn(`Verification Link has Expired for User, ${user}`);
            res.status(403).json({message: "Verification Link has Expired"});
            return;
        }
    } catch (error) {
        console.log(error);
        webappLogger.error(`error occured while verifying the user`);
        res.status(403).json({message: "error occured while verifying the user"});
        return;
    }
};

module.exports = {
    registerUser,
    getUser,
    updateUser,
    verifyUser
}