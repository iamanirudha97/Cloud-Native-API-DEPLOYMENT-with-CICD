require('dotenv').config();
const mailchimp = require("@mailchimp/mailchimp_transactional")(
    `${process.env.MAILCHIMP_API_KEY}`
  );
  const addTokenDetails = require('./tokenController');
  const sendHTML = require('./sendhtml');
  
  async function run(email, uuid, first_name, last_name) {
    console.log(email, uuid);
    const response = await mailchimp.messages.send({
        message: {
            auto_html: true,
            inline_css: true,
            from_email: "csye6225@anirudhadudhasagare.me",
            subject: "Verify your Account with us",
            html: sendHTML(email, uuid, first_name, last_name),
            to: [
              {
                email: `${email}`,
                type: "to"
              }
            ]
        }
    });
    console.log(response);
    if(response[0].status === 'sent') {
      await addTokenDetails(email, uuid);

      // DEBUG REMOVE BEFORE PUSH
      // console.log(`http://localhost:8000/v1/verify/${email}/${uuid}`); 
    }
  }

  module.exports = run;