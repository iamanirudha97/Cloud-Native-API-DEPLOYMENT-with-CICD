const { PubSub } = require('@google-cloud/pubsub');
require('dotenv').config()

const pubsub = new PubSub(`${process.env.GCP_PROJECT_ID}`);

async function publishMessage(topicName, data) {
    const dataBuffer = Buffer.from(JSON.stringify(data));
    const messageId = await pubsub.topic(topicName).publish(dataBuffer);
}

module.exports = publishMessage;