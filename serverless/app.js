const functions = require('@google-cloud/functions-framework');
const { v4: uuidv4 } = require('uuid');
const run = require('./mailchimp');
require('dotenv').config();
const sequelize = require("./config/DBconnection");
const User = require("./config/userModel");

// Register a CloudEvent callback with the Functions Framework that will
// be executed when the Pub/Sub trigger topic receives a message.
functions.cloudEvent('verifyEmailPubSub', cloudEvent => {
  // The Pub/Sub message is passed as the CloudEvent's data payload.
  const base64name = cloudEvent.data.message.data;
  const name = base64name
    ? Buffer.from(base64name, 'base64').toString()
    : 'World';
    const payload = JSON.parse(name);
    const {email, first_name, last_name} = payload
    console.log(`Sent an email to, ${email}, ${first_name} ${last_name}!`);
    run(email, uuidv4(), first_name, last_name);
});
// run('sagarlm10@gmail.com', uuidv4());